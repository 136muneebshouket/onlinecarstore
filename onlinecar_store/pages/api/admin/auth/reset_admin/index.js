import adminModel from "../../../../../models/admin_schema";
import dbConnect from "../../../../../config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "POST":
      //   var { password, email, full_name, username } = req.body;

      try {
        // console.log(req.body)
        let { token, email, password, phone } = req.body;
        console.log(token)
        if (!token) {
          let back = err(400, "token not provided", false);
          if (back) {
            return;
          }
        }
        if (token) {
          let resetToken = JSON.parse(token)
          let find_admin = await adminModel.findOne({ resetToken });
          if (!find_admin) {
            let back = err(400, "token not valid", false);
            if (back) {
              return;
            }
          }
          if (find_admin) {
              find_admin.email = email;
              find_admin.password = password;
              find_admin.phone = phone;
              find_admin.resetToken = '';

              let create_admin = await find_admin.save();
            if (!create_admin) {
              let back = err(417, "cannot reset admin", false);
              if (back) {
                return;
              }
            }
            if(create_admin){
              let back = err(200, "Admin Credentials reseted successfully", true);
              if (back) {
                return;
              }
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

        if (err.code === 11000) {
          const field = Object.keys(err.keyValue)[0]; // Get the field causing the uniqueness error
          const errorMessage = `The ${field} already exists.`;
          res.status(400).json({
            success: false,
            message: errorMessage,
          });
          // Send the uniqueness error message to the user
        } else if (err.errors) {
          // Handle other validation errors
          const errorMessages = [];
          for (let key in err.errors) {
            errorMessages.push(err.errors[key].message);
          }
          res.status(400).json({
            success: false,
            message: errorMessages,
          });
          // Send other validation error messages to the user
        } else {
          // Handle other types of errors
          res.status(500).json({
            success: false,
            message: "something went wrong",
          });
        }
      }
      break;
    default:
      return;
  }
}
