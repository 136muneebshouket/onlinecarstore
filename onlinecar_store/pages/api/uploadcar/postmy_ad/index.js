import cardataschema from "../../../../models/cardataschema";
import UserModel from "../../../../models/user";
import errors_handle from "@/models/errors_handle";
import dbConnect from "../../../../config/dbConnect";
import { p_func } from "@/components/processing_functions/progress";
// import formidable from "formidable";

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

let totalwork = 0;
export default async function handler(req, res) {
  dbConnect();
  if (req.method === "POST") {
      try {

        let main_carobj = req.body.carobj;
        const { seller_id } = main_carobj;
        // console.log(req.body);
        const imgs_to_upload = req.body.imgsto_load;
        // console.log(req.body.imgs_to_upload);
        let progress = parseInt((100 / (imgs_to_upload.length + 1)).toFixed(0)) 
        // console.log(progress)
        const check_user_exist = await UserModel.countDocuments({
          _id: seller_id,
        });
        if (!check_user_exist) {
          throw new Error("user not found");
        }

        if (check_user_exist) {
          const carsaved = await cardataschema.create(main_carobj);
          if (!carsaved) {
            throw new Error("car not saved");
          }
          if (carsaved) {
            totalwork += progress;
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
                    if (response.fileId) {
                      imgs.push({
                        img_id: response.fileId,
                        img_url: response.url,
                      });
                      totalwork += progress;
                    }
                  }
                  if (!response) {
                    console.log("error in uploding imgs");
                    continue;
                  }
                } catch (error) {
                  console.log(error);
                  continue;
                }
              }
              if (imgs.length > 0) {
                carsaved.images_url = imgs;
              } else if (imgs.length == 0) {
                let del_ad = await cardataschema.findByIdAndDelete({
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
                totalwork = 0; 
                let back = err(201, "succesfully saved", false);
                if (back) {
                  return;
                }
              }
        
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

        //   let arr =[1,2,3,3,4,5,6,7,89,1,2,3]
        // let progress = parseInt((100 / (arr.length + 2)).toFixed(0)) 
        // const interval = setInterval(()=>{
        //   if(totalwork > 99){
        //     clearInterval(interval);
        //     res.status(201).json({
        //     success: true,
        //     message: 'checked',
        //   });
        //   totalwork = 0;
        //   }else{
        //     totalwork += progress;
        //   }
        // },1000)


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
  } 
    else if (req.method === "GET") {
    try {
        res.json(totalwork)
    } catch (error) {
        res.json(err)
    }
  }
}
