import usedbike_schema from "@/models/usedbike_schema";
import user from "@/models/user";
import errors_handle from "@/models/errors_handle";
import dbConnect from "@/config/dbConnect";
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
        const check_user_exist = await user.countDocuments({
          _id: seller_id,
        });
        if (!check_user_exist) {
          throw new Error("user not found");
        }

        if (check_user_exist) {
          const carsaved = await usedbike_schema.create(req.body.carobj);
          if (!carsaved) {
            throw new Error("car not saved");
          }
          if (carsaved) {
            if (imgs_to_upload.length > 0) {
              const imgs = [];
              for (const obj of imgs_to_upload) {
                try {
                  const file = obj.url;
                  const imgname = obj.name;
                  const response = await imageKit.upload({
                    file,
                    fileName: imgname,
                  });
                  if (response) {
                    // console.log(response)
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
              } else if (imgs.length == 0) {
                let del_ad = await usedbike_schema.findByIdAndDelete({
                  _id: carsaved._id,
                });
                if (del_ad) {
                  throw new Error("Error in uploading images");
                }
              }
              carsaved.slug = `${carsaved.brand.replaceAll(
                " ",
                "-"
              )}-${carsaved.model.replaceAll(" ", "-")}-${
                carsaved.modelyear
              }-for-sale-in-${carsaved.city.replaceAll(" ", "-")}-${
                carsaved._id
              }`.toLowerCase();

              let imgs_stored_indb = await carsaved.save();
              if (!imgs_stored_indb) {
                throw new Error("Error in uploading images");
              }
              if (imgs_stored_indb) {
                let back = err(201, "succesfully saved", false);
                if (back) {
                  return;
                }
              }
              // } else {
              //   let deleted_ad = await cardataschema.findByIdAndDelete(carsaved._id)

              //     let back = err(417, "imges not saved in imgkit", false);
              //     if (back) {
              //       return;
              //     }

              // }
            } else {
              throw new Error("Please provide images of your ad");
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
            message: err.message,
          });
        }
      }
      break;
    default:
      return;
  }
}
