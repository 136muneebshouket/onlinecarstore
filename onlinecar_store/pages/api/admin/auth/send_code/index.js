import admin_schema from "../../../../../models/admin_schema";
import dbConnect from "../../../../../config/dbConnect";
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const moment = require("moment");

export default async function handler(req, res) {
  dbConnect();
  if (req.method === "GET") {
    try {

      const user = await admin_schema.findOne();
      console.log(user)
      if (!user) {
        let back = err(404, "user not found", false);
        if (back) {
          return;
        }
      }
      // Generate a unique reset token and save it to the database
      const resetToken = crypto.randomBytes(20).toString("hex");
      const resetTokenExpiration = moment().add(2, "minute").toDate();
      user.resetToken = resetToken;
      user.resetTokenExpiration = resetTokenExpiration;
      let done = await user.save();
      if(!done){
        let back = err(417, "problem in creating token", false);
        if (back) {
          return;
        }
      }


      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIl_PASS,
        },
      });
      // const resetLink = `${req.protocol}://${req.get('host')}/api/forgetpassword/reset-password/${resetToken}`;
    //   const resetLink = `${protoocol}//${domaiin}/Authentication/Resetpasswordpage/?token=${resetToken}`;
      
      const mailOptions = {
        // from: process.env.EMAIL_FROM,
        from: process.env.EMAIL_USER,
        to: done.email,
        subject: "Admin Reset",
        html: `This is your Pin code <h3>${done.resetToken}</h3> to reset your password.`,
      };
      const sended = await transporter.sendMail(mailOptions);
      if (sended) {
        let back = err(200, "token has been send to you", true);
        if (back) {
          return;
        }
      } else {
        let back = err(417, "email send failed", false);
        if (back) {
          return;
        }
      }

      function err(status, message, success) {
        // getback = true
        res.status(status).json({
          success: success,
          message: message,
         
        });
        return true;
      }
    } catch (error) {
      res.status(500).json({ message: "email sending failed...", success: false, });
    }
  }
}


