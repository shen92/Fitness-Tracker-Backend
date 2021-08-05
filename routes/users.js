const express = require("express");

const {
  validateUserToken,
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

/**
 * GET /users
 *
 * Get all users
 */
router.get("/", validateUserToken, getAllUsers, async (req, res) => {
  res.json({
    data: res.users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      goalDailyCalories: user.goalDailyCalories,
      goalDailyProtein: user.goalDailyProtein,
      goalDailyCarbohydrates: user.goalDailyCarbohydrates,
      goalDailyFat: user.goalDailyFat,
      goalDailyActivity: user.goalDailyActivity,
    })),
  });
});

/**
 * POST /users
 *
 * Create a user aka sign up
 */
router.post("/", getUser, createUser, async (req, res) => {
  if (res.user) {
    res
      .status(409)
      .json({ message: `User: ${req.body.username} already exist` });
  } else {
    res.json({ message: `User: ${req.body.username} created` });
  }
});

/**
 * GET /users/:username
 *
 * Get a user by username
 */
router.get("/:username", validateUserToken, getUser, (req, res) => {
  res.json({
    username: res.user.username,
    firstName: res.user.firstName,
    lastName: res.user.lastName,
    goalDailyCalories: res.user.goalDailyCalories,
    goalDailyProtein: res.user.goalDailyProtein,
    goalDailyCarbohydrates: res.user.goalDailyCarbohydrates,
    goalDailyFat: res.user.goalDailyFat,
    goalDailyActivity: res.user.goalDailyActivity,
  });
});

/**
 * PUT /users/:username
 *
 * Update a user by username
 */
router.put(
  "/:username",
  validateUserToken,
  getUser,
  updateUser,
  async (req, res) => {
    res.json({ message: `User: ${req.body.username} updated.` });
  }
);

/**
 * DELETE /users/:username
 *
 * Delete a user by username
 */
router.delete(
  "/:username",
  validateUserToken,
  getUser,
  deleteUser,
  async (req, res) => {
    res.json({ message: `User: ${req.body.username} deleted.` });
  }
);

module.exports = router;
