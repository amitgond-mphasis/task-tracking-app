const mongoose = require("mongoose"); //importing file for creating schema and storing into a variable



// below line code create an object of mongoose and store it in taskSchema
const taskSchema = new mongoose.Schema({
  taskName: { type: String, unique: true, trim: true, required: [true, "name is required"], },
  discription: { type: String, trim: true, },
  assignedEmployee: { type: String, trim: true, },
  status: { type: String, trim: true, }
})
//creting schema for user details
const userSchema = new mongoose.Schema(
  {

    username: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      trim: true,
    },
    notification: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
      required: false
    },
    taskList: [taskSchema]


  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("User", userSchema);
