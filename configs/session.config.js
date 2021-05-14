const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

module.exports = (incomingApp) => {
  incomingApp.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 60 * 60 * 24,
      }),
    })
  );
};
