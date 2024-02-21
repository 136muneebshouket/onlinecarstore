// import user from "@/models/user";
import inspec_schema from "@/models/inspec_schema";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  try {
    switch (req.method) {
      case "GET":
        let inspec_id = req.query.Id;

        let exist = await inspec_schema.findOne({ _id: inspec_id });

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
