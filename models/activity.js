const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activitySchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
});

module.exports = {
  Activity: mongoose.model("Activity", activitySchema),
};
