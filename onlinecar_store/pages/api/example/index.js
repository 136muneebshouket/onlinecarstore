// import { NextApiHandler } from "next";
// import formidable from "formidable";
import cardataschema from "@/models/cardataschema";
import team from "@/models/team";
import dbConnect from "@/config/dbConnect";
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

export default async function handler(req, res) {
  if (req.method === "POST") {
    dbConnect();
    console.log(req.body);
    // const form = formidable();

    // form.parse(req, async (err, fields, files) => {
    //   if (err) {
    //     return res.status(500).json({ success: false, message: 'Error parsing form data' });
    //   }

    try {
     

      console.log(req.body);
      // console.log(files + 'filename')
     
      res.status(200).json({
        success: true,
        message: "example checked",
      });
      //   //   );

      //     // Do something with uploadedImages (e.g., save in database)

      //     return res.status(200).json({ success: true, message: 'Images uploaded successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    // Handle any other HTTP method
  }
}
