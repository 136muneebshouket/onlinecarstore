import admin_schema from "@/models/admin_schema";
// import team from "@/models/team";
import user from "@/models/user";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "GET":
      try {
        let { email, admin_token } = req.query;
        const checkadmin = await admin_schema.countDocuments({
          resetToken: admin_token,
        });
        if (!checkadmin) {
          throw new Error("Super admin token is required");
        }
        if (!email) {
          throw new Error("email is required");
        }

        let finduser = await user.findOne(
          { email: email },
          {
            name: 1,
            avatar: 1,
            email: 1,
          }
        );
        if (!finduser) {
          throw new Error("user not found");
        }

        // console.log(finduser)
        res.status(200).json({
          success: true,
          member: finduser,
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
