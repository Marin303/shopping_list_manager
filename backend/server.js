const express = require("express");
const axios = require("axios");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const PORT = 3001;

app.get("/", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://axesso-walmart-data-service.p.rapidapi.com/wlm/walmart-lookup-product",
    params: {
      url: "https://www.walmart.com/ip/Media-Remote-for-PlayStation-5/381848762",
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.X_RAPID_API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    res.json(response.data); // Response back to the client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

(
  async () => {
  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
})();
