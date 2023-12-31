import usersdata from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "GET":
      //   var { password, email, full_name, username } = req.body;

      try {
       
        const seller_email =req.query.sellerid
        
        // // Perform the query with the specified projection
        const selectedfields = {
            name:1,
            createdAt:1,
            avatar:1,
            _id:0
          };

        const result = await usersdata.findOne({email:seller_email },selectedfields);

       
        if (result) {
            // console.log(result)
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
