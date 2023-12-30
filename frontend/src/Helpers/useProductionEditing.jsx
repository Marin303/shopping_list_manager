import axios from "axios";
import { useState } from "react";

const useProductEditing = (category) => {
  const [products, setProducts] = useState([]);
  const [editModes, setEditModes] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [handleVisible, setHandleVisible] = useState(true);
  const [newImage, setNewImage] = useState("");

  const initialDeleteValues = {
    index: null,
    confirmed: false,
  };
  const [deleteConfirmation, setDeleteConfirmation] =
    useState(initialDeleteValues);
  const handleImageChange = async (e, productIndex) => {
    const newImage = e.target.files[0];
    console.log("New Image", newImage);

    // Upload the image and get the imageUrl
    const formData = new FormData();
    formData.append("category", category);
    formData.append("index", productIndex);
    formData.append("newImage", newImage);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/upload",
        formData
      );
      const imageUrl = response.data.imageUrl;

      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts];
        updatedProducts[productIndex].img = imageUrl;
        return updatedProducts;
      });

      // product details with the new image URL
      try {
        await axios.put("http://localhost:3001/api/products", {
          category: category,
          index: productIndex,
          newName: products[productIndex].name,
          newAmount: products[productIndex].amount,
          newPrice: products[productIndex].price,
          newImage: imageUrl,
        });
        setNewImage(imageUrl);

        console.log("Product image updated successfully");
      } catch (error) {
        console.error("Error updating product image:", error);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleEdit = (productIndex) => {
    const product = products[productIndex]
    setNewName(product.name);
    setNewAmount(product.amount);
    setNewPrice(product.price);
    setNewImage(product.img);
    setEditModes((prevModes) =>
      prevModes.map((mode, index) => (index === productIndex ? !mode : mode))
    );
  };

  const handleSave = async (productIndex) => {
    setEditModes((prevModes) =>
      prevModes.map((mode, index) => (index === productIndex ? !mode : mode))
    );

    const updatedProducts = [...products];
    updatedProducts[productIndex].name = newName;
    updatedProducts[productIndex].amount = newAmount;
    updatedProducts[productIndex].price = newPrice;
    updatedProducts[productIndex].img = newImage;

    console.log("newImage", newImage);
    setProducts(updatedProducts);

    try {
      await axios.put("http://localhost:3001/api/products", {
        category: category,
        index: productIndex,
        newName: newName,
        newAmount: newAmount,
        newPrice: newPrice,
        newImage: newImage,
      });

      console.log("Product data updated successfully");
    } catch (error) {
      console.error("Error updating product data:", error);
    }
  };

  const handleDelete = (productIndex) => {
    setHandleVisible(false);
    setDeleteConfirmation({
      index: productIndex,
      confirmed: false,
    });
  };

  const handleConfirmDelete = async () => {
    setHandleVisible(true);
    const indexToDelete = deleteConfirmation.index;
    console.log(
      "Deleting product. Category:",
      category,
      "Index:",
      indexToDelete
    );
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/products/${indexToDelete}`,
        {
          data: { category: category },
        }
      );
      console.log("Delete response:", response.data);
      if (response.data.success) {
        const updatedProducts = [...products];
        updatedProducts.splice(indexToDelete, 1);
        setProducts(updatedProducts);
      } else {
        console.error("Error deleting product:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }

    setDeleteConfirmation(initialDeleteValues);
  };

  const handleCancelDelete = () => {
    setHandleVisible(true);
    setDeleteConfirmation(initialDeleteValues);
  };

  const handleEditChange = (e, field) => {
    const value = e.target.value;
    const numberAndCommaPattern = /^[0-9,]*$/;

    switch (field) {
      case "name":
        setNewName(value);
        break;
      case "amount":
        setNewAmount(value);
        break;
      case "price":
        if (numberAndCommaPattern.test(value) || value === "") {
          setNewPrice(value);
        }
        break;
      case "img":
        setNewImage(value);
        break;
      default:
        break;
    }
  };

  return {
    products,
    category,
    editModes,
    newName,
    newAmount,
    newPrice,
    handleVisible,
    deleteConfirmation,
    setProducts,
    setEditModes,
    handleSave,
    handleEdit,
    handleDelete,
    handleConfirmDelete,
    handleCancelDelete,
    handleEditChange,
    handleImageChange,
  };
};

export default useProductEditing;
