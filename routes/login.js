const express = require("express");
const jwt = require("jsonwebtoken");

const { validateUserAuthorizaton } = require("../controllers/userController");

const router = express.Router();

/**
 * GET /login
 *
 * User login aka sign in
 */
router.get("/", validateUserAuthorizaton, async (req, res) => {
  if (res.user) {
    const authorization = req.headers.authorization.split(" ")[1];
    const userToken = jwt.sign(authorization, process.env.PRIVATE_KEY);
    res.json({ token: userToken });
  } else {
    res.status(401).json({ message: "Invalid username or password." });
  }
});

module.exports = router;
