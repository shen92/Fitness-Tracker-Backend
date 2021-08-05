const jwt = require("jsonwebtoken");

const validateUserToken = (token) => {
  const authorization = jwt.verify(token, process.env.PRIVATE_KEY);
  const buffer = Buffer.from(authorization, "base64");
  const username = buffer.toString("utf-8").split(":")[0];
  return username;
};

module.exports = {
  validateUserToken: validateUserToken,
};
