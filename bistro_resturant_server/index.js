const express = require('express');
const cors = require('cors');
var jwt = require('jsonwebtoken');
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

        // ! JWT auth related apis
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            res.send({ token });
        })

        // ! verify token -> valid user naki eta check kre
        // ! verify admin -> admin naki eta check kre

        // ! middleware: verify jwt token
        const verifyToken = (req, res, next) => {
            console.log('inside verify token: ', req.headers.authorization);
            console.log('------------------');

            const authorization = req.headers.authorization;
            if (!authorization) {
                return res.status(401).send({ error: true, message: 'unauthorized access' });
            }
            // token verify korte hobe
            const token = authorization.split(' ')[1];

            // drkr nai
            // if(!token) {
            //     return res.status(401).send({ error: true, message: 'unauthorized access' });
            // }

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).send({ error: true, message: 'unauthorized access' });
                }
                req.decoded = decoded;
                next();
            })
        }

        // ! verify admin: use verify admin after verify token
        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            if (user?.role !== 'admin') {
                return res.status(403).send({ error: true, message: 'forbidden access' });
            }
            next();
        }

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

        // ! read user
        app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
            // console.log(req.headers.authorization);
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // ! read admin user
        app.get('/users/admin/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            if(req.decoded.email !== email) {
                return res.status(403).send({ error: true, message: 'forbidden access' });
            }

            const query = { email: email };
            const user = await userCollection.findOne(query);
            let admin = false;
            if(user?.role === 'admin') {
                admin = true;
            }
            res.send({ admin });
        })

        // ! delete user
        app.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })

        // ! update(patch) user to admin
        app.patch('/users/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    role: 'admin'
                }
            };
            const result = await userCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })

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

        // ! add menu
        app.post('/menu', verifyToken, verifyAdmin, async (req, res) => {
            const menu = req.body;
            const result = await menuCollection.insertOne(menu);
            res.send(result);
        })

        // ! delete menu
        app.delete('/menu/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await menuCollection.deleteOne(query);
            res.send(result);
        })

        // ! get data for single specific menu
        app.get('/menu/:id', async (req, res) => {
            const id = req.params.id;
            // const query = { _id: (id) };    // for old data
            const query = { _id: new ObjectId(id) };
            const result = await menuCollection.findOne(query);
            res.send(result);
        })

        // ! update menu
        app.patch('/menu/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const menu = req.body;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    name: menu.name,
                    price: menu.price,
                    recipe: menu.recipe,
                    image: menu.image
                }
            };
            const result = await menuCollection.updateOne(filter, updatedDoc);
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