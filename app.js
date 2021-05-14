require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const passport = require("passport");

// CONNECT DATABASE CONFIGS
require("./configs/db.config");

// CONNECT PASSPORT CONFIGS
require("./configs/passport.config");

// INSTANTIATE EXPRESS APP
const app = express();

// app MIDDLEWARE SETUP
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// SESSION CONFIGS
require("./configs/session.config")(app);

// PASSPORT CONFIGS
app.use(passport.initialize());
app.use(passport.session());

// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:
require("./configs/cors.config")(app);

// ROUTES MIDDLEWARE STARTS HERE:
app.use("/api", require("./routes/project-routes"));
app.use("/api", require("./routes/task-routes"));
app.use("/api", require("./routes/auth-routes"));
app.use("/api", require("./routes/upload-routes"));

module.exports = app;
