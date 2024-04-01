import admin_schema from "@/models/admin_schema";
import team from "@/models/team";
import user from "@/models/user";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "POST":
      try {
        let { adduser, admin_token } = req.body;
        const checkadmin = await admin_schema.findOne({
          resetToken: admin_token,
        });
        if (!checkadmin) {
          throw new Error("Super admin token is required");
        }
        if (!adduser.user_id) {
          throw new Error("user id is required");
        }
        if (adduser.role.length < 1) {
          throw new Error("user role is required");
        }

        // console.log(checkadmin._id);
        // console.log(adduser);

        let obj = {
          member: adduser.user_id,
          role: adduser.role,
          token: checkadmin._id,
        };

        let add_member = await team.create(obj);
        if (!add_member) {
          throw new Error("member cannot created");
        }

        res.status(200).json({
          success: true,
          message: "member added",
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
