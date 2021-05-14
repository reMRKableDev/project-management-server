require("dotenv").config(); // ENSURES THAT WE CAN READ FROM THE .env FILE

// DEPENDENCIES
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const passport = require("passport");

// CONNECT DATABASE CONFIGS
require("./configs/db.config");

// CONNECT PASSPORT CONFIGS
require("./configs/passport.config");

// INSTANTIATE EXPRESS app
const app = express();

// app MIDDLEWARE SETUP
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// SET SESSION CONFIGS TO THE app
require("./configs/session.config")(app);

// ENSURE app MAKES USE OF PASSPORT IN ORDER FOR THE PASSPORT CONFIGS TO WORK
app.use(passport.initialize());
app.use(passport.session());

// ADD CORS SETTINGS TO app HERE TO ALLOW CROSS-ORIGIN INTERACTION:
require("./configs/cors.config")(app);

// ROUTES MIDDLEWARE STARTS HERE:
app.use("/api", require("./routes/project-routes"));
app.use("/api", require("./routes/task-routes"));
app.use("/api", require("./routes/auth-routes"));
app.use("/api", require("./routes/upload-routes"));

module.exports = app;
