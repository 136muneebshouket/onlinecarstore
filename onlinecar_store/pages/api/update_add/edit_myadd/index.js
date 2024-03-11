import cardataschema from "../../../../models/cardataschema";
import dbConnect from "../../../../config/dbConnect";
import usedbike_schema from "@/models/usedbike_schema";
import { send_mail } from "../../mail_to_admin/sendmail";
// const cloudinary = require("cloudinary").v2;
const ImageKit = require("imagekit");
// const  Cloudinary  = require("next-cloudinary");

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


export const config = {
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
}

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "POST":
      try {
        let recieved_obj = req.body;
        // console.log(recieved_obj);
        var { _id, user_id, images_to_del ,total_imgs} = req.body.carobj;
        if(total_imgs.length == 0){
          throw new Error("PLease Upload Some images")
        }
        if(!req.body.ad_type){
          throw new Error("Ad type is not given")
        }
        let doc;
        if(req.body.ad_type == 'bike'){
          doc = await usedbike_schema.findOne({ _id: _id, seller_id: user_id });
        }
        if(req.body.ad_type == 'car'){
          doc = await cardataschema.findOne({ _id: _id, seller_id: user_id });
        }
        
        if (!doc) {
          throw new Error(`${req.body.ad_type} not updated`)
        } 
        // console.log(doc)

        if (doc) {
          Object.entries(recieved_obj.carobj).map(([key, value]) => {
            if (
              key != "_id" &&
              key != "createdAt" &&
              key != "updatedAt" &&
              key != "imgs_to_uplod" &&
              key != "images_url" &&
              key != "images_to_del" &&
              key != "user_id"
            ) {
              doc[key] = value;
            }
          });

          if (images_to_del?.length > 0) {
            // console.log(images_to_del)
            // const public_ids = images_to_del.map(
            //   (img) => `my-project-images/${img.split("/").pop().split(".")[0]}`
            // );
            //  console.log(public_ids)
            try {
              await imageKit.bulkDeleteFiles(
                images_to_del,
                function (error, result) {
                  if (error) {
                    console.log(error);
                    throw new Error("error in imgkit deleting")
                  }
                }
              );
            } catch (error) {
              console.log(error + "err");
              throw new Error("error in imgkit deleting");
            }
            const newimages_url = doc.images_url.filter((id) => {
              return !images_to_del.includes(id.img_id);
            });
            doc.images_url = newimages_url;
          }
          // if (imgs_to_uplod?.length > 0) {
          //   const imgs = [];
          //   for (const obj of imgs_to_uplod) {
          //     try {
          //       const file = obj.url;
          //       const imgname = obj.filename;
          //       const response = await imageKit.upload({
          //         file,
          //         fileName: imgname,
          //       });
          //       if (response) {
          //         console.log(response);
          //         if (response.fileId) {
          //           imgs.push({
          //             img_id: response.fileId,
          //             img_url: response.url,
          //           });
          //         }
          //       }
          //       if (!response) {
          //         console.log("error in uploding imgs");
          //         continue;
          //       }
          //     } catch (error) {
          //       console.log(error);
          //       continue;
          //     }
          //   }
          //   if (imgs.length > 0) {
          //     for (const obj of imgs) {
          //       doc.images_url.push(obj);
          //     }
          //   } else {
          //     throw new Error("error in imgkit uploding");
          //   }
          // }

          // console.log(doc);
          doc.active = true;
          doc.pending = 0;
          doc.reject_reasons  = [];
          let updated = await doc.save();
          // const user = await cardataschema.findByIdAndUpdate({id : });
          if (updated) {
            if(req.body.ad_type == 'car'){
              let send_email_admin = await send_mail(updated.slug,'Approval')
            }
           
            res.status(201).json({
              success: true,
              message: "updated successfully",
              car_id: doc._id,
            });
          } else {
            throw new Error(`${req.body.ad_type} not updated`);
          }
        }

        // res.status(200).json({
        //   success: true,
        //   message: "message",
        // });
        // return true;
      } catch (err) {
        if (err.code === 11000) {
          const field = Object.keys(err.keyValue)[0]; // Get the field causing the uniqueness error
          const errorMessage = `The ${field} already exists.`;
          res.status(400).json({
            success: false,
            message: errorMessage,
          });
          // Send the uniqueness error message to the user
        } else if (err.errors) {
          // Handle other validation errors
          const errorMessages = [];
          for (let key in err.errors) {
            errorMessages.push(err.errors[key].message);
          }
          res.status(400).json({
            success: false,
            message: errorMessages,
          });
          // Send other validation error messages to the user
        } else {
          // Handle other types of errors
          res.status(500).json({
            success: false,
            message: err.message,
          });
        }
      }
      break;
    default:
      return;
  }
}
