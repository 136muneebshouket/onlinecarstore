import mongoose, { model } from "mongoose";
// import bcrypt from "bcryptjs";
// import bcrypt from 'bcrypt'

// const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    title:{
      type:String,
      required:[true, 'title is required'],
      unique: [true, 'title already exist'],
    },
    source: {
      type: String,
      required: [true, 'Source is required'],
    },
    description: {
      type: String,
      required: [true, 'description is required'],
    },
    catogery: {
      type: String,
      required: [true, 'catogery is required'],
    },
    image: {
      type: Object,
      required:false
    },
    priority: {
      type: Number,
      default:0,
    },
    
  },
  { timestamps: true }
);

export default mongoose.models.utube || mongoose.model("utube", UserSchema);
// module.exports = mongoose.model("user", UserSchema);