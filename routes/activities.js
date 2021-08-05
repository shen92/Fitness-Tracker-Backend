const express = require("express");

const { validateUserToken, getUser } = require("../controllers/userController");
const {
  getAllActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
} = require("../controllers/activityController");

const router = express.Router();

/**
 * GET /activities
 *
 * Get user's all activities
 */
router.get(
  "/",
  validateUserToken,
  getUser,
  getAllActivities,
  async (req, res) => {
    res.json({
      activities: res.activities.map((activity) => ({
        id: activity.id,
        duration: activity.duration,
        name: activity.name,
        date: activity.date,
        calories: activity.calories,
      })),
    });
  }
);

/**
 * POST /activities
 *
 * Create an activity
 */
router.post(
  "/",
  validateUserToken,
  getUser,
  getAllActivities,
  createActivity,
  (req, res) => {
    res.json({
      message: "Activity created.",
    });
  }
);

/**
 * GET /activities/:activityId
 *
 * Get user's activity by activity id
 */
router.get(
  "/:activityId",
  validateUserToken,
  getUser,
  getActivity,
  (req, res) => {
    res.json({
      data: {
        id: res.activity.id,
        name: res.activity.name,
        duration: res.activity.duration,
        date: res.activity.date,
        calories: res.activity.calories,
      },
    });
  }
);

/**
 * PUT /activities/:activityId
 *
 * Update user's activity by activity id
 */
router.put(
  "/:activityId",
  validateUserToken,
  getUser,
  getAllActivities,
  updateActivity,
  (req, res) => {
    res.json({
      message: "Activity updated.",
    });
  }
);

/**
 * DELETE /activities/:activityId
 *
 * Delete user's activity by activity id
 */
router.delete(
  "/:activityId",
  validateUserToken,
  getUser,
  getAllActivities,
  deleteActivity,
  (req, res) => {
    res.json({
      message: "Activity deleted.",
    });
  }
);

module.exports = router;
