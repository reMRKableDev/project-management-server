const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const projectSchema = new Schema({
  title: String,
  description: String,
  imageUrl: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Project", projectSchema);
