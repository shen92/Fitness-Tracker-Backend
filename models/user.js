const mongoose = require("mongoose");

const { Activity } = require("./activity");
const { Food } = require("./food");
const { Meal } = require("./meal");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  goalDailyCalories: {
    type: Number,
    required: false,
  },
  goalDailyProtein: {
    type: Number,
    required: false,
  },
  goalDailyCarbohydrates: {
    type: Number,
    required: false,
  },
  goalDailyFat: {
    type: Number,
    required: false,
  },
  goalDailyActivity: {
    type: Number,
    required: false,
  },
  activities: {
    type: [Activity.schema],
    required: true,
  },
  meals: {
    type: [Meal.schema],
    required: true,
  },
  foods: {
    type: [Food.schema],
    required: true,
  },
});

module.exports = {
  User: mongoose.model("User", userSchema),
};
