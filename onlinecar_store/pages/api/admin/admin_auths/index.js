import admin_schema from "@/models/admin_schema";
import team from "@/models/team";
import user from "@/models/user";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "GET":
      try {
        let { user_id, admin_token } = req.query;

        if (!user_id) {
          throw new Error("userid is required please Login");
        }

        const checkadmin = await admin_schema.countDocuments({
          resetToken: admin_token,
        });

        let finduser = await team
          .findOne(
            { member: user_id },
            {
              role: 1,
              token: 1,
            }
          )
          .populate("token", { resetToken: 1, _id: 0 });
        //   console.log(finduser);
        if(!finduser){
            throw new Error('Access denied')
        }

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
