// import { NextApiHandler } from "next";
// import formidable from "formidable";
import team from "@/models/team";
// const ImageKit = require("imagekit");

// const imageKit = new ImageKit({
//   publicKey: process.env.PUBLIC_KEY,
//   privateKey: process.env.PRIVATEKEY,
//   urlEndpoint: process.env.URLENDPOINT,
// });
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
    console.log(req.body);
    // const form = formidable();

    // form.parse(req, async (err, fields, files) => {
    //   if (err) {
    //     return res.status(500).json({ success: false, message: 'Error parsing form data' });
    //   }

    try {

        let find = await team.find({  role: 'Inspection' },{ member:1,_id:0 }).populate('member' ,{email:1 , _id:0});
        

        console.log()

        
        
      //       console.log(req.body)
      //       // console.log(files + 'filename')
      //   //   const uploadedImages = await Promise.all(
      //   //     Object.values(files).map(async (file) => {
      //   //       const imageFile = await imageKit.upload({
      //   //         file: file.path,  // Path to the temporary file
      //   //         fileName: file.name,
      //   //       });

      //   //       return {
      //   //         img_id: imageFile.fileId,
      //   //         img_url: imageFile.url,
      //   //       };
      //   //     // console.log(file.name + 'filename')
      //   //     })
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
