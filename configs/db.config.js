const mongoose = require("mongoose");
const { MONGO_URI_LOCAL, MONGO_URI_ATLAS, NODE_ENV } = process.env;

// CREATE A FUNCTION FOR MONGO CONNECTION --> A better way to switch between production and development environments

const connectDb = (mongoUri) =>
  mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((x) => {
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`
      );
    })
    .catch((err) => {
      console.error("Error connecting to mongo", err);
    });

// CHECK THE CURRENT WORKING ENVIRONMENT
NODE_ENV === "development"
  ? connectDb(MONGO_URI_LOCAL)
  : connectDb(MONGO_URI_ATLAS);
