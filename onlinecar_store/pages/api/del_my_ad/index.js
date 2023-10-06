import { get } from "mongoose";
import dbConnect from "../../../config/dbConnect";
import userschema from "../../../models/user";
import cardataschema from "../../../models/cardataschema";
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
        const { ad_id ,user_id} = req.query;
        // console.log(ad_id)
        if(!user_id){
          let back = err(400, "user_Id not provided try reloading page", false);
          if (back) {
            return;
          }
        }
        if(user_id){
            let user_exist = await userschema.findOne({_id:user_id})
            if(!user_exist ){
              let back = err(400, "user not exist try reloading page", false);
              if (back) {
                return;
              }
            }
        }
       
        if (!ad_id) {
          let back = err(400, "Ad_Id not provided try reloading page", false);
          if (back) {
            return;
          }
        }
        let doc = await cardataschema.findOne({ _id: ad_id, seller_id:user_id });
        if (!doc) {
          let back = err(404, "car not found", false);
          if (back) {
            return;
          }
        }
        if (doc) {
          let images_to_del = doc.images_url;
          if (images_to_del.length > 0) {
            try {
              const public_ids = images_to_del.map((img) => {
                delete img.url;
                return img.img_id;
              });
              // console.log(public_ids)

              await imageKit.bulkDeleteFiles(
                public_ids,
                function (error, result) {
                  if (error) {
                    console.log(error);
                    let back = err(400, "error in imgkit deleting", false);
                    if (back) {
                      return;
                    }
                  }
                }
              );
            } catch (error) {
              console.log(error + "err");
              let back = err(400, "error in imgkit deleting", false);
              if (back) {
                return;
              }
            }
          }
          // console.log("i run ");
          let deleted_ad = await cardataschema.findByIdAndDelete(doc._id);
          if (!deleted_ad) {
            let back = err(417, err + "cannot delete ad", false);
            if (back) {
              return;
            }
          }
          if (deleted_ad) {
            let back = err(200, "your Ad is deleted", true);
            if (back) {
              return;
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
