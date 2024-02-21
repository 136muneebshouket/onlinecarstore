import mongoose, { model } from "mongoose";
// import bcrypt from "bcryptjs";
// import bcrypt from 'bcrypt'

// const mongoose = require("mongoose");

const inspection_schema = new mongoose.Schema(
  {
    ad_id: {
      type: mongoose.Schema.Types.ObjectId,
      minlength: [1, "too less id length"],
      maxlength: [500, "too much id length"],
      required: [true, "Ad Id is required"],
      unique:true
    },
    all_imgs: {
      type: Array,
      // required: [true, "main image is required"],
    },
    car_name: {
      type: String,
      maxlength: [500, "too much area length"],
      required: [true, "car_name is required"],
    },
    cust_dealer_name: {
      type: String,
      maxlength: [500, "too much area length"],
      required: [true, "custumer or dealer name is required"],
    },
    engine_cc: {
      type: Number,
      min: [10, "too less enginecc length"],
      max: [100000, "too much enginecc length"],
      required: [true, "Engine capacity is required"],
    },
    milage: {
      type: Number,
      min: [10, "too much Mileage length"],
      max: [100000, "too much Mileage length"],
      required: [true, "Car Mileage is required"],
    },
    transmission: {
      type: String,
      maxlength: [500, "too much transmission length"],
      required: [true, "car transmission is required"],
    },
    date_of_insp: {
      type: Date,
      required: [true, "date of inspection is required"],
    },
    chas_no: {
      type: String,
      maxlength: [500, "too much chasis number length"],
      required: [true, "chasis number is required"],
    },
    engine_type_no: {
      type: String,
      maxlength: [500, "too much engine_type number length"],
      required: [true, "engine_type number is required"],
    },
    reg_no: {
      type: String,
      maxlength: [500, "too much registration number length"],
      required: [true, "registration number is required"],
    },
    fuel_type: {
      type: String,
      maxlength: [500, "too much fuel_type length"],
      required: [true, "fuel_type is required"],
    },
    color: {
      type: String,
      maxlength: [500, "too much color length"],
      required: [true, "color is required"],
    },
    location: {
      type: String,
      maxlength: [500, "too much location length"],
      required: [true, "location is required"],
    },
    reg_city: {
      type: String,
      maxlength: [500, "too much registration length"],
      required: [true, "registration is required"],
    },
    Inspect_comments: {
      type: String,
    },

    Extrior_conditions: {
      type: Array,
      default: [],
    },

    accident_checklist: {
      type: Array,
      default: [],
    },
    ETC: {
      type: Array,
      default: [],
    },

    brakes: {
      type: Array,
      default: [],
    },
    susp_steering: {
      type: Array,
      default: [],
    },
    interior: {
      type: Array,
      default: [],
    },
    Ac_heater: {
      type: Array,
      default: [],
    },
    Electronics: {
      type: Array,
      default: [],
    },
    Exterior: {
      type: Array,
      default: [],
    },
    Tyres: {
      type: Array,
      default: [],
    },
    Test_drive: {
      type: Array,
      default: [],
    },
    percentages:{
      Extrior_conditions:{
        type:Number,
        min: [0,'too less percentage'],
        max: [100,'too much percentage'],
      },
      accident_checklist:{
        type:Number,
        min: [0,'too less percentage'],
        max: [100,'too much percentage'],
      },
      ETC:{
        type:Number,
        min: [0,'too less percentage'],
        max: [100,'too much percentage'],
      },
      brakes:{
        type:Number,
        min: [0,'too less percentage'],
        max: [100,'too much percentage'],
      },
      susp_steering:{
        type:Number,
        min: [0,'too less percentage'],
        max: [100,'too much percentage'],
      },
      interior:{
        type:Number,
        min: [0,'too less percentage'],
        max: [100,'too much percentage'],
      },
      Ac_heater:{
        type:Number,
        min: [0,'too less percentage'],
        max: [100,'too much percentage'],
      },
      Electronics:{
        type:Number,
        min: [0,'too less percentage'],
        max: [100,'too much percentage'],
      },
      Exterior:{
        type:Number,
        min: [0,'too less percentage'],
        max: [100,'too much percentage'],
      },
      Tyres:{
        type:Number,
        min: [0,'too less percentage'],
        max: [100,'too much percentage'],
      },
    },
    overall_rating:{
      type:Number,
      min: [0,'too less percentage'],
      max: [100,'too much percentage'],
    }
    
  },
  { timestamps: true }
);

export default mongoose.models.inspec_reports ||
  mongoose.model("inspec_reports", inspection_schema);
// module.exports = mongoose.model("user", UserSchema);
