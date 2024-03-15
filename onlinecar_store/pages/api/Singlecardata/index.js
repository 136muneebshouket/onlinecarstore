import cardataschema from "@/models/cardataschema";
import dbConnect from "@/config/dbConnect";
import user from "@/models/user";
import inspec_schema from "@/models/inspec_schema";
import mongoose, { model } from "mongoose";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "GET":
      //   var { password, email, full_name, username } = req.body;

      try {
        // console.log(req.query)
        const id = req.query.id

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
          try {
            // if(!managed_ad){
            
              // console.log(result.seller_id)
              const user_email = await user.findOne({_id: result.seller_id },{email:1});

              result.seller_id = new mongoose.Types.ObjectId('553sel247701')
              // seller1234567a8b9c0d1e2f
              // 1a2b3c4d5e6f7a8b9c0d1e2f
              // 553fed247701
              // 65181982450851f123952847
              if(user_email){ 
                result.seller_email = user_email.email;
              }
            // }
          } catch (error) {
           console.log(error.message)
          }
       
        
            // console.log(obj)
            res.status(200).json({
            success: true,
            data: result,
            message: "done",
          });
        }
      } catch (err) {
        // console.log(err.message)
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
