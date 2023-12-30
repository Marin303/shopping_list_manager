import { loadData, saveDataToFile } from "../load-save/operate.js";

export function deleteData(data, dataFilePath) {
  return async (req, res) => {
    const category = req.body.category;
    if (!data.products[category]) {
      console.error(`Category not found: ${category}`);
      return res
        .status(404)
        .json({ success: false, message: "Category not found." });
    }

    const indexToDelete = parseInt(req.params.index, 10);
    if (
      isNaN(indexToDelete) ||
      indexToDelete < 0 ||
      indexToDelete >= data.products[category].length
    ) {
      console.error(`Invalid index parameter: ${indexToDelete}`);
      return res
        .status(400)
        .json({ success: false, message: "Invalid index parameter." });
    }

    const deletedProduct = data.products[category][indexToDelete];
    if (!deletedProduct) {
      console.error(`Product not found at index ${indexToDelete}`);
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    // Removing the product from the array
    data.products[category].splice(indexToDelete, 1);

    // Save the updated data to the file
    await saveDataToFile(data, dataFilePath);

    //console.log(`Deleted product at index ${indexToDelete}:`, deletedProduct);
    res.json({ success: true, deletedProduct });
  };
}
