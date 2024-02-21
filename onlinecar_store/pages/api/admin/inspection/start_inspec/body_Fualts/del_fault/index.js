// import user from "@/models/user";
import inspec_schema from "@/models/inspec_schema";
import dbConnect from "@/config/dbConnect";
const ImageKit = require("imagekit");

const imageKit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATEKEY,
  urlEndpoint: process.env.URLENDPOINT,
});

export default async function handler(req, res) {
  dbConnect();
  try {
    switch (req.method) {
      case "DELETE":
        // console.log(req.query)
        let Ad_id = req.query.Ad_id;
        let del_index = req.query.delindex;
        let img = req.query.img;

        let find = await inspec_schema.findOne({ ad_id: Ad_id });
        let imgs = find.all_imgs.filter((v, i) => v?.flag_index != del_index);
        find.all_imgs = imgs;
        let new_extrior_cond = find.Extrior_conditions.filter(
          (v, i) => i != del_index
        );
        find.Extrior_conditions = new_extrior_cond;

        if (img) {
          try {
            let deleted = await imageKit.bulkDeleteFiles([img]);
          } catch (error) {
            throw new Error("error in imgkit deleting");
          }
        }
        // console.log(find);
        let deleted = await find.save();
        if (!deleted) {
          throw new Error("Something wrong in deleting fault");
        }

        res.status(200).json({
          success: true,
          message: "deleted",
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
