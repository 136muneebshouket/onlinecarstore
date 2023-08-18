import cardataschema from "../../../../models/cardataschema";
import dbConnect from "../../../../config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "POST":
    //   var { password, email, full_name, username } = req.body;

      try {
        const { carid , Cloudimages } = req.body;

        if(carid && Cloudimages.length > 0){
            const car = await cardataschema.findOne({ _id : carid });

            if (!car) {
              // If the car document with the given carid doesn't exist, you can choose to create it
              // or handle the situation according to your requirements.
              console.log('Car not found');
              res.status(400).json({
                success: false,
                message:'Car not found'
              });
              return;
            }
        
            // Set the Cloudimages to the images_url field of the car document
            car.images_url = Cloudimages;
           let done= await car.save();
          if(done){
            res.status(201).json({
                success: false,
                message:'car images has been stored'
              });
          }
          

         
        }
        
      } catch (err) {
       
        res.status(400).json({
                  success: false,
                  message:err
                });

        //   if (err.code === 11000) {
        //     const field = Object.keys(err.keyValue)[0]; // Get the field causing the uniqueness error
        //     const errorMessage = `The ${field} already exists.`;
        //     res.status(400).json({
        //       success: false,
        //       message:errorMessage
        //     });
        //     // Send the uniqueness error message to the user
        //   } else if (err.errors) {
        //     // Handle other validation errors
        //     const errorMessages = [];
        //     for (let key in err.errors) {
        //       errorMessages.push(err.errors[key].message);
        //     }
        //     res.status(400).json({
        //       success: false,
        //       message:errorMessages
        //     });
        //     // Send other validation error messages to the user
        //   } else {
        //     // Handle other types of errors
        //     res.status(500).json({
        //       success: false,
        //       message:"something went wrong"
        //     });
        //   }

      }
      break;
    default:
      return;
  }
}
