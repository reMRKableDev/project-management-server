const cors = require("cors");

const { FRONTEND_ENDPOINT } = process.env;

module.exports = (incomingApp) => {
  incomingApp.use(
    cors({
      credentials: true,
      origin: [FRONTEND_ENDPOINT],
    })
  );
};
