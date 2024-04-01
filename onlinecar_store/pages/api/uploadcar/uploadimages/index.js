import cardataschema from "@/models/cardataschema";
import usedbike_schema from "@/models/usedbike_schema";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "POST":
      //   var { password, email, full_name, username } = req.body;

      try {
        const { Ad_id, Cloudimages, ad_type } = req.body;
        // console.log(Cloudimages,Ad_id);
        if (Ad_id && Cloudimages.length > 0) {
          // let car;
          // if(ad_type == 'car'){
          let car = await cardataschema.findOne({ _id: Ad_id });
          // }
          // if(ad_type == 'bike'){
          //   car = await usedbike_schema.findOne({ _id: Ad_id });
          // }

          // const car = await cardataschema.updateOne( { _id: Ad_id }, { $pushAll: { images_url: Cloudimages } } )

          if (!car) {
            throw new Error("Ad not found something wrong in uploading images");
          }
          if((Cloudimages.length < 1)){
            throw new Error("something wrong in uploading images");
          }
          if((Cloudimages.length > 20)){
            throw new Error("images should be less than 20");
          }

          for (const image of Cloudimages) {
            car.images_url.push(image);
          }
          //   console.log(car);
          let done = await car.save();
          if (!done) {
            throw new Error("something wrong in uploading images");
          }
          res.status(201).json({
            success: true,
            message: "car Ad has been stored",
          });
          // }
        } else {
          throw new Error("something wrong in uploading images");
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
