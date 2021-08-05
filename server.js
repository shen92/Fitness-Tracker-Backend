// Import express and utils
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Import routes
const login = require("./routes/login");
const users = require("./routes/users");
const meals = require("./routes/meals");
const activities = require("./routes/activities");
const foods = require("./routes/foods");
const graphql = require("./routes/graphql");

// Express configurations
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Mongoose configurations
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => {
  console.log("Connected to database successfully.");
});

// Route configurations
app.use("/login", login);
app.use("/users", users);
app.use("/meals", meals);
app.use("/activities", activities);
app.use("/meals", foods);
app.use("/graphql", graphql);
app.get("/", (req, res) => {
  res.send({ message: "Welcome to fitness tracker" });
});

// App main
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}.`);
});
