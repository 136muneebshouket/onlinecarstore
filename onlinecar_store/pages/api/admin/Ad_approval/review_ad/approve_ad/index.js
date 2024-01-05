import dbConnect from "@/config/dbConnect";
import cardataschema from "@/models/cardataschema";
import admin_schema from "@/models/admin_schema";
const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  dbConnect();
  if (req.method === "POST") {
    try {
      let {  Ad_id, admin_token } = req.body;
      if ( !Ad_id || !admin_token) {
        throw new Error("Credientials are missing");
      }

      const checkAdmin = await admin_schema.countDocuments({
        resetToken: admin_token,
      });
      if (!checkAdmin) {
        throw new Error("Admin credentials Wrong please Login Again as Admin");
      }

  
       let update_ad = await cardataschema.findByIdAndUpdate({_id:Ad_id },{$set:{active:true,
        pending:1,reject_reasons:[]}})
       
       if(!update_ad){
        throw new Error("Failed to approve!");
       }
      // const result = await cardataschema.find(find, selectedfields)

        res.status(200).json({
          success: true,
          msg: "done",
        });
      
    } catch (error) {
      res.status(400).json({
        success: false,
        msg: error,
      });
    }
  }
}
