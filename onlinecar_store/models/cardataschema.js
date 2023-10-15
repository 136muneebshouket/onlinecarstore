import mongoose, { model } from "mongoose";
// import bcrypt from "bcryptjs";
// import bcrypt from 'bcrypt'

// const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    seller_id:{
      type:String,
      required:[true, 'Seller id is required'],
    },
    city: {
      type: String,
      required: [true, 'Location is required'],
    },
    area: {
      type: String,
      default:""
    },
    brand:{
      type:String,
      required:[true, 'Car brand is required'],
    },
    modelyear: {
      type:Number,
      required:false,
      default:null
    },
    Registered_In: {
        type: String,
        required:[true, 'register location is required'],
      },
    color: {
      type:String,
      required:[true, 'Car color is required'],
    },
    Mileage: {
      type:Number,
      required:[true, 'Car Mileage is required'],
    },
    price: {
      type:Number,
      required:[true, 'Car price is required'],
    },
    comments: {
      type:String,
      required:[true, 'Car price is required'],
    },
    enginetype: {
      type:String,
      required:[true, 'engine type is required'],
    },
    model: {
      type:String,
      required:[true, 'Car model is required'],
    },
    enginecc: {
      type:Number,
      required:[true, 'Engine capacity is required'],
    },
    transmission: {
      type:String,
      required:[true, 'car transmission is required'],
    },
    Assembly: {
      type:String,
      required:[true, 'car Assembly is required'],
    },
    carfeatures: {
        type: Array,
        default: [],
      required:[true, 'car features are required'],
    },
    Phone_no: {
        type: String,
      required:[true, 'Phone number is required'],
    },
    variant_name: {
        type: String,
      required:false,
      default:''
    },
    duration: {
      type: String,
      default:''
    },
    Secondary_no: {
      type: String,
      required:false,
    },
    images_url: {
      type: Array,
        default: [],
        required:true
    },
    featured: {
      type: Boolean,
      required:false,
      default:false
    },
    certified: {
      type: Boolean,
      required:false,
      default:false
    },
    inspected: {
      type: Boolean,
      required:false,
      default:false
    },
    auction_sheet: {
      type: Boolean,
      required:false,
      default:false
    },
    managed_by: {
      type: Boolean,
      required:false,
      default:false
    },
    overall_incpection_rating:{
      type : Number,
      required:false
    }
   
  },
  { timestamps: true }
);



export default mongoose.models.carscollection || mongoose.model("carscollection", carSchema);
// module.exports = mongoose.model("user", UserSchema);