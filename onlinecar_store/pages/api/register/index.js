import UserModel from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "POST":
    //   var { password, email, full_name, username } = req.body;

      try {
        
        const user = await UserModel.create(req.body);
        res.status(201).json({
          success: true,
          message: user,
        });
        res.status(201).json(savedUser);
        // console.log(req.body)
      } catch (error) {
        if (error.code === 11000) {
          if (error.keyPattern.email) {
            return res.status(409).json({
              success: false,
              message: "Email Already Exist!",
            });
          } else if (error.keyPattern.username) {
            return res.status(409).json({
              success: false,
              message: "Username Already Exist!",
            });
          }
        } else {
          if (error.message?.split(":")[2]?.split("!")[0]?.trim()) {
            return res.status(400).json({
              success: false,
              message: error.message?.split(":")[2]?.split("!")[0]?.trim() + "!",
            });
          }
        }
      }
      break;
    default:
      return;
  }
}
