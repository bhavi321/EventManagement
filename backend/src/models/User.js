const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      timezone: {
        type: String,
        default: "Asia/Kolkata",
      },
    },
    {
      timestamps: true,
    }
  );
  
const User = mongoose.model("User", userSchema);

module.exports = User;