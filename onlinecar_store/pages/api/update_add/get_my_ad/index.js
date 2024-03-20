import cardataschema from "@/models/cardataschema";
import usedbike_schema from "@/models/usedbike_schema";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "GET":
      //   var { password, email, full_name, username } = req.body;

      try {
        // console.log(req.query)
        const { ad_id, user_id, ad_type } = req.query;

        const selected_fields = {
          city: 1,
          area: 1,
          brand: 1,
          modelyear: 1,
          color: 1,
          Mileage: 1,
          price: 1,
          comments: 1,
          enginetype: 1,
          body_type: 1,
          model: 1,
          enginecc: 1,
          Registered_In: 1,
          transmission: 1,
          Assembly: 1,
          carfeatures: 1,
          Phone_no: 1,
          variant_name: 1,
          Secondary_no: 1,
          images_url: 1,
          slug: 1,
          // seller_email: 0,
         
        };

        // console.log(ad_id)
        // console.log(user_id)
        // console.log(id)
        // // Perform the query with the specified projection
        // let result;
      
        if (req.query.ad_type == "car") {
          let car = await cardataschema.findOne(
            { _id: ad_id, seller_id: user_id },
            selected_fields
          );
        
          if (!car) {
            throw new Error(`${ad_type} not exist`);
          }
          // console.log(car)
          res.status(200).json({
            success: true,
            data: car,
            message: "done",
          });
    
        }
        if (req.query.ad_type == "bike") {
          let bike = await usedbike_schema.findOne(
            { _id: ad_id, seller_id: user_id },
            selected_fields
          );
          if (!bike) {
            throw new Error(`${ad_type} not exist`);
          }
          res.status(200).json({
            success: true,
            data: bike,
            message: "done",
          });

        }
        
        // if (result) {
        //   // console.log(result)
        // }
      } catch (err) {
        res.status(500).json({
          success: false,
          message: err,
        });
      }
      break;
    default:
      return;
  }
}
