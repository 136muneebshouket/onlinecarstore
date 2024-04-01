import admin_schema from "@/models/admin_schema";
import team from "@/models/team";
// import user from "@/models/user";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "GET":
      try {
        let { admin_token } = req.query;
        // const checkadmin = await admin_schema.countDocuments({
        //   resetToken: admin_token,
        // });
        // if (!checkadmin) {
        //   throw new Error("Super admin token is required");
        // }

        let finduser = await team
          .find(
            {},
            {
              member: 1,
              role: 1,
            }
          )
          .populate("member", "name email avatar");
          

        // console.log(finduser)
        res.status(200).json({
          success: true,
          payload: finduser,
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
