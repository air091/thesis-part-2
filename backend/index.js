require("dotenv/config");
const express = require("express");

const app = express();
const PORT = process.env.PORT;

app.use("/api/");

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
