const express = require("express");

const { validateUserToken, getUser } = require("../controllers/userController");
const { getMeal } = require("../controllers/mealController");
const {
  getAllFoods,
  createFood,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");

const router = express.Router();

/**
 * POST /meals/:mealId/foods
 *
 * Create a food to a meal
 */
router.get(
  "/:mealId/foods",
  validateUserToken,
  getUser,
  getMeal,
  getAllFoods,
  (req, res) => {
    res.json({
      foods: res.foods.map((food) => ({
        id: food.id,
        name: food.name,
        calories: food.calories,
        protein: food.protein,
        carbohydrates: food.carbohydrates,
        fat: food.fat,
      })),
    });
  }
);

/**
 * POST /meals/:mealId/foods
 *
 * Create a food to a meal
 */
router.post(
  "/:mealId/foods",
  validateUserToken,
  getUser,
  getMeal,
  createFood,
  (req, res) => {
    res.json({ message: "Food created." });
  }
);

/**
 * PUT /meals/:mealId/foods
 *
 * Update a food to a meal
 */
router.put(
  "/:mealId/foods/:foodId",
  validateUserToken,
  getUser,
  getMeal,
  updateFood,
  (req, res) => {
    res.json({ message: "Food created." });
  }
);

/**
 * POST /meals/:mealId/foods
 *
 * Delete a food to a meal
 */
router.delete(
  "/:mealId/foods/:foodId",
  validateUserToken,
  getUser,
  getMeal,
  deleteFood,
  (req, res) => {
    res.json({ message: "Food created." });
  }
);

module.exports = router;
