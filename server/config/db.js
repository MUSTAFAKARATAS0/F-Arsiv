const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `connected to database ${mongoose.connection.host} `.bgCyan.white
    );
  } catch (error) {
    console.log(`error in connection db ${error} `.bgRed.white);
  }
};
module.exports = connectDB;
