import admin_schema from "@/models/admin_schema";
import team from "@/models/team";
import user from "@/models/user";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "POST":
      try {
        let { id, admin_token } = req.body;
        const checkadmin = await admin_schema.countDocuments({
          resetToken: admin_token,
        });
        if (!checkadmin) {
          throw new Error("Super admin token is required");
        }
        if (!id) {
          throw new Error("user is required");
        }

        let finduser = await team.findByIdAndDelete({ _id: id });
        if (!finduser) {
          throw new Error("cannot not found");
        }

        // console.log(finduser)
        res.status(200).json({
          success: true,
          message: 'deleted',
        });
      } catch (err) {
        // console.log(err);

        // Handle other types of errors
        res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      break;
    default:
      return;
  }
}
