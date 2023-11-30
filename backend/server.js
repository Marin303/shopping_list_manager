import express from "express";
import bodyParser from "body-parser";
import fs from "fs/promises";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import { getData } from "./Helpers/get/get.js";
import { saveData } from "./Helpers/post/post.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const filename = fileURLToPath(import.meta.url);
const currentDir = dirname(filename);

app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static(`${currentDir}/images`));

let data;

async function loadData() {
  try {
    const rawData = await fs.readFile(`${currentDir}/data/products.json`);
    data = JSON.parse(rawData);
  } catch (error) {
    console.error("Error loading data from file:", error);
    data = { products: {} };
  }
}

// Load initial data
await loadData();


app.get("/api/products", getData(data));
app.post("/api/products", saveData(data, currentDir));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
