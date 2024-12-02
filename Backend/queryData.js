const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://mennahalawa:hello@explora-db.qi8ym.mongodb.net/yourDatabaseName"; // Update with your database name
const client = new MongoClient(uri);

const queryData = async () => {
    try {
        await client.connect();
        const db = client.db("yourDatabaseName"); // Replace with your database name

        // Fetch users
        const users = await db.collection("users").find().toArray();
        console.log("Users:", users);

        // Fetch itineraries
        const itineraries = await db.collection("itineraries").find().toArray();
        console.log("Itineraries:", itineraries);

        // Fetch tourists
        const tourists = await db.collection("tourists").find().toArray();
        console.log("Tourists:", tourists);
    } catch (error) {
        console.error("Error querying data:", error);
    } finally {
        await client.close();
    }
};

queryData();
