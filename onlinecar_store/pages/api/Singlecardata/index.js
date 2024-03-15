import cardataschema from "../../../models/cardataschema";
import dbConnect from "../../../config/dbConnect";
import userschema from "../../../models/user";
import inspec_schema from "@/models/inspec_schema";
import mongoose, { model } from "mongoose";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "GET":
      //   var { password, email, full_name, username } = req.body;

      try {
        // console.log(req.query)
        const id =req.query.id
        const { managed_ad } = req.query;
        // console.log(managed_ad)
        // // Perform the query with the specified projection
        const result = await cardataschema.findOne({_id:id }).populate("overall_incpection_rating", "overall_rating percentages createdAt");
        if(!result){
          res.status(404).json({
            success: false,
            message: "no car exist",
          });
          return ;
        }
       
        if (result) {
          if(managed_ad != 'true'){
            const user_email = await userschema.findOne({_id: result.seller_id },{email:1});
            result.seller_id = new mongoose.Types.ObjectId('seller123')
            if(user_email){ 
              result.seller_email = user_email.email;
            }
          }
        
            // console.log(obj)
            res.status(200).json({
            success: true,
            data: result,
            message: "done",
          });
        }
      } catch (err) {
        res.status(400).json({
          success: false,
          message: err,
        });
      }
      break;
    default:
      return;
  }
}
