require("dotenv").config(); //summon dotenv lib
require("./config/connection.js"); //use connect to db
require("./config/authStrategy.js"); //auth

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
// Define a constant recipeRoutes and require the path

//controller routes

//required dependencies
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
// const { status } = require("express/lib/response");
const path = require("node:path");
// const { contentSecurityPolicy } = require("helmet");
const methodOverride = require("method-override");
const recipeRoutes = require("./routes/recipeRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(methodOverride("_method"));
app.use(helmet());

app.use(cors({ credentials: true, origin: true }));
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));


//Call the use method on the routes

app.use("/api/recipes", recipeRoutes);

app.use("/api/auth", authRoutes);

//Error handling middleware
app.use((err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(err.status || 400).json({
      error: { message: "Already have an account? Try logging in." },
      statusCode: err.status || 400,
    });
  }
  return res.status(err.status || 500).json({
    error: { message: err.message || "Internal server error." },
    statusCode: err.status || 500,
  });
});



// app.use(helmet({
//     contentSecurityPolicy: false,
// }));
const siteData = require("./data/siteData");

app.get("/", (req, res, next) => {
  res.status(200).json({
    success: {
      message: "This route points to homepage",
      data: { siteData },
      statusCode: 200,
    },
  });
});
// Basic Routes
// get all recipes

app.listen(PORT, () => {
  console.log(
    `Server is listening on http://localhost:${PORT}. Connection established`
  );
});
