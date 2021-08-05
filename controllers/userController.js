const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const validateUserAuthorizaton = async (req, res, next) => {
  let user;
  try {
    const buffer = Buffer.from(
      req.headers.authorization.split(" ")[1],
      "base64"
    );
    const username = buffer.toString("utf-8").split(":")[0];
    const password = buffer.toString("utf-8").split(":")[1];
    user = await User.find({ username: username, password: password });
    res.user = user[0];
  } catch (err) {
    res.user = {};
    return res.status(500).json({ message: err.message });
  }

  next();
};

const validateUserToken = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (token == null) throw new Error();
    const authorization = jwt.verify(token, process.env.PRIVATE_KEY);
    const buffer = Buffer.from(authorization, "base64");
    req.username = buffer.toString("utf-8").split(":")[0];
  } catch (err) {
    return res.status(403).json({ message: "Unauthorized." });
  }

  next();
};

const getAllUsers = async (req, res, next) => {
  let users = [];
  try {
    users = await User.find();
    res.users = users;
  } catch (err) {
    res.users = users;
    return res.status(500).json({ message: err.message });
  }

  next();
};

const getUser = async (req, res, next) => {
  let user = {};
  try {
    user = await User.find({ username: req.username });
    res.user = user[0];
  } catch (err) {
    res.user = {};
    return res.status(500).json({ message: err.message });
  }

  next();
};

const createUser = async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
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
    await user.save();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  next();
};

const updateUser = async (req, res, next) => {
  try {
    for (const field of Object.entries(req.body)) {
      res.user[field[0]] = field[1];
    }
    await res.user.save();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  next();
};

const deleteUser = async (req, res, next) => {
  try {
    await res.user.remove();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  next();
};

module.exports = {
  validateUserAuthorizaton: validateUserAuthorizaton,
  validateUserToken: validateUserToken,
  getAllUsers: getAllUsers,
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
