const cors = require("cors");

const { FRONTEND_ENDPOINT } = process.env;

module.exports = (incomingApp) => {
  console.log("FE", FRONTEND_ENDPOINT);
  incomingApp.use(
    cors({
      credentials: true,
      origin: FRONTEND_ENDPOINT,
    })
  );
};
