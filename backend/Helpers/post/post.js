import fs from "fs/promises";

function saveData(data, currentDir) {
  return async(req, res) => {
    const { items, dateTime } = req.body;

    try {
      
      /* 
      if (!data.products || typeof data.products !== "object") {
        data.products = {};
      } */

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

    function saveDataToFile() {
      try {
        fs.writeFile(
          `${currentDir}/data/products.json`,
          JSON.stringify(data, null, 2),
          "utf8"
        );
      } catch (error) {
        console.error("Error saving data to file:", error);
      }
    }
  };
}

export { saveData };
