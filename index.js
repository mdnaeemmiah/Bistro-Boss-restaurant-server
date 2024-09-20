const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qenm5ah.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    const menuCollection = client.db('bistroDb').collection('menu')
    const reviewsCollection = client.db('bistroDb').collection('reviews')

   app.get('/menu',async (req,res) => {
    const result = await menuCollection.find().toArray()
    res.send(result)
   })
   app.get('/reviews',async (req,res) => {
    const result = await reviewsCollection.find().toArray()
    res.send(result)
   })
     
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Bistro boss restaurant')
})

app.listen(port, () => {
  console.log(`bistro boss app listening on port ${port}`)
})