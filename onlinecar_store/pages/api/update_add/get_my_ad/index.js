import cardataschema from "../../../../models/cardataschema";
import dbConnect from "../../../../config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "GET":
      //   var { password, email, full_name, username } = req.body;

      try {
        // console.log(req.query)
        const {ad_id,user_id} =req.query

        const rejectedfields = {
         seller_id:0,
         createdAt:0,
         updatedAt:0,
         __v:0
        };
        // console.log(ad_id)
        // console.log(user_id)
        // console.log(id)
        // // Perform the query with the specified projection
        const result = await cardataschema.findOne({_id:ad_id,seller_id:user_id },rejectedfields);
        
        if(!result){
          res.status(404).json({
            success: false,
            message: "no car exist",
          });
          return ;
        }
       
        if (result) {
            // console.log(result)
            res.status(200).json({
            success: true,
            data: result,
            message: "done",
          });
        }
      } catch (err) {
        res.status(500).json({
          success: false,
          message: err,
        });
      }
      break;
    default:
      return;
  }
}
