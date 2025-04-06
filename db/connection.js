const service=require('../model/service')
const PORT = 8080;
const mongoose = require("mongoose");
const mongoose_connection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected success");
  } catch (error) {
    console.log("db connection failed", error);
    process.exit(1);  // Exit if DB connection fails
  }
};

module.exports = mongoose_connection;