import cardataschema from "../../../models/cardataschema";
import dbConnect from "../../../config/dbConnect";
import userschema from "../../../models/user";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "GET":
      try {
        // console.log(req.query.userid)
        let user_email = req.query.user_email;
        if (!user_email) {
          res.status(404).json({
            success: false,
            message: "email not provided",
          });
          return;
        }

        if (user_email) {
          let user_id = await userschema.findOne(
            { email: user_email },
            { _id: 1 }
          );
          if (!user_id._id) {
            res.status(400).json({
              success: false,
              message: "user not found",
            });
            return;
          }
          if (user_id._id) {
            const selectedfields = {
              brand: 1,
              model: 1,
              variant_name: 1,
              modelyear: 1,
              city: 1,
              Mileage: 1,
              enginetype: 1,
              enginecc: 1,
              transmission: 1,
              price: 1,
              images_url: { $slice: 1 }, // Limit the images array to the first element only
              _id: 1, // Exclude the "_id" field from the results
            };
            const car = await cardataschema.find(
              { seller_id: user_id._id },
              selectedfields
            );

            if (!car) {
              // console.log("Car not found");
              res.status(400).json({
                success: false,
                message: "Car not found",
              });
              return;
            }
            if (car) {
              res.status(201).json({
                success: true,
                message: car,
              });
            }
          }
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
