import cardataschema from "../../../../models/cardataschema";
import UserModel from "../../../../models/user";
import errors_handle from "@/models/errors_handle";
import dbConnect from "../../../../config/dbConnect";
import { p_func } from "@/components/processing_functions/progress";
// import formidable from "formidable";

const ImageKit = require("imagekit");

const imageKit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATEKEY,
  urlEndpoint: process.env.URLENDPOINT,
});

export const config = {
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};

let totalwork = 0;
export default async function handler(req, res) {
  dbConnect();
  if (req.method === "POST") {
    try {
      const { seller_id } = req.body.carobj;
      // console.log(req.body);
      const imgs_to_upload = req.body.imgsto_load;
      // console.log(req.body.imgs_to_upload);
      let progress = parseInt((100 / (imgs_to_upload.length + 1)).toFixed(0));
      // console.log(progress)

      let interval = setInterval(() => {
        totalwork += progress;
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
        let back = err(201, "succesfully saved", false, imgs_to_upload);
        totalwork = 0
        if (back) {
          return;
        }
      }, (progress * 1000));

      function err(status, message, success, payload) {
        res.status(status).json({
          success: success,
          message: message,
          payload: payload,
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
  } else if (req.method === "GET") {
    try {
      res.json(totalwork);
    } catch (error) {
      res.json(err);
    }
  }
}
