import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import dotenv from "dotenv";
import { getData } from "./Helpers/get/get.js";
import { saveData } from "./Helpers/post/post.js";
import { loadData } from "./Helpers/load-save/operate.js";
import { deleteData } from "./Helpers/delete/delete.js";
import { updateProduct } from "./Helpers/put/put.js";
import multer from "multer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const filename = fileURLToPath(import.meta.url);
const currentDir = dirname(filename);
const dataFilePath = `${currentDir}/data/products.json`;

app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static(`${currentDir}/images`));

let data;

async function initializeData() {
  data = await loadData(dataFilePath);
}

// Load initial data
await initializeData();

//app.use(fileUpload());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/newImages");
  },
  filename: function (req, file, cb) {
    cb(null, `product_${req.body.index}${path.extname(file.originalname)}`);
  },
});


const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("newImage"), (req, res) => {
  console.log("Received image upload request");
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);
  const imageUrl = `/images/newImages/${req.file.filename}`;
  console.log("Received index:", req.body.index); // Add this line to log the received index
  res.json({ success: true, imageUrl });
});


app.get("/api/products", getData(data));
app.post("/api/products", saveData(data, dataFilePath));

app.put("/api/products", (req, res) => {
  console.log("Received update request");
  console.log("Request body:", req.body);
  const updateResult = updateProduct(data, dataFilePath, req.body);
  res.status(updateResult.success ? 200 : 500).json(updateResult);
});

app.delete("/api/products/:index", deleteData(data, dataFilePath));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
