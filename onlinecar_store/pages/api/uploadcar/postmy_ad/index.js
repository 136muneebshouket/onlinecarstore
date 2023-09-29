import cardataschema from "../../../../models/cardataschema";
import UserModel from "../../../../models/user";
import errors_handle from "@/models/errors_handle";
import dbConnect from "../../../../config/dbConnect";
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
        const { seller_id } = req.body.carobj;
        // console.log(req.body.carobj);
        const imgs_to_upload = req.body.imgsto_load;
        // console.log(req.body.imgs_to_upload);
        const check_user_exist = await UserModel.findOne({ _id: seller_id });
        if (!check_user_exist) {
          let back = err(404, "user not found", false);
          if (back) {
            return;
          }
        }

        if (check_user_exist) {
          const carsaved = await cardataschema.create(req.body.carobj);
          if (!carsaved) {
            let back = err(417, "car not saved", false);
            if (back) {
              return;
            }
          }
          if (carsaved) {
            if (imgs_to_upload.length > 0) {
              const imgs = [];
              for (const obj of imgs_to_upload) {
                try {
                  const file = obj.url;
                  const imgname = obj.name;
                  // console.log(file)
                  // console.log(imgname)
                  const response = await imageKit.upload({
                    file,
                    fileName: imgname,
                  });
                  if (response) {
                    console.log(response)
                    if (response.fileId) {
                      imgs.push({
                        img_id: response.fileId,
                        img_url: response.url,
                      });
                    }
                    
                  }
                  if (!response) {
                    console.log("error in uploding imgs");
                  }
                } catch (error) {
                  console.log(error);
                }
              }
              if (imgs.length > 0) {
                carsaved.images_url = imgs;
                let imgs_stored_indb = await carsaved.save();
                if (!imgs_stored_indb) {
                  let back = err(417, "imgs not saved", false);
                  if (back) {
                    return;
                  }
                }
                if (imgs_stored_indb) {
                  let back = err(201, "succesfully saved", false);
                  if (back) {
                    return;
                  }
                }
              } else {
                let deleted_ad = await cardataschema.findByIdAndDelete(carsaved._id)
                
                  let back = err(417, "imges not saved in imgkit", false);
                  if (back) {
                    return;
                  }
                     
              }
            } else {
              let back = err(201, "succesfully saved", true);
              if (back) {
                return;
              }
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
        //  res.status(404).json({
        //     success: false,
        //     message: "User not found",
        //   });

        // console.log(req.body)
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
            message: "something went wrong",
          });
        }
      }
      break;
    default:
      return;
  }
}
