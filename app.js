const express = require("express");
// Define a constant recipeRoutes and require the path
const recipeRoutes = require("./routes/recipeRoutes");
//controller routes

//required dependencies
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
// const { status } = require("express/lib/response");
const path = require("node:path");
// const { contentSecurityPolicy } = require("helmet");
const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
//Call the use method on the routes
app.use("/api/recipes", recipeRoutes);
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


app.listen(PORT, () => {
  console.log(
    `Server is listening on http://localhost:${PORT}. Connection established`
  );
});
