import mongoose, { model } from "mongoose";
// import bcrypt from "bcryptjs";
// import bcrypt from 'bcrypt'

// const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    seller_id:{
      type:mongoose.Schema.Types.ObjectId,
      minlength: [1,'too less seller_id length'],
      maxlength: [500,'too much seller_id length'],
      required:[true, 'Seller id is required'],
    },
    seller_email:{
      type:String,
      maxlength: [500,'too much seller_email length'],
      required:false ,
      default:''
    },
    city: {
      type: String,
      minlength: [1,'too less city length'],
      maxlength: [500,'too much city length'],
      required: [true, 'Location is required'],
    },
    area: {
      type: String,
      maxlength: [500,'too much area length'],
      default:""
    },
    brand:{
      type:String,
      maxlength: [500,'too much brand length'],
      required:[true, 'Car brand is required'],
    },
    modelyear: {
      type:Number,
      min: [10,'too less modelyear length'],
      max: [100000,'too much modelyear length'],
      required:false,
      default:null
    },
    Registered_In: {
        type: String,
        maxlength: [500,'too much Registered_In length'],
        required:[true, 'register location is required'],
      },
    color: {
      type:String,
      maxlength: [500,'too much color length'],
      required:[true, 'Car color is required'],
    },
    Mileage: {
      type:Number,
      min: [10 ,'too much Mileage length'],
      max: [100000,'too much Mileage length'],
      required:[true, 'Car Mileage is required'],
    },
    price: {
      type:Number,
      min: [1000,'too less price'],
      max: [1000000000000,'too much price'],
      required:[true, 'Car price is required'],
    },
    comments: {
      type:String,
      maxlength: [1000,'too much comments'],
      required:[true, 'Car price is required'],
    },
    enginetype: {
      type:String,
      maxlength: [500,'too much enginetype'],
      required:[true, 'engine type is required'],
    },
    body_type: {
      type:String,
      maxlength: [500,'too much bodytype'],
      required:[true, 'engine type is required'],
    },
    model: {
      type:String,
      maxlength: [500,'too much model length'],
      required:[true, 'Car model is required'],
    },
    enginecc: {
      type:Number,
      min: [10,'too less enginecc length'],
      max: [100000,'too much enginecc length'],
      required:[true, 'Engine capacity is required'],
    },
    transmission: {
      type:String,
      maxlength: [500,'too much transmission length'],
      required:[true, 'car transmission is required'],
    },
    Assembly: {
      type:String,
      maxlength: [500,'too much Assembly length'],
      required:[true, 'car Assembly is required'],
    },
    carfeatures: {
        type: Array,
        default: [],
      required:[true, 'car features are required'],
    },
    Phone_no: {
        type: String,
        maxlength: [500,'too much Phone_no length'],
        required:[true, 'Phone number is required'],
    },
    variant_name: {
        type: String,
        maxlength: [500,'too much variant_name length'],
        required:false,
        default:''
    },
    Secondary_no: {
      type: String,
      maxlength: [500,'too much Secondary_no length'],
      required:false,
    },
    images_url: {
      type: Array,
        default: [],
        required:true
    },
    slug: {
      type: String,
      default: 'slug',
      required:true
    },
    pending: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
      required:false
    },
    reject_reasons: {
      type: Array,
    },
    featured: {
      type: Boolean,
      required:false,
      default:false
    },
    certified: {
      type: Boolean,
      required:false,
    },
    inspected: {
      type: Boolean,
      required:false,
    },
    overall_incpection_rating:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'inspec_reports'
    },
    auction_sheet: {
      type: Boolean,
      required:false,
    },
    managed_by: {
      type: Boolean,
      required:false,
    },
    owner_info:{
      type:mongoose.Schema.Types.ObjectId,
      required:false,
    },
    views:{
      type : Number , 
      default : 0
    },
   
   
  },
  { timestamps: true }
);



export default mongoose.models.carscollection || mongoose.model("carscollection", carSchema);
// module.exports = mongoose.model("user", UserSchema);