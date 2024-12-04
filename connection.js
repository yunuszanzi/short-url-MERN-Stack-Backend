const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
// Connect to MongoDB
const connectDb = async (url) => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB Conected Successfully!");
    })
    .catch(() => {
      console.log(`MongoDB Conected Failure: ${err}`);
    });
};

module.exports = { connectDb };
