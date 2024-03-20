import { get } from "mongoose";
import dbConnect from "../../../config/dbConnect";
import userschema from "../../../models/user";
import cardataschema from "../../../models/cardataschema";
import usedbike_schema from "@/models/usedbike_schema";
import errors_handle from "../../../models/errors_handle";
// const cloudinary = require("cloudinary").v2;
// const  Cloudinary  = require("next-cloudinary");
const ImageKit = require("imagekit");

// cloudinary.config({
//   cloud_name: process.env.APP_CLOUD_NAME,
//   api_key: process.env.APP_CLOUD_API_KEY,
//   api_secret: process.env.APP_SECRET_KEY,
// });
const imageKit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATEKEY,
  urlEndpoint: process.env.URLENDPOINT,
});

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "DELETE":
      try {
        const { ad_id ,user_id , ad_type } = req.query;
        // console.log(ad_id)
        if(!user_id){
          throw new Error('user_Id not provided try reloading page')
        }
        if(user_id){
            let user_exist = await userschema.countDocuments({_id:user_id})
            if(!user_exist){
              throw new Error('user not exist try reloading page or Login')
            }
        }
       
        if (!ad_id) {
          throw new Error('Ad_Id not provided try reloading page')
        }
    
        // if(ad_type == 'cars'){
          let doc = await usedbike_schema.findOne({ _id: ad_id, seller_id:user_id });
        // }
        // if(ad_type == 'bikes'){
        //   doc = await usedbike_schema.findOne({ _id: ad_id, seller_id:user_id });
        // }
        
        if (!doc) {
          throw new Error(`${ad_type} not found`)
        }
        // console.log(doc)
        if (doc) {
          let imgs_deleted = false;
          let images_to_del = doc.images_url;
          if (images_to_del?.length > 0) {
            try {
              const public_ids = images_to_del.map((img) => {
                delete img.url;
                return img.img_id;
              });
              // console.log(public_ids)

              let deleteimgs = await imageKit.bulkDeleteFiles(public_ids);
              if(deleteimgs){
                imgs_deleted = true
              }
            } catch (error) {
              console.log(error + "err");
              throw new Error('error in imgkit deleting')
            
            }
          }
          if(imgs_deleted == false){
            throw new Error('Image deletion failed from imgkit')
          }         
          if(imgs_deleted == true){
            let deleted_ad = await cardataschema.findByIdAndDelete(doc._id);
            if (!deleted_ad) {
              throw new Error('cannot delete ad')
            }
            if (deleted_ad) {
              let back = err(200, "your Ad is deleted", true);
              if (back) {
                return;
              }
            }
          }
          
        }
        // let getback = false;
        function err(status, message, success) {
          // getback = true
          res.status(status).json({
            success: success,
            message: message,
          });
          return true;
        }

        // res.status(417).json({
        //   success: false,
        //   message: err.message || "something went wrong",
        // });

      } catch (err) {
        res.status(500).json({
          success: false,
          message: err.message || "something went wrong",
        });
      }
      break;
    default:
      return;
  }
}
