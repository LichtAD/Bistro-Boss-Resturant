const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xy3cn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const database = client.db("bistroDb");
        const menuCollection = database.collection("menu");
        const reviewCollection = database.collection("reviews");
        const cartCollection = database.collection("carts");
        const userCollection = database.collection("users");

        // ! user related api

        // ! create user
        app.post('/users', async (req, res) => {
            const user = req.body;

            // insert email if user does not exist
            // there are many ways, 1. email unique, 2. upsert 3. simple checking
            const query = { email: user.email };
            const existingUser = await userCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: 'user already exists', insertId: null })
            }

            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        // ! cart related api

        // ! add to cart
        app.post('/carts', async (req, res) => {
            const cartItem = req.body;
            const result = await cartCollection.insertOne(cartItem);
            res.send(result);
        });

        // ! read cart
        app.get('/carts', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };

            const cursor = cartCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        // ! delete cart
        app.delete('/carts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await cartCollection.deleteOne(query);
            res.send(result);
        });

        // ! menu related api

        // ! read menu
        app.get('/menu', async (req, res) => {
            const cursor = menuCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // ! reviews related api

        // ! read reviews
        app.get('/reviews', async (req, res) => {
            const cursor = reviewCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('server is running');
});

app.listen(port, () => {
    console.log(`bistro resturant server running on port ${port}`);
})