import mongoose, { model } from "mongoose";
// import bcrypt from "bcryptjs";
// import bcrypt from 'bcrypt'

// const mongoose = require("mongoose");

const Error_handling = new mongoose.Schema(
  {
    order_type:{
      type:String,
      required:[true, 'Order type is required']
    },
    city: {
        type: String,
        minlength: [1,'too less city length'],
        maxlength: [200,'too much city length'],
        required: [true, 'Location is required'],
      },
      area: {
        type: String,
        maxlength: [200,'too much area length'],
        default:""
      },
      Address: {
        type: String,
        maxlength: [200,'too much Adress length'],
        required: [true, 'Address is required'],
      },
      brand:{
        type:String,
        maxlength: [200,'too much brand length'],
        required:[true, 'Car brand is required'],
      },
      model: {
        type:String,
        maxlength: [200,'too much model length'],
        required:[true, 'Car model is required'],
      },
      variant_name: {
        type: String,
        maxlength: [200,'too much variant_name length'],
        required:false,
        default:''
    },
    modelyear: {
        type:Number,
        min: [10,'too less model year length'],
        max: [100000,'too much model year length'],
        required:false,
        default:null
      },
      slot: {
        type:String,
        maxlength: [200,'too much slot length'],
        required:[true, 'slot date is required'],
      },
      slottime: {
        type:Number,
        max: [200000,'too much slot length'],
        required:[true, 'slottime is required'],
      },
      username: {
        type:String,
        maxlength: [200,'too username length'],
        required:[true, 'username is required'],
      },
      email: {
        type:String,
        maxlength: [200,'too username length'],
        required:[true, 'email is required'],
      },
     
      phone_no: {
        type:String,
        maxlength: [200,'too phone_no length'],
        required:[true, 'phone_no is required'],
      },
      ad_id: {
        type:mongoose.Schema.Types.ObjectId,
        // minlength: [1,'too less ad_id length'],
        maxlength: [200,'too much ad_id length'],
        required:false
      },
      user_id: {
        type:mongoose.Schema.Types.ObjectId,
        minlength: [1,'too less user_id length'],
        maxlength: [200,'too much user_id length'],
        required:[true, 'user_id id is required'],
      },
      accepted: {
        type:Boolean,
        default:false,
        // required:[true, 'user_id id is required'],
      },
      completed: {
        type:Boolean,
        default:false,
        // required:[true, 'user_id id is required'],
      },
  },
  { timestamps: true }
);


export default mongoose.models.inspection_req || mongoose.model("inspection_req", Error_handling);
// module.exports = mongoose.model("user", UserSchema);