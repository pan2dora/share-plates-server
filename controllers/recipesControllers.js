const recipeData = require("../data/recipes");

const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = recipeData;
    return res.status(200).json({
      success: {
        message: "Recipes Found",
      },
      data: { recipes: recipes },
      statusCode: 200,
    });
  } catch (error) {
    return res.status(400).json({
      error: { message: "Not found" },
      statusCode: 400,
    });
  }
};

const getRecipe = async (req, res, next) => {
  //Retrieve the _id from the params objects on the request (req)

  const { _id } = req.params;
  //   console.log(_id)
  console.log(recipeData);
  try {
    const recipe = recipeData.find((recipeData) => recipeData._id === _id);

    return res.status(200).json({
      success: {
        message: "Recipe Found",
      },
      data: { recipe },
      statusCode: 200,
    });
    console.log(data);
  } catch (error) {
    return res.status(400).json({
      error: { message: "Recipe not found" },
    });
  }
};

const createRecipe = async (req, res, next) => {
  // destructure
  const { title, image, blerb } = req.body;

  console.log("BODY RECEIVED:", req.body);

  const newRecipe = {
    title,
    image,
    blerb,
  };

  try {
   recipeData.push(newRecipe)

    return res.status(201).json({
      success: { message: "New recipe created!" },
      data: {newRecipe },
    });
  } catch (error) {
    return res.status(400).json({
      error: { message: "Recipe not created" },
    });
  }
};

const updateRecipe = async (req, res, next) => {
  const { title, image, blerb } = req.body;
  const { _id } = req.params;
  try {
    const updatedRecipe = {
      title,
      image,
      blerb,
    };
    console.log(req.body);
    const foundRecipe = recipe.find((recipe) => recipe._id === _id);
    recipe[foundRecipe] = newRecipe;
    return res.status(201).json({
      success: { message: "Recipe updated!" },
      data: { updatedRecipe },
    });
  } catch (error) {
    return res.status(400).json({
      error: { message: "Recipe not updated!" },
    });
  }
};

const deleteRecipe = async (req, res, next) => {
  const { _id } = req.params;

  try {
    const recipes = recipeData.filter((recipe) => recipe._id !== _id);
    return res.status(200).json({
      success: { message: "Recipe deleted!" },
      data: { recipes },
    });
  } catch (error) {
    return res.status(400).json({
      error: { message: "Recipe not deleted!" },
    });
  }
};

module.exports = {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
