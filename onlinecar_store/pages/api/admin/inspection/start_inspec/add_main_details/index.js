// import user from "@/models/user";
// import slots_schema from "@/models/slots_schema";
import admin_schema from "@/models/admin_schema";
import inspec_schema from "@/models/inspec_schema";
// import cardataschema from "@/models/cardataschema";
import dbConnect from "@/config/dbConnect";
// import user from "@/models/user";
// import inspec_request from "@/models/inspec_request";
const ImageKit = require("imagekit");

const imageKit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATEKEY,
  urlEndpoint: process.env.URLENDPOINT,
});

export default async function handler(req, res) {
  dbConnect();

  switch (req.method) {
    case "POST":
      try {
        const { admin_token, main_details, main_img } = req.body;
        const checkAdmin = await admin_schema.countDocuments({
          resetToken: admin_token,
        });
        if (!checkAdmin) {
          throw new Error(
            "Admin credentials are missing please login again as admin"
          );
        }
        for (var key in main_details) {
          if (!key) {
            throw new Error(`${key} are missing`);
          }
        }
        if (!main_img?.filename) {
          throw new Error(`main image is missing`);
        }

        let create = await inspec_schema.create(main_details);
        if (!create) {
          throw new Error("something wrong in creating inspection");
        }
        
        let img_obj = {};
        const file = main_img?.url;
        const response = await imageKit.upload({
          file,
          fileName: main_img?.filename,
        });
        if (!response) {
          await inspec_schema.findByIdAndDelete({_id: create._id});
          throw new Error("something wrong in image uploading");
        }
        if (response.fileId) {
          img_obj.field = "img_flag"
          img_obj.img_id = response.fileId;
          img_obj.img_url = response.url;
        }
        let ad_img_in_db = await inspec_schema.findByIdAndUpdate({_id: create._id },{ $addToSet:{ all_imgs : img_obj  }})
        if (!ad_img_in_db) {
            await inspec_schema.findByIdAndDelete({_id: create._id});
            throw new Error("something wrong in adding image in db");
          }

        res.status(200).json({
          success: true,
          message: "uploaded",
        });
        
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
