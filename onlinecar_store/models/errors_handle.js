import mongoose, { model } from "mongoose";
// import bcrypt from "bcryptjs";
import bcrypt from 'bcrypt'

// const mongoose = require("mongoose");

const Error_handling = new mongoose.Schema(
  {
     cloud_imgs_delete_erors:{
      type:Array,
      default:[],
      required:false
    },

  },
  { timestamps: true }
);


export default mongoose.models.errors || mongoose.model("errors", Error_handling);
// module.exports = mongoose.model("user", UserSchema);