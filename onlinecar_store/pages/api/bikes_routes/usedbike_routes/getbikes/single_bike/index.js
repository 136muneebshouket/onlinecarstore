import usedbike_schema from "@/models/usedbike_schema";
import dbConnect from "@/config/dbConnect";
import user from "@/models/user";
import mongoose, { model } from "mongoose";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "GET":
      //   var { password, email, full_name, username } = req.body;

      try {
        // console.log(req.query)
        const id =req.query.id
        // console.log(id)
        // // Perform the query with the specified projection
        const result = await usedbike_schema.findOne({_id:id });
        if(!result){
          res.status(404).json({
            success: false,
            message: "no car exist",
          });
          return ;
        }
       
        if (result) {
          const user_email = await user.findOne({_id: result.seller_id },{email:1});
          result.seller_id = new mongoose.Types.ObjectId('553fed247701')
          if(user_email){ 
            result.seller_email = user_email.email;
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
