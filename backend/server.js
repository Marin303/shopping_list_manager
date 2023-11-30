import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import { getData } from './Helpers/get/get.js';
import { saveData } from './Helpers/post/post.js';
import { loadData } from './Helpers/load-save/operate.js';
import { updateProduct } from './Helpers/put/put.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const filename = fileURLToPath(import.meta.url);
const currentDir = dirname(filename);
const dataFilePath = `${currentDir}/data/products.json`;

app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(`${currentDir}/images`));

let data;

async function initializeData() {
  data = await loadData(dataFilePath);
}

// Load initial data
await initializeData();

app.get('/api/products', getData(data));
app.post('/api/products', saveData(data, dataFilePath));
app.put('/api/products', (req, res) => {
  const updateResult = updateProduct(data, dataFilePath, req.body);
  res.status(updateResult.success ? 200 : 500).json(updateResult);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
