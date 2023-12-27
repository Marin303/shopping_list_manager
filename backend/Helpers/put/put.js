import { saveDataToFile } from "../load-save/operate.js";
function updateProduct(data, dataFilePath, updatedProduct) {
  try {
    const { category, index, newName, newAmount, newPrice } = updatedProduct;

    if (data.products[category] && data.products[category][index]) {
      data.products[category][index].name = newName;
      data.products[category][index].amount = newAmount;
      data.products[category][index].price = newPrice;
      data.products[category][index].img = imagePath;

      // Save updated data
      saveDataToFile(data, dataFilePath);

      return { success: true };
    } else {
      return { success: false, error: "Product not found" };
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Internal Server Error" };
  }
}

export { updateProduct };
