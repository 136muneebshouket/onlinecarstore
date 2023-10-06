import adminModel from "../../../../../models/admin_schema";
import dbConnect from "../../../../../config/dbConnect";
const crypto = require("crypto");
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "POST":
      //   var { password, email, full_name, username } = req.body;

      try {
        const { email, password } = req.body;
        const user = await adminModel.findOne({ email });

        if (!user) {
          let back = err(404, "admin not found", false);
          if (back) {
            return;
          }
        }
        // console.log(user.password,password)
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          let back = err(417, "Invalid password", false);
          if (back) {
            return;
          }
        }
        if (isPasswordMatched) {
          const admin_Token = crypto.randomBytes(20).toString("hex");
        //   console.log(admin_Token)
          if (admin_Token) {
            user.resetToken = admin_Token;
          }
          let done = await user.save();
          if (!done) {
            let back = err(
              503,
              "something went wrong please retry again later ",
              false
            );
            if (back) {
              return;
            }
          }
          if (done) {
            let back = err(200, "succesfully logged in", true, done.resetToken);
            if (back) {
              return;
            }
          }
        }
        function err(status, message, success, payload) {
          // getback = true
          res.status(status).json({
            success: success,
            message: message,
            data: payload || "",
          });
          return true;
        }
      } catch (err) {
        console.log(err);
          // Handle other types of errors
          res.status(500).json({
            success: false,
            message: "something went wrong",
          });
        
      }
      break;
    default:
      return;
  }
}
