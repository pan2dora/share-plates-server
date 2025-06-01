const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    success: {
      message: "You successfully got all the recipes data",
    },
    statusCode: 200,
  });
});

// Get a single recipe
router.get("/:id", (req, res, next) => {
  res.status(200).json({
    success: { message: "This will send a single recipe by its id" },
    statusCode: 200,
  });
});

//create new recipe
router.post("/create/new", (req, res, next) => {
  res.status(200).json({
    success: { message: "This will create a new recipe" },
    statusCode: 200,
  });
});

//update recipe by id

router.put("/update/:id", (req, res, next) => {
  res.status(200).json({
    success: { message: "This will update a recipe by its id" },
    statusCode: 200,
  });
});

router.delete("/delete/:id", (req, res, next) => {
  res.status(200).json({
    success: { message: "This will delete the book by its id" },
    statusCode: 200,
  });
});

module.exports = router;
