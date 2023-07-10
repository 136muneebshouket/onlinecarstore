import mongoose, { model } from "mongoose";
// import bcrypt from "bcryptjs";
import bcrypt from 'bcrypt'

// const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    full_name:{
      type:String,
      required:[true, 'Fullname field is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      unique: [true, 'Email must be lowercase'],
      lowercase:[true, 'Email must be lowercase'],
      required: [true, 'Email is required'],
    },
    avatar:{
      type:String,
      required:false,
      default:""
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

export default mongoose.models.users || mongoose.model("users", UserSchema);
// module.exports = mongoose.model("user", UserSchema);