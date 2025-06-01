const express = require("express");
//controller routes

//required dependencies
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const { status } = require("express/lib/response");
// const path = require("node:path");
// const { contentSecurityPolicy } = require("helmet");
const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
// app.use(helmet({
//     contentSecurityPolicy: false,
// }));
app.use(morgan("combined"));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.status(200).json({
    success: {
      message: "This route points to homepage",
      statusCode: 200,
    },
  });
});
// Basic Routes
// get all recipes

app.get("/api/recipes", (req, res, next) => {
  res.status(200).json({
    success: {
      message: "You successfully got all the recipes data",
    },
    statusCode: 200,
  });
});

// Get a single recipe
app.get("/api/recipes/:id", (req, res, next) => {
  res.status(200).json({
    success: { message: "This will send a single recipe by its id" },
    statusCode: 200,
  });
});

//create new recipe
app.get("/api/recipes/create/new", (req, res, next) => {
  res.status(200).json({
    success: { message: "This will create a new recipe" },
    statusCode: 200,
  });
});

//update recipe by id

app.put("/api/recipes/update/:id", (req, res, next) => {
  res.status(200).json({
    success: { message: "This will update a recipe by its id" },
    statusCode: 200,
  });
});

app.delete("api/recipes/delete/:id", (req, res, next) => {
  res.status(200).json({
    success: { message: "This will update the book by its id" },
    statusCode: 200,
  });
});

app.listen(PORT, () => {
  console.log(
    `Server is listening on http://localhost:${PORT}. Connection established`
  );
});
