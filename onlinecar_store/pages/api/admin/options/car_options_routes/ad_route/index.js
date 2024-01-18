// import user from "@/models/user";
// import slots_schema from "@/models/slots_schema";
import admin_schema from "@/models/admin_schema";
import options from "@/models/options";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  try {
    switch (req.method) {
      case "POST":
        const { modal_value, Newdata, admin_token, make } = req.body;

        const checkadmin = await admin_schema.countDocuments({
          resetToken: admin_token,
        });
        if (!checkadmin) {
          throw new Error("Please Login as Admin ");
        }

        if (!Newdata || !modal_value) {
          throw new Error("please provide new data to Add");
        }

        let obj = {};
        let findd = await options.findOne(obj);
        // console.log(findd)

        if (modal_value == "Make") {
          let obj = {
            name: Newdata,
            models: [],
          };
          findd.main_arr.push(obj);
          //  console.log(findd[0].main_arr.length)
          let updated = await findd.save();
          if (!updated) {
            throw new Error("can't update Make");
          }
        }
        if (modal_value == "Model") {
          if (!make) {
            throw new Error("Please provide make of the body");
          }

          let ad_model = {
            name: Newdata,
            variants: [],
          };
          findd.main_arr.forEach((obj) => {
            if (obj.name == make) {
              obj.models.push(ad_model);
            }
          });
          let updated = await findd.save();
          if (!updated) {
            throw new Error("can't update Make");
          }

          //  res.status(200).json({
          //   success: true,
          //   message: "Your slot has been received",
          //   payload:findd
          // });
          // return
          // let updated = await findd.save();
          // if (!updated) {
          //   throw new Error("can't update Make");
          // }
        }

        //  let updated = await findd.save();
        // let returnobj = find;

        // if (req.query.hint == "Make") {
        //  let filter =  find[0].main_arr.map((v) => {
        //     return (v.name);
        //   });
        //   returnobj = filter;
        // }
        // console.log(returnobj);

        res.status(200).json({
          success: true,
          message: "Your slot has been received",
        });

        break;
      default:
        return;
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
