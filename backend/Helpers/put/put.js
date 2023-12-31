import { saveDataToFile } from "../load-save/operate.js";

function updateProduct(data, dataFilePath, updatedProduct) {
  try {
    const { category, index, newName, newAmount, newPrice, newImage } = updatedProduct;

    if (data.products[category] && data.products[category][index]) {
      const updatedProduct = data.products[category][index];
      updatedProduct.name = newName;
      updatedProduct.amount = newAmount;
      updatedProduct.price = newPrice;
      updatedProduct.img = newImage;
    
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
