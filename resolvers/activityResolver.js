const { v4: uuidv4 } = require("uuid");

const { Activity } = require("../models/activity");

const { getUser } = require("./userResolver");

const getAllActivities = async (args) => {
  const user = await getUser(args.token);
  const activities = user.activities;
  return activities;
};

const getActivity = async (args) => {
  const user = await getUser(args.token);
  const activities = user.activities;
  const activity = activities.find(
    (activity) => activity.id === args.activityId
  );
  return activity;
};

const createActivity = async (args) => {
  const user = await getUser(args.token);
  const activities = user.activities;
  const date = new Date();
  activities.push(
    new Activity({
      id: uuidv4(),
      name: args.name,
      duration: args.duration,
      date: date.toISOString(),
      calories: args.calories,
    })
  );
  user.activities = activities;
  await user.save();
  return "Activity created.";
};

const updateActivity = async (args) => {
  const user = await getUser(args.token);
  const activities = user.activities;
  const targetActivity = activities.find(
    (activity) => activity.id === args.activityId
  );
  for (const field of Object.entries({
    name: args.name,
    duration: args.duration,
    calories: args.calories,
  })) {
    targetActivity[field[0]] = field[1];
  }
  user.activities = activities;
  await user.save();
  return "Activity updated.";
};

const deleteActivity = async (args) => {
  const user = await getUser(args.token);
  const activities = user.activities;
  const targetActivityIndex = activities.findIndex(
    (activity) => activity.id === args.activityId
  );
  activities.splice(targetActivityIndex, 1);
  user.activities = activities;
  await user.save();
  return "Activity deleted.";
};

module.exports = {
  getAllActivities: getAllActivities,
  getActivity: getActivity,
  createActivity: createActivity,
  updateActivity: updateActivity,
  deleteActivity: deleteActivity,
};
