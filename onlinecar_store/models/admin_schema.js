import mongoose, { model } from "mongoose";
// import bcrypt from "bcryptjs";
import bcrypt from 'bcrypt'

// const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
        type: String,
        unique: [true, 'Email already exist'],
        lowercase:[true, 'Email must be lowercase'],
        required: [true, 'Email is required'],
        minlength: 4,
        maxlength: 265
      },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 1,
      maxlength: 265
    },
    phone:{
      type:String,
      required:true,
      default:"",
      minlength: 11,
      maxlength: 11
    },
    resetToken: {
      type:String,
      required:false,
      default:""
    },
    resetTokenExpiration: {
      type: Date,
      required:false,
     
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.models.admin || mongoose.model("admin", UserSchema);
// module.exports = mongoose.model("user", UserSchema);