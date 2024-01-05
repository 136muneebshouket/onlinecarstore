import mongoose, { model } from "mongoose";
// import bcrypt from "bcryptjs";
// import bcrypt from 'bcrypt'

// const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    areas: [
      {
        name: {
          type: String,
          required: true,
        },
        slots: [
          {
            time: { type: Date },
          },
        ],
      },
    ],
  }
  //   { timestamps: true }
);

export default mongoose.models.slots || mongoose.model("slots", UserSchema);
// module.exports = mongoose.model("user", UserSchema);
