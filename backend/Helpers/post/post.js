import { saveDataToFile } from "../load-save/operate.js";
function saveData(data, currentDir) {
  return async (req, res) => {
    const { items, dateTime } = req.body;

    try {
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
      saveDataToFile(data, currentDir);

      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Error processing the request:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  };
}
export { saveData };
