const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(__dirname + '/images')); // Serve static images

// Read initial data
let data = require('./data/products.json');

// Endpoints
app.get('/api/products', (req, res) => {
  res.json(data.products);
});

app.post('/api/products', (req, res) => {
  const { name, price, description } = req.body;

  // New product to data
  const newProduct = { name, price, description };
  data.products.push(newProduct);

  // Save updated data
  fs.writeFileSync('./data/products.json', JSON.stringify(data, null, 2), 'utf8');

  res.status(201).json(newProduct);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
