import dbConnect from "../../../config/dbConnect";
import cardataschema from "../../../models/cardataschema";
import errors_handle from "../../../models/errors_handle";
const cloudinary = require("cloudinary").v2;
// const  Cloudinary  = require("next-cloudinary");

cloudinary.config({
  cloud_name: process.env.APP_CLOUD_NAME,
  api_key: process.env.APP_CLOUD_API_KEY,
  api_secret: process.env.APP_SECRET_KEY,
});

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "DELETE":
      try {
        const { ad_id } = req.query;
        // console.log(ad_id)
        if (!ad_id) {
          let back = err(400, "id not provided", false);
          if (back) {
            return;
          }
        }
        let doc = await cardataschema.findOne({ _id: ad_id });
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
              var public_ids = images_to_del.map(
                (img) =>
                  `my-project-images/${img.split("/").pop().split(".")[0]}`
              );
              await cloudinary.api.delete_resources(
                public_ids,
                { invalidate: true },
                async function (error, result) {
                  if (result) {
                    console.log(result);
                  } else if (error) {
                    try {
                      await errors_handle.updateOne(
                        {},
                        { $push: { cloudinary_deleting_erors: public_ids } }
                      );
                    } catch (error) {
                      console.log(error);
                    }
                  }
                }
              );
            } catch (error) {
              try {
                await errors_handle.updateOne(
                  {},
                  { $push: { cloudinary_deleting_erors: public_ids } }
                );
              } catch (error) {
                console.log(error);
              }
            }
          }
          try {
           let deleted_ad = await cardataschema.findByIdAndDelete(doc._id)        
                if (!deleted_ad) {
                  let back =  err(417, err +"can't delete ad", false);
                  if (back) {
                    return;
                  }
                }
                if (deleted_ad) {
                  let back =  err(200, "deleted ad", true);
                  if (back) {
                    return;
                  }
                }
            
          } catch (error) {
            let back = err(417, error + "can't delete ad", false);
            if (back) {
              return;
            }
          }
        }
        function err(status, message, success) {
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
