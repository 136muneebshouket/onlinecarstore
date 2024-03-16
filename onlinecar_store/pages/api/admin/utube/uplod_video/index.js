import admin_schema from "@/models/admin_schema";
import utube_schema from "@/models/utube_schema";
import dbConnect from "@/config/dbConnect";

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
      var { video, img, admin_token } = req.body;

      try {
        if (!admin_token) {
          let back = err(404, "admin not found", true);
          if (back) {
            return;
          }
        }
        if (admin_token) {
          const checkadmin = await admin_schema.countDocuments({
            resetToken: admin_token,
          });
          if (!checkadmin) {
            let back = err(404, "invalid token", true);
            if (back) {
              return;
            }
          }
          if (checkadmin) {
            // let checkvideo = await utube_schema.findOne({
            //   catogery: video.catogery,
            //   priority: parseInt(video.priority),
            // });
            // // console.log(checkvideo)
            // if (checkvideo) {
            //   let back = err(
            //     417,
            //     `This catogery of video already has ${video.priority} priority... please change priority`,
            //     false
            //   );
            //   if (back) {
            //     return;
            //   }
            // }
            // if (!checkvideo) {
              let addvideo = await utube_schema.create(video);
              
              if(!addvideo){
                throw new Error('Error in uploading video');
              }
              
              let cloud_img = {};
              if ((img?.img_url) && (addvideo)) {
                try {
                  const response = await imageKit.upload({
                    file: img?.img_url,
                    fileName: img?.filename,
                  });
                  if (!response) {
                    throw new Error("Error in uploading images");
                  }
                  if (response) {
                    if (response.fileId) {
                      cloud_img = {
                        img_id: response.fileId,
                        img_url: response.url,
                      };
                    }
                  }
                } catch (error) {
                  throw new Error("Something wrong in saving img in cloud");
                }
              }
                
              if (cloud_img?.img_url) {
              let done =  await utube_schema.findByIdAndUpdate(
                  { _id: addvideo._id },
                  { image : cloud_img }
                );

                if(!done){
                  throw new Error("Something wrong in saving img in db");
                }
                if (done) {
                  let back = err(201, "added video to database", false);
                  if (back) {
                    return;
                  }
                }
              }
             
             
            // }
          }
        }
        // console.log('run')

        function err(status, message, success) {
          // getback = true
          res.status(status).json({
            success: success,
            message: message,
          });
          return true;
        }
      } catch (err) {
        console.log(err);
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
