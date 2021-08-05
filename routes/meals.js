const express = require("express");

const { validateUserToken, getUser } = require("../controllers/userController");
const {
  getAllMeals,
  getMeal,
  createMeal,
  updateMeal,
  deleteMeal,
} = require("../controllers/mealController");

const router = express.Router();

/**
 * GET /meals
 *
 * Get user's all meals
 */
router.get("/", validateUserToken, getUser, getAllMeals, async (req, res) => {
  res.json({
    meals: res.meals.map((meal) => ({
      id: meal.id,
      name: meal.name,
      date: meal.date,
      foods: meal.foods,
    })),
  });
});

/**
 * POST /meals
 *
 * Create a meal
 */
router.post(
  "/",
  validateUserToken,
  getUser,
  getAllMeals,
  createMeal,
  (req, res) => {
    res.json({ message: "Meal created." });
  }
);

/**
 * GET /meals/:mealId
 *
 * Get user's meal by meal id
 */
router.get("/:mealId", validateUserToken, getUser, getMeal, (req, res) => {
  res.json({
    data: res.meal,
  });
});

/**
 * PUT /meals/:mealId
 *
 * Update user's meal by meal id
 */
router.put(
  "/:mealId",
  validateUserToken,
  getUser,
  getAllMeals,
  updateMeal,
  (req, res) => {
    res.json({
      message: "Meal updated.",
    });
  }
);

/**
 * DELETE /meals/:mealId
 *
 * Delete user's meal by meal id
 */
router.delete(
  "/:mealId",
  validateUserToken,
  getUser,
  getAllMeals,
  deleteMeal,
  (req, res) => {
    res.json({
      message: "Meal deleted.",
    });
  }
);

module.exports = router;
