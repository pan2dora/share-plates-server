// const recipeData = require("../data/recipes");

const Recipe = require("../models/recipeModel");

const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({});

    return res.status(200).json({
      success: {
        message: "Recipes Found",
      },
      data: { recipes },
      statusCode: 200,
    });
  } catch (error) {
    return next(error);
  }
};

const getRecipe = async (req, res, next) => {
  //Retrieve the _id from the params objects on the request (req)

  const { _id } = req.params;

  try {
    if (!_id) {
      throw new Error("Id is required");
    }
    const recipe = Recipe.findByID(_id);

    if (!recipe) {
      throw new Error("Recipe not");
    }

    return res.status(200).json({
      success: {
        message: "Recipe Found",
      },
      data: { recipe },
    });
  } catch (error) {
    return next(error);
  }
};

const createRecipe = async (req, res, next) => {
  // destructure
  const { title, image, blerb } = req.body;

  console.log("BODY RECEIVED:", req.body);

  try {
    if (!recipe || !image || !about || !item || !instructions) {
      throw new Error("Missing required fields, please review.");
    }

    const newRecipe = new Recipe({
      recipe,
      image,
      about,
      item,
      price,
      instructions,
    });

    await newRecipe.save();

    return res.status(201).json({
      success: { message: "New recipe created!" },
      data: { newRecipe },
      statusCode: 201,
    });
  } catch (error) {
    return next(error);
  }
};

const updateRecipe = async (req, res, next) => {
  const { title, image, blerb } = req.body;
  const { _id } = req.params;
  try {
    if (!title || !image || !blerb) {
      throw new Error("Missing required fields, please review.");
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      _id,
      {
        $set: {
          title,
          image,
          blerb,
        },
      },
      { new: true }
    );

    if (!updateRecipe) {
      throw new Error("Book not found");
    }

    return res.status(201).json({
      success: { message: "Recipe updated!" },
      data: { updatedRecipe },
      statusCode: 201,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  const { _id } = req.params;

  try {
    if (!_id) {
      throw new Error("Id is required");
    }
    // const books = booksData.filter((book) => book._id !== _id);
    await Recipe.findByIdAndDelete(_id);

    return res.status(200).json({
      success: { message: "Recipe deleted!" },
      statusCode: 200,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
