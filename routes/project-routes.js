const { Router } = require("express");
const mongoose = require("mongoose");

const Project = require("../models/project-model");
const Task = require("../models/task-model");

const router = Router();

router.post("/projects", (req, res, next) => {
  const { title, description, imageUrl } = req.body;
  console.log("LOGGED IN USER PROJECTS", req.user);

  Project.create({
    title,
    description,
    imageUrl,
    tasks: [],
    owner: req.user._id,
  })
    .then((createdProject) => {
      res.status(200).json(createdProject);
    })
    .catch((err) => {
      res.status(500).json(err);
      next(err);
    });
});

router.get("/projects", (req, res, next) => {
  Project.find()
    .populate("tasks")
    .then((allTheProjects) => {
      console.log("LOGGED IN USER IN PROJECTS", req.user);
      res.status(200).json(allTheProjects);
    })
    .catch((err) => {
      res.status(500).json(err);
      next(err);
    });
});

router.get("/projects/:id", (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findById(id)
    .populate("tasks")
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      res.json(error);
      next(err);
    });
});

// PUT route => to update a specific project
router.put("/projects/:id", (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.status(200).json({
        message: `Project with ${id} is updated successfully.`,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
      next(err);
    });
});

router.delete("/projects/:id", (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findByIdAndRemove(id)
    .then(() => {
      res.json({
        message: `Project with ${id} is removed successfully.`,
      });
    })
    .catch((error) => {
      res.json({ error, errorMessage: `Something went wrong` });
    });
});

module.exports = router;
