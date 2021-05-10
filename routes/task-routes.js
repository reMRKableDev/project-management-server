const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/task-model");
const Project = require("../models/project-model");

const router = express.Router();

// GET route => to retrieve a specific task
router.get("/projects/:projectId/tasks/:taskId", (req, res, next) => {
  Task.findById(req.params.taskId)
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((error) => {
      res.json(error);
    });
});

// POST route => to create a new task
router.post("/tasks", (req, res, next) => {
  const { title, description, projectID } = req.body;

  Task.create({
    title,
    description,
    project: projectID,
  })
    .then((response) => {
      console.log("task", response);
      return Project.findByIdAndUpdate(projectID, {
        $push: { tasks: response._id },
      });
    })
    .then((theResponse) => {
      res.status(200).json(theResponse);
    })
    .catch((err) => {
      res.status(500).json(err);
      next(err);
    });
});

// PUT route => to update a specific task
router.put("/tasks/:id", (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Task.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.json({
        message: `Task with ${id} is updated successfully.`,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

// DELETE route => to delete a specific task
router.delete("/tasks/:id", (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Task.findByIdAndRemove(id)
    .then(() => {
      res.json({
        message: `Task with ${id} is removed successfully.`,
      });
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
