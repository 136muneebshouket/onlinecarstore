// import user from "@/models/user";
import slots_schema from "@/models/slots_schema";
import admin_schema from "@/models/admin_schema";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  try {
    switch (req.method) {
      case "GET":
        // console.log('hitted')
       let find = await slots_schema.find({})

        res.status(200).json({
            success: true,
            message: "Your slot has been received",
            payload:find
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
