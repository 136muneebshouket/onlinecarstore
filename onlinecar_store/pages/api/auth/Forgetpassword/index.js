import UserModel from "../../../../models/user";
import dbConnect from "../../../../config/dbConnect";
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const moment = require("moment");

export default async function handler(req, res) {
  dbConnect();
  if (req.method === "POST") {
    try {
      const email = req.body.email;
      const domaiin = req.body.domain;
      const protoocol = req.body.protocol;
      console.log(domaiin)
      console.log(protoocol)

      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Generate a unique reset token and save it to the database
      const resetToken = crypto.randomBytes(20).toString("hex");
      const resetTokenExpiration = moment().add(1, "hour").toDate();
      user.resetToken = resetToken;
      user.resetTokenExpiration = resetTokenExpiration;
      await user.save();

      // Create a test account on Ethereal
      // const testAccount = await nodemailer.createTestAccount();
      // Send the password reset email to the user
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIl_PASS,
        },
      });
      // const resetLink = `${req.protocol}://${req.get('host')}/api/forgetpassword/reset-password/${resetToken}`;
      const resetLink = `${protoocol}//${domaiin}/Authentication/Resetpasswordpage/?token=${resetToken}`;
      
      const mailOptions = {
        // from: process.env.EMAIL_FROM,
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset",
        html: `Please click <a href="${resetLink}">here</a> to reset your password.`,
      };
      const sended = await transporter.sendMail(mailOptions);
      if (sended) {
        res.status(200).json({ message: "Password reset email sent." });
      } else {
        res.status(400).json({ message: "email sending failed." });
      }
    } catch (error) {
      res.status(500).json({ message: "email sending failed..." });
    }
  }
}
