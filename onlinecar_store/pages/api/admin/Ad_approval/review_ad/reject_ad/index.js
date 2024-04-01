import dbConnect from "@/config/dbConnect";
import cardataschema from "@/models/cardataschema";
import admin_schema from "@/models/admin_schema";
import report_ad_schema from "@/models/report_ad_schema";
const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  dbConnect();
  if (req.method === "POST") {
    try {
      let { value, SellerEmail, Ad_id, admin_token } = req.body;
      if (value.length == 0 || !SellerEmail || !Ad_id || !admin_token) {
        throw new Error("Credientials are missing");
      }

      const checkAdmin = await admin_schema.countDocuments({
        resetToken: admin_token,
      });
      if (!checkAdmin) {
        throw new Error("Admin credentials Wrong please Login Again as Admin");
      }

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIl_PASS,
        },
      });

      let reasons = value.map((v) => {
        return `<li style="margin: 10px 0; font-size: 18px;">${v}</li>`;
      });
      let rejections = reasons.join("");
      // console.log(rejections);
      const mailOptions = {
        // from: process.env.EMAIL_FROM,
        from: process.env.EMAIL_USER,
        to: SellerEmail,
        subject: "Ad Rejection Reason",
        html: `<h1 style="font-family: sans-serif;">Your Ad Rejection Reasons</h1>
        <ol>
          ${rejections}
        </ol>
        <div style="display: flex; justify-content: center;">
        <a href='${process.env.Host}' style="margin-top:40px; ">
        <button style="background-color: green; color:white; border: none;  padding: 10px 20px; font-size: 16px; border-radius: 5px;  cursor: pointer;">Add Task</button>
        </a>
        </div>`,
      };
      const sended = await transporter.sendMail(mailOptions);
      if (!sended) {
        throw new Error("Failed to send Email!");
      }
      let update_ad = await cardataschema.findByIdAndUpdate(
        { _id: Ad_id },
        { $set: { active: false, reject_reasons: value } }
      );

      let approve_ad = await report_ad_schema.findOneAndDelete({
        ad_id: Ad_id,
      });

      if (!update_ad) {
        throw new Error("Failed to send Email!");
      }
      // const result = await cardataschema.find(find, selectedfields)

      res.status(200).json({
        success: true,
        msg: "done",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        msg: error,
      });
    }
  }
}
