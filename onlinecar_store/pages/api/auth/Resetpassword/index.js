import UserModel from "../../../../models/user";
import dbConnect from "../../../../config/dbConnect";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  dbConnect();
  if (req.method === "POST") {
    try {
      const resetToken = req.body.resettokken;
      const password = req.body.newpassword;
      // console.log(password)
      const hashedPassword = await bcrypt.hash(password, 10);
      // console.log(password);

      const user = await UserModel.findOne({
        resetToken,
        resetTokenExpiration: { $gt: Date.now() },
      });
      if (!user) {
        return res
          .status(404)
          .json({ message: "Invalid or expired reset token." });
      }
      if (hashedPassword) {
        // console.log(hashedPassword);
        let passchanged = await UserModel.updateOne(
          {resetToken},
          { $set: { password: hashedPassword } }
        );
        if (passchanged) {
          user.resetToken = undefined;
          user.resetTokenExpiration = undefined;
          let done = await user.save();
          if (done) {
            return res
              .status(200)
              .json({ message: "Password updated successfully." });
          } else {
            return res.status(404).json({ message: "server not responding" });
          }
        }else{
          return res.status(200).json({ message: "Password not updated successfully." });
        }
      } else {
        return res
          .status(404)
          .json({ message: "Password not updated successfully." });
      }
    } catch (error) {
      res.status(404).json({ message: "server not responding" });
    }
  }
}
