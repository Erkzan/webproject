import { app } from "./start";


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Y:Chalmers123@y.y9rfxte.mongodb.net/?retryWrites=true&w=majority";


const PORT : number = 8080;


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
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");


        const database = client.db('Y-db');

        const users = database.collection('users');
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }




/*
    app.use(function(req, res, next){

        next();
    });

*/

    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });

}

run().catch(console.dir);


