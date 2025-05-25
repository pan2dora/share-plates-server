const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res, next) => {
  res.send("This is the home page");
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}/`);
});
