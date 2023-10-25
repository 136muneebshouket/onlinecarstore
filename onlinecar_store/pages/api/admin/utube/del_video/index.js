// import admin_schema from "@/models/admin_schema";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "POST":
      // var { video, admin_token} = req.body;

      try {
        console.log('run')
        // console.log(video,admin_token)
      
        // let back = err(200, "admin found", true);
        //   if (back) {
        //     return;
        //   }
        res.status(200).json({
          success: true,
          message:"errorMessage"
        });

        //   function err(status, message, success) {
        //     // getback = true
        //     res.status(status).json({
        //       success: success,
        //       message: message,
        //     });
        //     return true;
        //   }
      } catch (err) {
         console.log(err)
          if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0]; // Get the field causing the uniqueness error
            const errorMessage = `The ${field} already exists.`;
            res.status(400).json({
              success: false,
              message:errorMessage
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
              message:errorMessages
            });
            // Send other validation error messages to the user
          } else {
            // Handle other types of errors
            res.status(500).json({
              success: false,
              message:"something went wrong"
            });
          }
       
       
        
      }
      break;
    default:
      return;
  }
}
