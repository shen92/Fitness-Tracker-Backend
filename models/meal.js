const mongoose = require("mongoose");

const { Food } = require("./food");

const Schema = mongoose.Schema;

const mealSchema = new Schema({
  id: {
    type: String,
    isRequired: true,
  },
  name: {
    type: String,
    isRequired: true,
  },
  date: {
    type: String,
    isRequired: true,
  },
  foods: {
    type: [Food.schema],
    isRequired: true,
  },
});

module.exports = {
  Meal: mongoose.model("Meal", mealSchema),
};
