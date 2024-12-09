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
    const { userId, addressId, frontendUrl, paymentMethod, promoCode } = req.body;

    try {
        if (!frontendUrl) {
            return res.status(400).json({ message: "Frontend URL is required" });
        }

        const user = await Tourist.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "Invalid user" });
        }

        const cart = await Cart.findOne({ user: userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Your cart is empty" });
        }

        let totalPrice = cart.totalPrice;

        const productIds = cart.items.map(item => item.productId);
        const products = await Product.find({ _id: { $in: productIds } });

        const address = await Address.findById(addressId);
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        if (promoCode) {
            const promoCodeRecord = await TouristPromoCode.findOne({ tourist: userId, code: promoCode });
            if (!promoCodeRecord) {
                return res.status(400).json({ message: 'Invalid or expired promo code' });
            }

            const discountAmount = promoCodeRecord.discount * totalPrice;
            totalPrice -= discountAmount;

            if (totalPrice < 0) {
                return res.status(400).json({ message: 'Discounted price is invalid' });
            }

            await TouristPromoCode.deleteOne({ tourist: userId, code: promoCode });
        }

        const order = new Orders({
            userId: userId,
            products: cart.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
            })),
            totalPrice: totalPrice,
            orderStatus: 'pending',
            deliveryAddress: addressId,
            paymentMethod: paymentMethod,
        });

        await order.save();

        // Payment method handling
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
                        unit_amount: product.price * 100,
                    },
                    quantity: item.quantity,
                };
            });

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: `${frontendUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${frontendUrl}/payment-failure`,
                metadata: {
                    userId: userId.toString(),
                    orderId: order._id.toString(),
                },
            });

            // Update product quantities
            for (let item of cart.items) {
                const product = await Product.findById(item.productId);
                if (product) {
                    product.quantity -= item.quantity;
                    product.sales += item.quantity;
                    await product.save();
                }
            }

            // Clear the cart
            cart.items = [];
            cart.totalPrice = 0;
            await cart.save();

            return res.status(200).json({ url: session.url });
        } else if (paymentMethod === 'wallet') {
            if (user.wallet < order.totalPrice) {
                return res.status(400).json({ message: 'Insufficient wallet balance' });
            }

            user.wallet -= order.totalPrice;
            await user.save();

            order.orderStatus = 'paid';
            await order.save();

            // Update product quantities
            for (let item of cart.items) {
                const product = await Product.findById(item.productId);
                if (product) {
                    product.quantity -= item.quantity;
                    product.sales += item.quantity;
                    await product.save();
                }
            }

            // Clear the cart
            cart.items = [];
            cart.totalPrice = 0;
            await cart.save();

            return res.status(200).json({ message: 'Order placed successfully, paid using wallet', order });
        } else {
            // For COD or other payment methods
            order.orderStatus = 'pending';
            await order.save();

            // Update product quantities
            for (let item of cart.items) {
                const product = await Product.findById(item.productId);
                if (product) {
                    product.quantity -= item.quantity;
                    product.sales += item.quantity;
                    await product.save();
                }
            }

            // Clear the cart
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
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    // Update order status to 'cancelled'
    const order = await Orders.findByIdAndUpdate(orderId, { orderStatus: 'cancelled' }, { new: true });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const touristId = order.userId;

    // Refund if the payment method is credit_card or wallet
    if (order.paymentMethod === 'credit_card' || order.paymentMethod === 'wallet') {
      const tourist = await Tourist.findById(touristId);
      if (tourist) {
        tourist.wallet += order.totalPrice; // Add refunded amount to wallet
        await tourist.save();
      }
    }

    // Reverse product quantity and sales changes
    for (const item of order.products) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.quantity += item.quantity; // Re-add the canceled quantity to the product stock
        product.sales = Math.max(product.sales - item.quantity, 0); // Reduce sales (ensure it doesn't go below 0)
        await product.save();
      }
    }

    res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (err) {
    console.error("Error cancelling order:", err);
    res.status(500).json({ message: "Error cancelling order", error: err.message });
  }
};


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