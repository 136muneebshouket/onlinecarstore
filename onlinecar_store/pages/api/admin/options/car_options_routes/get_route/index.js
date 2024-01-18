// import user from "@/models/user";
// import slots_schema from "@/models/slots_schema";
// import admin_schema from "@/models/admin_schema";
import options from "@/models/options";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  try {
    switch (req.method) {
      case "GET":
        let obj = {};
        let find = await options.find(obj);

        let returnobj = find;

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
          payload: returnobj,
        });

        break;
      default:
        return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
