// import user from "@/models/user";
import inspec_schema from "@/models/inspec_schema";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  try {
    switch (req.method) {
      case "GET":
        let inspec_id = req.query.Id;
        let only_main_img = req.query.only_main_img;
        let ad_id = req.query.ad_id;

        let selectedfields = {};
        let find = { _id: inspec_id };

        if (only_main_img && ad_id) {
          delete find._id;
          find["ad_id"] = ad_id;
          selectedfields.all_imgs = 1;
          selectedfields._id = 0;
        }

        let exist = await inspec_schema.findOne(find, selectedfields);

        res.status(200).json({
          success: true,
          message: "Your slot has been received",
          payload: exist,
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
