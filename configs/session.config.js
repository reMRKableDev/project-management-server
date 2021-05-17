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
  incomingApp.set("trust proxy", 1);

  incomingApp.use(
    session({
      secret: SESS_SECRET,
      name: SESS_COOKIE_NAME,
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: NODE_ENV === "production" ? "none" : "lax",
        secure: NODE_ENV === "production",
      },
      store: MongoStore.create({
        mongoUrl: MONGO_URI_LOCAL || MONGO_URI_ATLAS,
        ttl: 60 * 60 * 24,
      }),
    })
  );
};
