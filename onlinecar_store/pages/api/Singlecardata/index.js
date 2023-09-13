import cardataschema from "../../../models/cardataschema";
import dbConnect from "../../../config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "GET":
      //   var { password, email, full_name, username } = req.body;

      try {
        console.log(req.query)
        const id =req.query.id
        console.log(id)
        // // Perform the query with the specified projection
        const result = await cardataschema.findOne({_id:id });

       
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
