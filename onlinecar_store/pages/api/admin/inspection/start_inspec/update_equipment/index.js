// import user from "@/models/user";
// import slots_schema from "@/models/slots_schema";
import admin_schema from "@/models/admin_schema";
import inspec_schema from "@/models/inspec_schema";
// import cardataschema from "@/models/cardataschema";
import dbConnect from "@/config/dbConnect";
// import user from "@/models/user";
// import inspec_request from "@/models/inspec_request";
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
  dbConnect();

  switch (req.method) {
    case "POST":
      try {
        // console.log(req.body)
      
        
        const {
          modalvalue,
          equip_status,
          imgs_to_upload,
          imgs_to_del,
        } = req.body;

        const { status, status_mark } = equip_status;
        const { equip_parent, equip_name, Ad_id } = modalvalue;
        if (!equip_parent) {
          throw new Error("equipment is missing its parent part.");
        }
        if (!Ad_id) {
          throw new Error("Ad id is missing its parent part.");
        }
        if (!equip_name) {
          throw new Error("equipment name is missing.");
        }
        if (!status) {
          throw new Error("equipment status or flag is missing.");
        }
      
       
        // const checkAdmin = await admin_schema.countDocuments({
        //   resetToken: admin_token,
        // });
        // if (!checkAdmin) {
        //   throw new Error(
        //     "Admin credentials are missing please login again as admin"
        //   );
        // }
        // find if equipment is already added
        let obj = {};
        if (equip_parent) {
          obj.ad_id = Ad_id;
          obj[equip_parent] = { $elemMatch: { equip_name: equip_name } };
        }
        // console.log(obj)
        let exist = await inspec_schema.findOne(obj);
        if (exist) {
          let newobj = {
            equip_name,
            equip_status : status,
            status_mark,
          };
          let arr = exist[equip_parent];
          let indexof_equip = arr.findIndex((v) => {
            return v.equip_name == equip_name;
          });
          arr[indexof_equip] = newobj;
          exist[equip_parent] = arr;
          // console.log(exist);
          let savedoc = await exist.save()
          if(!savedoc) {
             throw new Error("Cannot update");
          }
        }
       
        if (imgs_to_del?.length > 0) {
          try {
           let deleted = await imageKit.bulkDeleteFiles(imgs_to_del);
           let newarr =  exist.all_imgs.filter((v)=> {
              if(!(imgs_to_del.includes(v.img_id))){
               return v
              }
            })
            exist.all_imgs=newarr
            await exist.save();
          } catch (error) {
            throw new Error("error in imgkit deleting");
          }
        }

        let imgs_to_uplod = [];
        if (imgs_to_upload?.length > 0) {
          for (const obj of imgs_to_upload) {
            const response = await imageKit.upload({
              file: obj.img_url,
              fileName: obj.filename,
            });
            if (!response) {
              throw new Error("Error in uploading images");
            }
            if (response) {
              if (response.fileId) {
                imgs_to_uplod.push({
                  img_flag:`${equip_parent}>${equip_name}`,
                  img_id: response.fileId,
                  img_url: response.url,
                });
              }
            }
          }
        }

        if (imgs_to_uplod?.length > 0) {
          for(let v of imgs_to_uplod){
            await inspec_schema.findOneAndUpdate({ad_id: Ad_id },{ $addToSet:{ all_imgs : v  }})
          }
        }

        res.status(200).json({
          success: true,
          message: "uploaded",
        });
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
      break;
    default:
      return;
  }
}
