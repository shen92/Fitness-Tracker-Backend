const { v4: uuidv4 } = require("uuid");

const { Activity } = require("../models/activity");

const getAllActivities = async (req, res, next) => {
  let activities = [];
  try {
    activities = res.user.activities;
    res.activities = activities;
  } catch (err) {
    res.activities = activities;
    return res.status(500).json({ message: err.message });
  }
  next();
};

const getActivity = async (req, res, next) => {
  let activity = {};
  try {
    const activityId = req.params.activityId;
    activity = res.user.activities.find(
      (activity) => activity.id === activityId
    );
    res.activity = activity;
  } catch (err) {
    res.activity = activity;
    return res.status(500).json({ message: err.message });
  }
  next();
};

const createActivity = async (req, res, next) => {
  try {
    let activities = res.activities;
    const date = new Date();
    activities.push(
      new Activity({
        id: uuidv4(),
        name: req.body.name,
        duration: req.body.duration,
        date: date.toISOString(),
        calories: req.body.calories,
      })
    );
    let user = res.user;
    user.activities = activities;
    await user.save();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
};

const updateActivity = async (req, res, next) => {
  try {
    let activities = res.activities;
    const activityId = req.params.activityId;
    const targetActivity = activities.find(
      (activity) => activity.id === activityId
    );
    for (const field of Object.entries(req.body)) {
      targetActivity[field[0]] = field[1];
    }
    let user = res.user;
    user.activities = activities;
    await user.save();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
};

const deleteActivity = async (req, res, next) => {
  try {
    let activities = res.activities;
    const activityId = req.params.activityId;
    const targetActivityIndex = activities.findIndex(
      (activity) => activity.id === activityId
    );
    activities.splice(targetActivityIndex, 1);
    let user = res.user;
    user.activities = activities;
    await user.save();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
};

module.exports = {
  getAllActivities: getAllActivities,
  getActivity: getActivity,
  createActivity: createActivity,
  updateActivity: updateActivity,
  deleteActivity: deleteActivity,
};
