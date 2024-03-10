import cardataschema from "../../../../models/cardataschema";
import UserModel from "../../../../models/user";
// import errors_handle from "@/models/errors_handle";
import dbConnect from "../../../../config/dbConnect";
import { p_func } from "@/components/processing_functions/progress";
import { send_mail } from "../../mail_to_admin/sendmail";
// import formidable from "formidable";

export default async function handler(req, res) {
  dbConnect();
  if (req.method === "POST") {
    try {
      let main_carobj = req.body.carobj;
      const { seller_id } = main_carobj;
      const check_user_exist = await UserModel.countDocuments({
        _id: seller_id,
      });
      if (!check_user_exist) {
        throw new Error("user not found");
      }

      if (check_user_exist) {
        const carsaved = await cardataschema.create(main_carobj);
        if (!carsaved) {
          throw new Error("car not saved");
        }

        carsaved.slug = `${carsaved.brand.replaceAll(
          " ",
          "-"
        )}-${carsaved.model.replaceAll(" ", "-")}-${
          carsaved.modelyear
        }-for-sale-in-${carsaved.city.replaceAll(" ", "-")}-${
          carsaved._id
        }`.toLowerCase();

        let imgs_stored_indb = await carsaved.save();
        if (!imgs_stored_indb) {
          throw new Error("Error in uploading images");
        }
        if (imgs_stored_indb) {
          let send_email_admin = await send_mail(carsaved.slug)
          let back = err(201, "succesfully saved", true , carsaved._id);
          if (back) {
            return;
          }
        }
      }

      function err(status, message, success ,Ad_id) {
        res.status(status).json({
          success: success,
          message: message,
          Ad_id: Ad_id,
        });
        return true;
      }

    } catch (err) {
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
          message: err.message,
        });
      }
    }
  } 
}
