const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static(__dirname + "/images")); // Serve static images

// Read initial data
let data = require("./data/products.json");

// Endpoints
app.get("/api/products", (req, res) => {
  res.json(data.products);
});

app.post("/api/products", (req, res) => {
  const { name, price, description } = req.body;

  // New product to data
  const newProduct = { name, price, description };
  data.products.push(newProduct);

  // Save updated data
  fs.writeFileSync(
    "./data/products.json",
    JSON.stringify(data, null, 2),
    "utf8"
  );

  res.status(201).json(newProduct);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster-shopping.6zrs9li.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
