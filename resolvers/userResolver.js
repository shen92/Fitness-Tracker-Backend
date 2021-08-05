const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { validateUserToken } = require("./util");

const validateUserAuthorizaton = async (args) => {
  const buffer = Buffer.from(args.authorization, "base64");
  const username = buffer.toString("utf-8").split(":")[0];
  const password = buffer.toString("utf-8").split(":")[1];
  user = await User.find({ username: username, password: password });
  if (user[0]) {
    const userToken = jwt.sign(args.authorization, process.env.PRIVATE_KEY);
    return userToken;
  }
};

const getAllUsers = async (args) => {
  if (validateUserToken(args.token)) {
    const users = await User.find();
    return users;
  }
};

const getUser = async (token) => {
  const username = validateUserToken(token);
  if (username) {
    const user = await User.find({ username: username });
    return user[0];
  }
};

const createUser = async (args) => {
  const user = await User.find({ username: args.username });
  if (user[0]) {
    return `User: ${args.username} already exist.`;
  } else {
    const newUser = new User({
      username: args.username,
      password: args.password,
      firstName: "Fitness Keeper",
      lastName: "",
      goalDailyCalories: 2000,
      goalDailyProtein: 0,
      goalDailyCarbohydrates: 0,
      goalDailyFat: 0,
      goalDailyActivity: 0,
      activities: [],
      meals: [],
      foods: [],
    });
    await newUser.save();
    return `User: ${args.username} created.`;
  }
};

const updateUser = async (args) => {
  const user = await getUser(args.token);
  if (user) {
    for (const field of Object.entries({
      firstName: args.firstName,
      lastName: args.lastName,
      goalDailyCalories: args.goalDailyCalories,
      goalDailyProtein: args.goalDailyProtein,
      goalDailyCarbohydrates: args.goalDailyCarbohydrates,
      goalDailyFat: args.goalDailyFat,
      goalDailyActivity: args.goalDailyActivity,
    })) {
      user[field[0]] = field[1];
    }
    await user.save();
    return `User updated.`;
  } else {
    return `User not exist.`;
  }
};

const deleteUser = async (args) => {
  const user = await getUser(args.token);
  if (user) {
    await user.remove();
    return `User deleted.`;
  } else {
    return `User not exist.`;
  }
};

module.exports = {
  validateUserAuthorizaton: validateUserAuthorizaton,
  getAllUsers: getAllUsers,
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
