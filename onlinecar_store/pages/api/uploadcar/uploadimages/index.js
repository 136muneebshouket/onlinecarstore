import cardataschema from "../../../../models/cardataschema";
import dbConnect from "../../../../config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "POST":
      //   var { password, email, full_name, username } = req.body;

      try {
        const { carid, Cloudimages } = req.body;
        console.log(Cloudimages,carid);
        if (carid && Cloudimages.length > 0) {
          const car = await cardataschema.findOne({ _id: carid });
          // const car = await cardataschema.updateOne( { _id: carid }, { $pushAll: { images_url: Cloudimages } } )

          if (!car) {
            // If the car document with the given carid doesn't exist, you can choose to create it
            // or handle the situation according to your requirements.
            console.log("Car not found");
            res.status(400).json({
              success: false,
              message: "imges not updated in db",
            });
            return;
          }

          for (const image of Cloudimages) {
            car.images_url.push(image);
          }
          console.log(car);
          let done = await car.save();
          if (done) {
            res.status(201).json({
              success: true,
              message: "car images has been stored",
            });
          } else {
            res.status(400).json({
              success: false,
              message: "err in uploding imgs in db",
            });
          }
          // }
        } else {
          res.status(400).json({
            success: false,
            message: "no imgs to upload",
          });
        }
      } catch (err) {
        res.status(500).json({
          success: false,
          message: err.message,
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
