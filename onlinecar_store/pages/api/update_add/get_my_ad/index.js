import cardataschema from "../../../../models/cardataschema";
import usedbike_schema from "@/models/usedbike_schema";
import dbConnect from "../../../../config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "GET":
      //   var { password, email, full_name, username } = req.body;

      try {
        // console.log(req.query)
        const { ad_id, user_id, ad_type } = req.query;

        const rejectedfields = {
          seller_email: 0,
          featured: 0,
          overall_incpection_rating: 0,
          inspected: 0,
          auction_sheet: 0,
          certified: 0,
          seller_id: 0,
          createdAt: 0,
          updatedAt: 0,
          managed_by: 0,
          reject_reasons: 0,
          pending: 0,
          active: 0,
          __v: 0,
        };
        
        // console.log(ad_id)
        // console.log(user_id)
        // console.log(id)
        // // Perform the query with the specified projection
        let result;
        if (ad_type == "car") {
          result = await cardataschema.findOne(
            { _id: ad_id, seller_id: user_id },
            rejectedfields
          );
        }
        if (ad_type == "bike") {
          result = await usedbike_schema.findOne(
            { _id: ad_id, seller_id: user_id },
            rejectedfields
          );
        }

        if (!result) {
          res.status(404).json({
            success: false,
            message: `no ${ad_type} exist`,
          });
          return;
        }

        if (result) {
          // console.log(result)
          res.status(200).json({
            success: true,
            data: result,
            message: "done",
          });
        }
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
