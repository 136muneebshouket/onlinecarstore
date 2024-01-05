import user from "@/models/user";
import cardataschema from "@/models/cardataschema";
import report_ad_schema from "@/models/report_ad_schema";
import usedbike_schema from "@/models/usedbike_schema";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  try {
    switch (req.method) {
      case "POST":
        const { ad_id, seller, userid, reason , type } = req.body;
        // console.log(ad_id)
        if(type =='car'){
          const find_ad = await cardataschema.countDocuments({ _id: ad_id });
          const find_seller = await user.countDocuments({ email: seller });
          if (!find_ad || !find_seller) {
            throw new Error("This ad or seller does not exist");
          }
        }
        if(type =='bike'){
          const find_ad = await usedbike_schema.countDocuments({ _id: ad_id });
          const find_seller = await user.countDocuments({ email: seller });
          if (!find_ad || !find_seller) {
            throw new Error("This ad or seller does not exist");
          }
        }
        
        const find_reported_ad = await report_ad_schema.findOne({ ad_id: ad_id });

        if (find_reported_ad) {
          const report_exist = await report_ad_schema.findOne({
            "reports.reporter_id": userid,
          });

          if (report_exist) {
            throw new Error("You reported this ad already");
          }

          find_reported_ad.reports.push({
            reporter_id: userid,
            reason: reason,
          });

          await find_reported_ad.save();
        } else {
          await new report_ad_schema({
            ad_id: ad_id,
            seller_id: seller,
            reports: [
              {
                reporter_id: userid,
                reason: reason,
              },
            ],
          }).save();
        }

        res.status(200).json({
          success: true,
          message: "Your reported ad has been received",
        });

        break;

      default:
        return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
