const { Router } = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../models/user-model");

const authRoutes = Router();

const SALT_ROUNDS = 10;
const PASSWORD_REGEX_FORMAT = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

authRoutes.post("/signup", (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }

  if (!PASSWORD_REGEX_FORMAT.test(password)) {
    res.status(500).json({
      message:
        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  bcrypt
    .genSalt(SALT_ROUNDS)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        username,
        password: hashedPassword,
      });
    })
    .then((userFromDB) => {
      // save user in session
      req.login(userFromDB, (err) => {
        if (err) {
          res.status(500).json({ message: "Session save went bad." });
          return;
        }

        const { _id, username, createdAt, updatedAt } = req.user;

        res.status(200).json({ _id, username, createdAt, updatedAt });
      });
    })
    .catch((error) => {
      if (error.code === 11000) {
        res.status(500).json({
          errorMessage:
            "Username needs to be unique. Username has already been used.",
        });
      } else {
        next(error);
      }
    });
});

authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }

      const { _id, username, createdAt, updatedAt } = theUser;
      res.status(200).json({ _id, username, createdAt, updatedAt });
    });
  })(req, res, next);
});

authRoutes.post("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

authRoutes.get("/loggedin", (req, res) => {
  if (req.isAuthenticated()) {
    const { _id, username, createdAt, updatedAt } = req.user;
    res.status(200).json({ _id, username, createdAt, updatedAt });
    return;
  }

  res.status(403).json({ message: "Unauthorized" });
});

module.exports = authRoutes;
