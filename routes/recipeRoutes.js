const express = require("express");
const router = express.Router();
const {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipesControllers");

router.get("/", getAllRecipes);

// Get a single recipe
router.get("/:_id", getRecipe);

//create new recipe
router.post("/create/new", createRecipe)

//update recipe by id

router.put("/update/:_id", updateRecipe)

router.delete("/delete/:_id", deleteRecipe)

module.exports = router;
