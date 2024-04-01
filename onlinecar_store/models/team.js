import mongoose, { model } from "mongoose";
// import bcrypt from "bcryptjs";
import bcrypt from "bcrypt";

// const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    unique:true
  },
  role: {
    type: Array,
    default: [],
  },
  token: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  },
  task: {
    type: Array,
    default: [],
  },
});

export default mongoose.models.team || mongoose.model("team", teamSchema);
// module.exports = mongoose.model("user", UserSchema);
