import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static(`${__dirname}/images`));

let data = loadProductsFromFile();

app.get("/api/products", (req, res) => {
  res.json(data.products);
});

app.post("/api/products", (req, res) => {
  const { items, dateTime } = req.body;

  try {
    // Ensure data.products is an object
    if (!data.products || typeof data.products !== "object") {
      data.products = {};
    }

    // Group items by category
    const itemsByCategory = items.reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({
        name: item.name,
        amount: item.quantity,
        price: item.price,
        date: dateTime,
        img: "images/image-not-available.png",
      });
      return acc;
    }, {});

    // Merge items into products.json
    Object.keys(itemsByCategory).forEach((category) => {
      if (data.products[category]) {
        data.products[category] = data.products[category].concat(
          itemsByCategory[category]
        );
      } else {
        data.products[category] = itemsByCategory[category];
      }
    });

    // Save updated data
    saveDataToFile();

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function loadProductsFromFile() {
  try {
    const rawData = fs.readFileSync(`${__dirname}/data/products.json`);
    return JSON.parse(rawData);
  } catch (error) {
    console.error("Error loading data from file:", error);
    return { products: {} };
  }
}

function saveDataToFile() {
  try {
    fs.writeFileSync(
      `${__dirname}/data/products.json`,
      JSON.stringify(data, null, 2),
      "utf8"
    );
  } catch (error) {
    console.error("Error saving data to file:", error);
  }
}
