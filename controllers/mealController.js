const { v4: uuidv4 } = require("uuid");

const { Meal } = require("../models/meal");

const getAllMeals = async (req, res, next) => {
  let meals = [];
  try {
    meals = res.user.meals;
    res.meals = meals;
  } catch (err) {
    res.meals = meals;
    return res.status(500).json({ message: err.message });
  }
  next();
};

const getMeal = async (req, res, next) => {
  let meal = {};
  try {
    const mealId = req.params.mealId;
    meal = res.user.meals.find((meal) => meal.id === mealId);
    res.meal = meal;
  } catch (err) {
    res.meal = meal;
    return res.status(500).json({ message: err.message });
  }
  next();
};

const createMeal = async (req, res, next) => {
  try {
    let meals = res.meals;
    const date = new Date();
    meals.push(
      new Meal({
        id: uuidv4(),
        name: req.body.name,
        date: date.toISOString(),
        foods: [],
      })
    );
    let user = res.user;
    user.meals = meals;
    await user.save();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
};

const updateMeal = async (req, res, next) => {
  try {
    let meals = res.meals;
    const mealId = req.params.mealId;
    const targetMeal = meals.find((meal) => meal.id === mealId);
    for (const field of Object.entries(req.body)) {
      targetMeal[field[0]] = field[1];
    }
    let user = res.user;
    user.meals = meals;
    await user.save();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
};

const deleteMeal = async (req, res, next) => {
  try {
    let meals = res.meals;
    const mealId = req.params.mealId;
    const targettargetMealIndex = meals.findIndex((meal) => meal.id === mealId);
    meals.splice(targettargetMealIndex, 1);
    let user = res.user;
    user.meals = meals;
    await user.save();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
};

module.exports = {
  getAllMeals: getAllMeals,
  getMeal: getMeal,
  createMeal: createMeal,
  updateMeal: updateMeal,
  deleteMeal: deleteMeal,
};
