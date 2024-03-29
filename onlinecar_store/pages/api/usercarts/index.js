import cardataschema from "../../../models/cardataschema";
import dbConnect from "../../../config/dbConnect";
import userschema from "../../../models/user";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "GET":
      try {
        // console.log(req.query.userid)
        let carts = req.query.carts;
        
        let usercarts =carts.split(',')
        // console.log(usercarts)
        if (!carts) {
          return;
        }

        // let id = undefined;
        // if (user_email) {
        //   let user_id = await userschema.findOne(
        //     { email: user_email },
        //     { _id: 1 }
        //   );
        //   if (user_id) {
        //     id = user_id._id;
        //   }
        // }

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
        // if (!id) {
        //   res.status(404).json({
        //     success: false,
        //     message: "user not found",
        //   });
        //   return;
        // }
        if (carts) {
          const car = await cardataschema.find({ _id: { $in: usercarts }},selectedfields);

          if (!car) {
          throw new Error('car not found')
          } 
          if(car) {
            res.status(201).json({
              success: true,
              message: 'found',
              payload:car
            });
          }
        }
      } catch (err) {
        res.status(400).json({
          success: false,
          message: err.message,
        });
      }
      break;
    default:
      return;
  }
}
