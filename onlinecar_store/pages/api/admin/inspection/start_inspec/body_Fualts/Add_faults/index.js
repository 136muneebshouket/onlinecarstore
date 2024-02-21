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

export const config = {
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};

export default async function handler(req, res) {
  dbConnect();

  switch (req.method) {
    case "POST":
      try {
        const { faults, imagestoshow, admin_token, Ad_id } = req.body;

        const { type, type_name, part_name } = faults;
        if (!Ad_id) {
          throw new Error("Ad id is missing its parent part.");
        }
        if (!type || !type_name || !faults.positions.left || !part_name) {
          throw new Error("faults credentials are missing.");
        }

        const checkAdmin = await admin_schema.countDocuments({
          resetToken: admin_token,
        });
        if (!checkAdmin) {
          throw new Error(
            "Admin credentials are missing please login again as admin"
          );
        }
        // console.log(req.body)

        let find_and_check = await inspec_schema.findOne(
          { ad_id: Ad_id },
          { Extrior_conditions: 1, _id: 0 }
        );
        find_and_check?.Extrior_conditions.map((v) => {
          if (v.part_name == part_name && v.type == type) {
            throw new Error("Already painted this part");
          } else if (v.part_name == part_name && v.type == "P") {
            faults.status_mark = 0;
          }
        });

        let save = await inspec_schema.findOneAndUpdate(
          { ad_id: Ad_id },
          { $addToSet: { Extrior_conditions: faults } }
        );

        if (!save) {
          throw new Error("Something went wrong in saving equipment");
        }
        let objindex = save?.Extrior_conditions?.length;

        let cloud_img = {};
        if (imagestoshow?.img_url) {
          try {
            const response = await imageKit.upload({
              file: imagestoshow?.img_url,
              fileName: imagestoshow?.filename,
            });
            if (!response) {
              throw new Error("Error in uploading images");
            }
            if (response) {
              if (response.fileId) {
                cloud_img = {
                  img_flag: `Extrior_conditions`,
                  flag_index: objindex,
                  img_id: response.fileId,
                  img_url: response.url,
                };
              }
            }
          } catch (error) {
            throw new Error("Something went wrong in saving img in cloud");
          }
        }

        if (cloud_img?.img_url) {
          await inspec_schema.findOneAndUpdate(
            { ad_id: Ad_id },
            { $addToSet: { all_imgs: cloud_img } }
          );
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
