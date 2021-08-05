const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  carbohydrates: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
});

module.exports = {
  Food: mongoose.model("Food", foodSchema),
};
