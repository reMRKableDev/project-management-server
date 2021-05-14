const session = require("express-session");
const MongoStore = require("connect-mongo");
const { SESS_SECRET, MONGO_URI_ATLAS, MONGO_URI_LOCAL, NODE_ENV } = process.env;

module.exports = (incomingApp) => {
  // SET TO TRUST PROXY WHEN APP IS DEPLOYED
  incomingApp.set("trust proxy", 1);

  incomingApp.use(
    session({
      secret: SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        // sameSite checks our environment
        // on development = lax --> cookies are only set when the domain in the URL of the browser matches the domain of the cookie
        sameSite: NODE_ENV === "production" ? "none" : "lax",
        secure: NODE_ENV === "production",
        httpOnly: true,
      },
      store: MongoStore.create({
        mongoUrl: MONGO_URI_LOCAL || MONGO_URI_ATLAS,
        ttl: 60 * 60 * 24,
      }),
    })
  );
};
