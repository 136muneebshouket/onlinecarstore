
import admin_schema from "../../../../../models/admin_schema";
import dbConnect from "../../../../../config/dbConnect";




export default async function handler(req, res) {
    dbConnect();
    if (req.method === "POST") {
      try {
        const {resetToken} = req.body;
    //    console.log(resetToken)

        const user = await admin_schema.findOne({
          resetToken,
          resetTokenExpiration: { $gt: Date.now() },
        });
        if (!user) {
            let back = err(417, 'False or expired Pin Code.. CLick "Forget password" to try again', false);
            if (back) {
              return;
            }
        }
        if(user){
            user.resetTokenExpiration = undefined;
            let admin_save = await user.save();
            if(!admin_save){
              let back = err(417, "error in checking token", true,user.resetToken);
              if (back) {
                return;
              }
            }
            if(admin_save){
              let back = err(200, "Now u can change admin's credentials", true,user.resetToken);
              if (back) {
                return;
              }
            }
           
        }
        

        function err(status, message, success,payload) {
            // getback = true
            res.status(status).json({
              success: success,
              message: message,
              data:payload || ''
            });
            return true;
          }
      } catch (error) {
        console.log(error)
        res.status(404).json({success:false, message: "something wrong in checking pin code" });
      }
    }
  }
  