const cors = require("cors");
const { FRONTEND_ENDPOINT_DEVELOPMENT, FRONTEND_ENDPOINT_PRODUCTION } =
  process.env;

module.exports = (incomingApp) => {
  incomingApp.use(
    cors({
      credentials: true,
      origin: [FRONTEND_ENDPOINT_DEVELOPMENT, FRONTEND_ENDPOINT_PRODUCTION],
    })
  );
};
