require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

// CONNECT DATABASE CONFIGS
require("./configs/db.config");

// CONNECT PASSPORT CONFIGS
require("./configs/passport.config");

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// MIDDLEWARE SETUP
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// SESSION CONFIGS
require("./configs/session.config")(app);

// PASSPORT CONFIGS
app.use(passport.initialize());
app.use(passport.session());

// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);

// ROUTES MIDDLEWARE STARTS HERE:
app.use("/api", require("./routes/project-routes"));
app.use("/api", require("./routes/task-routes"));
app.use("/api", require("./routes/auth-routes"));
app.use("/api", require("./routes/upload-routes"));

module.exports = app;
