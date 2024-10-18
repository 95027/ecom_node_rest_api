const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.get("/test", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
