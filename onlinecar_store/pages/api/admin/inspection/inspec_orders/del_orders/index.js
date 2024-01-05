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
    case "DELETE":
      try {
        const { req_id ,admin_token } = req.query;
        //    console.log(req.query)
    //    let {req_id,Address,slot,slottime} = change_slot_obj;
         for(var key in req.query.delobj){
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
  
        let delorder = await inspec_request.findByIdAndDelete({_id:req_id})
        if(!delorder){
            throw new Error('Error in deleting request')
        }
        res.status(200).json({
          success: true,
          message: "Request deleted",
        });

      } catch (err) {
       
          // Handle other types of errors
          res.status(500).json({
            success: false,
            message: err.message,
          });
        
      }
      break;
    default:
      return;
  }
}
