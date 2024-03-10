// import user from "@/models/user";
// import slots_schema from "@/models/slots_schema";
import admin_schema from "@/models/admin_schema";
import blog_schema from "@/models/blog_schema";
import inspec_request from "@/models/inspec_request";

import dbConnect from "@/config/dbConnect";
// import user from "@/models/user";

const ImageKit = require("imagekit");

const imageKit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATEKEY,
  urlEndpoint: process.env.URLENDPOINT,
});

export default async function handler(req, res) {
  dbConnect();

  switch (req.method) {
    case "POST":
      try {
        // console.log(req.body)
        let { blogdata, imagestoshow, admin_token } = req.body;

        const checkAdmin = await admin_schema.countDocuments({
          resetToken: admin_token,
        });

        if (!checkAdmin) {
          throw new Error(
            "Admin credentials Wrong please Login Again as Admin"
          );
        }

        blogdata.slug = blogdata.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

        let create_blog = await blog_schema.create(blogdata);

        if(!create_blog){
          throw new Error('Error Creating Blog')
        }

        // console.log(blogdata, imagestoshow);

        let img_obj = {};

        try {
          const file = imagestoshow?.url;
          const imgname = imagestoshow?.filename;
          const response = await imageKit.upload({
            file,
            fileName: imgname,
          });
          if (response) {
            if (response.fileId) {
              img_obj.img_id = response.fileId;
              img_obj.img_url = response.url;
            }
          }
          if (!response) {
            throw new Error('error in uploding imgs')
            // console.log("error in uploding imgs");
          }
        } catch (error) {
          throw new Error(error.message)
          // console.log(error);
        }
          
        create_blog.photo = img_obj 
       let img_added =  await  create_blog.save();
       if(!img_added){throw new Error ('Image not added in db')}


        res.status(200).json({
          success: true,
          message: "Blog created Successfully",
        });
      } catch (err) {
        // Handle other types of errors
        res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      break;
    default:
      return;
  }
}
