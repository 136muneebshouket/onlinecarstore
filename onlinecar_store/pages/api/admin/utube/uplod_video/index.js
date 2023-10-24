import admin_schema from "@/models/admin_schema";
import utube_schema from "@/models/utube_schema";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "POST":
      var { video, admin_token } = req.body;

      try {
        if (!admin_token) {
          let back = err(404, "admin not found", true);
          if (back) {
            return;
          }
        }
        if (admin_token) {
          const checkadmin = await admin_schema.findOne({
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
              if (!addvideo) {
                let back = err(502, "error adding video to database", false);
                if (back) {
                  return;
                }
              }
              if (addvideo) {
                let back = err(201, "added video to database", false);
                if (back) {
                  return;
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
