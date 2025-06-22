require("dotenv").config(); //summon dotenv lib
require("dotenv").config(); //summon dotenv lib
require("./config/connection.js"); //use connect to db
require("./config/authStrategy.js"); //auth
//middlware
const express = require("express");
const morgan = require("morgan");
const path = require("node:path");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
//image handling
const multer = require("multer");

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "data/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });


// Create a const variable called PORT with the value of 8080
const PORT = process.env.PORT || 8080;

// Auth
const session = require("express-session");
const passport = require("passport");

const recipeRoutes = require("./routes/recipeRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

app.use(helmet());

app.use(cors({ credentials: true, origin: true }));
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY,

    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//content routes
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

app.get("/", (req, res, next) => {
  res.status(200).json({
    success: {
      message: "This route points to homepage",
      statusCode: 200,
    },
  });
});

//image handling
// source: https://www.youtube.com/watch?v=i8yxx6V9UdM&ab_channel=JamesQQuick and npm website
app.post("/upload", upload.single("file"), (req, res) => {
  res.json(req.file);
});

app.listen(PORT, () => {
  console.log(
    `Server is listening on http://localhost:${PORT}. Connection established`
  );
});
