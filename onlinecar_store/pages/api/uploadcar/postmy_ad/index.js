import cardataschema from "../../../../models/cardataschema";
import dbConnect from "../../../../config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "POST":
    //   var { password, email, full_name, username } = req.body;

      try {
        
        const user = await cardataschema.create(req.body);
        if(user)
        res.status(201).json({
          success: true,
          message: "Post has been created",
          car_id:user._id
        });
       
        // console.log(req.body)
      } catch (err) {
       
          if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0]; // Get the field causing the uniqueness error
            const errorMessage = `The ${field} already exists.`;
            res.status(400).json({
              success: false,
              message:errorMessage
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
              message:errorMessages
            });
            // Send other validation error messages to the user
          } else {
            // Handle other types of errors
            res.status(500).json({
              success: false,
              message:"something went wrong"
            });
          }

      }
      break;
    default:
      return;
  }
}
