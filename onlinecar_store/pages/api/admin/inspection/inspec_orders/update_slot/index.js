// import user from "@/models/user";
// import slots_schema from "@/models/slots_schema";
import admin_schema from "@/models/admin_schema";
import cardataschema from "@/models/cardataschema";
import dbConnect from "@/config/dbConnect";
// import user from "@/models/user";
import inspec_request from "@/models/inspec_request";

export default async function handler(req, res) {
  dbConnect();

  switch (req.method) {
    case "POST":
      try {
        const { change_slot_obj ,admin_token  } = req.body;
         
       let {req_id,Address,slot,slottime} = change_slot_obj;
         for(var key in change_slot_obj){
            if(!key){
                throw new Error(`${key} are missing`)
            }
         }
        const checkAdmin = await admin_schema.countDocuments({
            resetToken: admin_token,
          });

        if(!checkAdmin){
            throw new Error('Admin credentials are missing please login again as admin')
        }
        delete change_slot_obj.req_id;
        // console.log(change_slot_obj)
        let editorder = await inspec_request.findByIdAndUpdate({_id:req_id},change_slot_obj)
        if(!editorder){
            throw new Error('Error in updating request')
        }
        res.status(200).json({
          success: true,
          message: "Request updated",
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
