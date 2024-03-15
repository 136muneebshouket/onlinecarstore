// import user from "@/models/user";
import slots_schema from "@/models/slots_schema";
import admin_schema from "@/models/admin_schema";
import cardataschema from "@/models/cardataschema";
import dbConnect from "@/config/dbConnect";
import user from "@/models/user";
import inspec_request from "@/models/inspec_request";
import { send_mail } from "@/pages/api/mail_to_admin/sendmail";

export default async function handler(req, res) {
  dbConnect();

  switch (req.method) {
    case "POST":
      try {
        const { user_id ,ad_id  } = req.body;
         

        let finduser = await user.countDocuments({_id: user_id});
        if(!finduser){
            throw new Error('user ID not provided please Login')
        }
        // let findsameorder = await inspec_request.countDocuments({user_id: user_id , ad_id : ad_id });
        // if(findsameorder){
        //     throw new Error('You already requested this order')
        // }
        let addorder = await inspec_request.create(req.body)
        let slug = `${req.body?.brand} ${req.body?.model} ${req.body?.variant_name} ${req.body?.city} ${req.body?.area}`
        
        let send_mail_admin = await send_mail( slug ,'Incpection') 
        
        res.status(200).json({
          success: true,
          message: "Your Request has been received",
        });

      } catch (err) {
        console.log(err)
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
