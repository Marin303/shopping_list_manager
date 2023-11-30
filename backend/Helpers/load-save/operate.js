import fs from "fs/promises";

async function loadData(dataFilePath) {
  try {
    const rawData = await fs.readFile(dataFilePath);
    return JSON.parse(rawData);
  } catch (error) {
    console.error("Error loading data from file:", error);
    return { products: {} };
  }
}

async function saveDataToFile(data, dataFilePath) {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error saving data to file:", error);
  }
}

export { loadData, saveDataToFile };
