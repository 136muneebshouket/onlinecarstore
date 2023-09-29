import UserModel from "../../../../models/user";
import dbConnect from "../../../../config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "POST":
      //   var { password, email, full_name, username } = req.body;

      try {
        console.log(req.body);
        const { email, name, image } = req.body;

        // if (carid && Cloudimages.length > 0) {
        let user = await UserModel.findOne({
          email: email,
          auth_type: "google_auth",
        });
        if (!user) {
          let obj = {
            name:name,
            password:image,
            email:email,
          };
          try {
            let usercreated = await UserModel.create(obj);
            if (usercreated) {
              res.status(201).json({
                success: true,
                message: "google auth",
              });
            }
          } catch (error) {
            res.status(417).json({
              success: false,
              message: "user not created",
            });
          }
        }
        if(user){
          res.status(201).json({
            success: true,
            message: "google auth",
          });
          return
        }
        
      } catch (err) {
        res.status(400).json({
          success: false,
          message: err,
        });
      }
      break;
    default:
      return;
  }
}
