const mongoose = require("mongoose");

module.exports = async (app) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection successful !!");

    // Listening to server
    await app.listen(process.env.PORT || 5000, () =>
      console.log(`Server is listening at http://localhost:${process.env.PORT}`)
    );
  } catch (err) {
    console.log("Database connection failed !!");
    console.log(err);
    process.exit(1);
  }
};
