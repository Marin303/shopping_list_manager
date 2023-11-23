const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static(__dirname + "/images"));

let data = require("./data/products.json");

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
        category: item.category,
      });
      return acc;
    }, {});

    // Merge items into data.products
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
    fs.writeFileSync(
      "./data/products.json",
      JSON.stringify(data, null, 2),
      "utf8"
    );

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
