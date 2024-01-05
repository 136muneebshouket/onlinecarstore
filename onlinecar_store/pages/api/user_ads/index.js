import cardataschema from "../../../models/cardataschema";
import dbConnect from "../../../config/dbConnect";
import userschema from "../../../models/user";
import usedbike_schema from "@/models/usedbike_schema";

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
          let findobj = {};
          if (user_id._id) {
            findobj.seller_id = user_id._id;

            if (req.query.type == "active") {
              findobj.active = true;
              findobj.pending = 1;
            }
            if (req.query.type == "pending") {
              findobj.active = true;
              findobj.pending = 0;
            }
            if (req.query.type == "removed") {
              findobj.active = false;
              findobj.pending = 0;
            }

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
              pending: 1,
              reject_reasons: 1,
              images_url: { $slice: 1 }, // Limit the images array to the first element only
              _id: 1, // Exclude the "_id" field from the results
            };
            if (req.query.ad_type == "bikes") {
              const bike = await usedbike_schema.find(findobj, selectedfields);
              if (!bike) {
                throw new Error("Car not found");
              }
              if (bike) {
                res.status(201).json({
                  success: true,
                  message: bike,
                });
              }
              return;
            }
            const car = await cardataschema.find(findobj, selectedfields);

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
