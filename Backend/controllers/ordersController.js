const Cart = require('../models/cart');
const Orders = require('../models/orders');
const Product = require('../models/Products'); // To fetch product details
const Address = require('../models/Address'); // To fetch address details
const User = require('../models/User'); // To fetch user details
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/PaymentModel');
const bodyParser = require('body-parser'); // For raw body parsing
const Tourist = require('../models/touristModel');
const TouristPromoCode = require('../models/touristPromoCode');


const checkoutOrder = async (req, res) => {
    try {
        const { touristId } = req.params; // Tourist ID from request parameters
        const { addressId } = req.body; // Address ID (reference to the Address model)

        // Fetch the cart to get all items and the total price
        const cart = await Cart.findOne({ user: touristId });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Your cart is empty' });
        }

        // Fetch the products' details and calculate the total price
        const products = cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
        }));

        const totalPrice = cart.totalPrice; // Or calculate the price manually if needed

        // Fetch the address details using the addressId
        const address = await Address.findById(addressId);
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        // Create the order with the address reference
        const order = new Orders({
            userId: touristId,
            products: products,
            totalPrice: totalPrice,
            orderStatus: 'pending',
            deliveryAddress: addressId, // Store the address ID reference
        });

        // Save the order
        await order.save();

        // Optionally, clear the cart after checkout
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(201).json({ message: 'Order placed successfully', order });

    } catch (error) {
        console.error('Error during checkout:', error.message);
        res.status(500).json({ error: error.message });
    }
};


const processPayment = async (req, res) => {
    const { userId, frontendUrl } = req.body;
    
  
    try {
      console.log("Received frontend URL:", frontendUrl);
  
      // Validate the required parameters
      if (!frontendUrl) {
        return res.status(400).json({ message: "Frontend URL is required" });
      }
  
      // Validate the user
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: "Invalid user" });
      }
  
      // Fetch user's cart
      const cart = await Cart.findOne({ user: userId });
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Your cart is empty" });
      }
  
      // Fetch product details for the items in the cart
      const productIds = cart.items.map(item => item.productId);
      const products = await Product.find({ _id: { $in: productIds } });
  
      // Prepare line items for Stripe session
      const lineItems = cart.items.map(item => {
        const product = products.find(p => p._id.toString() === item.productId.toString());
        if (!product) {
          throw new Error(`Product not found for ID: ${item.productId}`);
        }
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price * 100, // Convert to cents
          },
          quantity: item.quantity,
        };
      });
  
      // Create a Stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${frontendUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${frontendUrl}/fail`,
        metadata: {
          userId,
          productIds: JSON.stringify(productIds), // Store product IDs as metadata
        },
      });
  
      // Send the session URL back to frontend to redirect user
      res.status(200).json({ url: session.url });
    } catch (err) {
      console.error("Error creating product payment session:", err);
      res.status(500).json({ message: "Error creating payment session", error: err.message });
    }
  };
  


  const checkoutAndPay = async (req, res) => {
    const { userId, addressId, frontendUrl, paymentMethod, promoCode } = req.body; // Added paymentMethod parameter
    console.log('Received request:', req.body); // Log the incoming request body to see the data sent from the frontend

    try {
        // Validate the required parameters
        if (!frontendUrl) {
            return res.status(400).json({ message: "Frontend URL is required" });
        }

        // Validate the user
        const user = await Tourist.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "Invalid user" });
        }

        // Fetch the cart to get all items and the total price
        const cart = await Cart.findOne({ user: userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Your cart is empty" });
        }
        let totalPrice = cart.totalPrice; // Or calculate the price manually if needed


        // Fetch product details for the items in the cart
        const productIds = cart.items.map(item => item.productId);
        const products = await Product.find({ _id: { $in: productIds } });

        // Fetch the address details using the addressId
        const address = await Address.findById(addressId);
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        if (promoCode) {
          const promoCodeRecord = await TouristPromoCode.findOne({ tourist: touristId, code: promoCode });

          if (!promoCodeRecord) {
              return res.status(400).json({ message: 'Invalid or expired promo code' });
          }

          // Apply the discount
          const discountAmount = promoCodeRecord.discount * totalPrice;
          totalPrice -= discountAmount;
          // Ensure discounted price is valid
          if (totalPrice < 0) {
            return res.status(400).json({ message: 'Discounted price is invalid' });
        }

        // Delete the promo code since it's used
        await TouristPromoCode.deleteOne({ tourist: userId, code: promoCode });
      };

        // Create the order with the address reference
        const order = new Orders({
            userId: userId,
            products: cart.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
            })),
            totalPrice: totalPrice, // Or calculate the total price manually
            orderStatus: 'pending',
            deliveryAddress: addressId,
            paymentMethod: paymentMethod,
        });

        // Save the order
        await order.save();

        
        // Handle the payment method
        if (paymentMethod === 'credit_card') {
            const lineItems = cart.items.map(item => {
                const product = products.find(p => p._id.toString() === item.productId.toString());
                if (!product) {
                    throw new Error(`Product not found for ID: ${item.productId}`);
                }
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.name,
                            description: product.description,
                        },
                        unit_amount: product.price * 100, // Convert to cents
                    },
                    quantity: item.quantity,
                };
            });

            // Create a Stripe session
            const session = await stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              line_items: lineItems,
              mode: 'payment',
              success_url: `${frontendUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${frontendUrl}/payment-failure`,
              metadata: {
                  userId: userId.toString(),
                  orderId: order._id.toString(), // Convert ObjectId to string
              },
          });
            // // Optionally, clear the cart after checkout
            cart.items = [];
            cart.totalPrice = 0;
            await cart.save();

            // Send the session URL back to frontend to redirect user
            return res.status(200).json({ url: session.url });
        } else if (paymentMethod === 'wallet') {
            // Check if the user has sufficient wallet balance
            if (user.wallet < order.totalPrice) {
              console.log('Wallet does not have enough money');
                return res.status(400).json({ message: 'Insufficient wallet balance' });
            }

            // Deduct the total price from the wallet
            user.wallet -= order.totalPrice;
            await user.save();

            // Update the order status to 'paid'
            order.orderStatus = 'paid';
            await order.save();

            // Optionally, clear the cart after checkout
            cart.items = [];
            cart.totalPrice = 0;
            await cart.save();


            return res.status(200).json({ message: 'Order placed successfully, paid using wallet', order });
        } else {
            // Handle non-card payment methods (e.g., COD or manual processing)
            order.orderStatus = 'pending'; // Keep as pending until manually processed
            await order.save();
              // Optionally, clear the cart after checkout
            cart.items = [];
            cart.totalPrice = 0;
            await cart.save();
            return res.status(200).json({ message: 'Order placed successfully, pending payment verification', order });

        }
    } catch (err) {
        console.error("Error during checkout and payment:", err);
        res.status(500).json({ message: "Error during checkout and payment", error: err.message });
    }
};

const viewOrders = async (req, res) => {
  try {
    const { touristId } = req.params; // Destructure `touristId` from params
    if (!touristId) {
      return res.status(400).json({ message: "Tourist ID is required" });
    }

    const orders = await Orders.find({ userId: touristId })
    .populate({
      path: 'products.productId', // Populate the `productId` in `products`
      select: 'name price' // Select specific fields (you can modify this)
    })
    .exec(); // Execute the query
  console.log(orders); //
    if (!orders || !orders.length) {
      return res.status(404).json({ message: "No orders found for this tourist" });
    }

    return res.status(200).json({ orders }); // Return orders if found
  } catch (err) { // Use `err` in the catch block
    console.error("Error retrieving orders:", err);
    res.status(500).json({ message: "Error retrieving orders", error: err.message });
  }
};

const filterByStatus = async (req, res) => {
  try{
  
  const {status} = req.query;
  const {touristId} = req.params
  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }
  const orders = await Orders.find({ orderStatus: status, userId:touristId });
  if (orders.length > 0) {
    return res.status(200).json({ orders });
  } else {
    return res.status(404).json({ message: "No orders found with this status" });
  }
}catch{
  console.error("Error retrieving orders:", err);
  res.status(500).json({ message: "Error retrieving orders", error: err.message });
}
}

const cancelOrder = async (req, res) => {
  try{
    const {orderId} = req.params;
    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }
    const order = await Orders.findByIdAndUpdate(orderId, { orderStatus: 'cancelled' }, { new: true });
    if (order) {
      return res.status(200).json({ message: "Order cancelled successfully", order });
    } else {
      return res.status(404).json({ message: "Order not found" });
    }
  }catch{
    console.error("Error cancelling order:", err);
    res.status(500).json({ message: "Error cancelling order", error: err.message });
  }
}

const viewAllOrders = async (req, res) => {
  try{
    const orders = await Orders.find({});
    if (orders.length > 0) {
      return res.status(200).json({ orders });
    } else {
      return res.status(404).json({ message: "No orders found" });
    }
  }
  catch{
    console.error("Error retrieving orders:", err);
    res.status(500).json({ message: "Error retrieving orders", error: err.message });
  }
}


  
  

module.exports = {checkoutOrder, processPayment , checkoutAndPay, viewOrders, cancelOrder, filterByStatus, viewAllOrders};