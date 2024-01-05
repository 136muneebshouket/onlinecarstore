import mongoose, { model } from "mongoose";
// import bcrypt from "bcryptjs";
// import bcrypt from 'bcrypt'

// const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    ad_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Ad Id is Required"],
    },
    seller_id: {
      type: String,
      required: [true, "seller Id is Required"],
    },
    reports: [{
     reporter_id:{
        type: String,
        required: [true, "Reporter Id is Required"],
     },
     reason:{
        type: String,
        required: [true, "Report Reason is Required"],
     },

    }],
  },
  { timestamps: true }
);

export default mongoose.models.reportedads ||
  mongoose.model("reportedads", UserSchema);
// module.exports = mongoose.model("user", UserSchema);
