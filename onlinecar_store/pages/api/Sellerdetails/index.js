import usersdata from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "GET":
      //   var { password, email, full_name, username } = req.body;

      try {
       
        const id =req.query.sellerid
        
        // // Perform the query with the specified projection
        const selectedfields = {
            full_name:1,
            createdAt:1,
            avatar:1
          };

        const result = await usersdata.findOne({_id:id },selectedfields);

       
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
