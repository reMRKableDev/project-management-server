const session = require("express-session");
const MongoStore = require("connect-mongo");
const {
  SESS_SECRET,
  SESS_COOKIE_NAME,
  MONGO_URI_ATLAS,
  MONGO_URI_LOCAL,
  NODE_ENV,
} = process.env;

module.exports = (incomingApp) => {
  incomingApp.use(
    session({
      secret: SESS_SECRET,
      name: SESS_COOKIE_NAME,
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000 * 60 * 24,
      },
      store: MongoStore.create({
        mongoUrl: MONGO_URI_LOCAL || MONGO_URI_ATLAS,
        ttl: 60 * 60 * 24,
      }),
    })
  );
};
