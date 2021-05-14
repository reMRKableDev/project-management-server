const cors = require("cors");
const { CORS_ORIGIN } = process.env;

module.exports = (incomingApp) => {
  incomingApp.use(
    cors({
      credentials: true,
      origin: CORS_ORIGIN,
    })
  );
};
