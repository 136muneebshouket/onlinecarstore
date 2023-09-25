import cardataschema from "../../../../models/cardataschema";
import dbConnect from "../../../../config/dbConnect";
const cloudinary = require("cloudinary").v2;
const ImageKit = require("imagekit");
// const  Cloudinary  = require("next-cloudinary");

// cloudinary.config({
//   cloud_name: process.env.APP_CLOUD_NAME,
//   api_key: process.env.APP_CLOUD_API_KEY,
//   api_secret: process.env.APP_SECRET_KEY,
// });
const imageKit = new ImageKit({
  publicKey: "public_WOcX0On81i5aCNQXgjCYQmA9OFY=",
  privateKey: "private_SRKhBOqRvoKrZ6CUDARN7Ed8tdM=",
  urlEndpoint: "https://ik.imagekit.io/lxtg60t67",
});

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "POST":
      try {
        let recieved_obj = req.body;
        // console.log(recieved_obj);
        var { _id, user_id, images_to_del, imgs_to_uplod } = req.body;
        // let carobj = {}
        // console.log(images_to_del)
        let doc = await cardataschema.findOne({ _id: _id, seller_id: user_id });

        if (!doc) {
          let back = err(404, "car not updated", false);
          if (back) {
            return;
          }
        }

        if (doc) {
          Object.entries(recieved_obj).map(([key, value]) => {
            if (
              key != "_id" &&
              key != "createdAt" &&
              key != "updatedAt" &&
              key != "imgs_to_uplod" &&
              key != "images_url" &&
              key != "images_to_del" &&
              key != "user_id"
            ) {
              doc[key] = value;
            }
          });

          if (images_to_del?.length > 0) {
            // console.log(images_to_del)
            // const public_ids = images_to_del.map(
            //   (img) => `my-project-images/${img.split("/").pop().split(".")[0]}`
            // );
            //  console.log(public_ids)
            try {
              await imageKit.bulkDeleteFiles(
                images_to_del,
                function (error, result) {
                  if (error) {
                    console.log(error);
                    let back = err(400, "error in imgkit deleting", false);
                    if (back) {
                      return;
                    }
                  }
                }
              );
            } catch (err) {
              console.log(err + "err");
              let back = err(400, "error in imgkit deleting", false);
              if (back) {
                return;
              }
            }
            const newimages_url = doc.images_url.filter((id) => {
              return !images_to_del.includes(id.img_id);
            });
            doc.images_url = newimages_url;
          }
          if (imgs_to_uplod?.length > 0) {
            const imgs = [];
            for (const obj of imgs_to_uplod) {
              try {
                const file = obj.url;
                const imgname = obj.filename;
                const response = await imageKit.upload({
                  file,
                  fileName: imgname,
                });
                if (response) {
                  console.log(response);
                  if (response.fileId) {
                    imgs.push({
                      img_id: response.fileId,
                      img_url: response.url,
                    });
                  }
                }
                if (!response) {
                  console.log("error in uploding imgs");
                  continue;
                }
              } catch (error) {
                console.log(error);
                continue;
              }
            }
            if (imgs.length > 0) {
              for (const obj of imgs) {
                doc.images_url.push(obj);
              }
            } else {
              let back = err(400, "error in imgkit uploding", false);
              if (back) {
                return;
              }
            }
          }

          console.log(doc);
          let updated = await doc.save();
          // const user = await cardataschema.findByIdAndUpdate({id : });
          if (updated) {
            res.status(201).json({
              success: true,
              message: "updated successfully",
              // car_id: doc._id,
            });
          } else {
            let back = err(400, "car not updated", false);
            if (back) {
              return;
            }
          }
        }

        function err(status, message, success) {
          res.status(status).json({
            success: success,
            message: message,
          });
          return true;
        }
        // res.status(200).json({
        //   success: true,
        //   message: "message",
        // });
        // return true;
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
            message: "something went wrong",
          });
        }
      }
      break;
    default:
      return;
  }
}
