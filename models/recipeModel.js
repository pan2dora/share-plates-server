const mongoose = require("mongoose");

const { Schema } = mongoose;

const recipeSchema = new Schema({
  recipe: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  about: {
    type: String,
    required: true,
    trim: true,
  },
  items: {
    type: [String],
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  instructions: {
    type: [String],
    required: true,
    trim: true,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
