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

      let {brand_key , model_key} = req.query;
        let obj = {};
        let selected_fields = {} 

        // console.log( req.query)
  
        if(brand_key == 'ALL'){
          selected_fields['name'] = 1;
          selected_fields['_id'] = 0
        }else if(brand_key != 'ALL' && brand_key != ''){
          obj.name = brand_key;
        }

        let find = await options.find(obj,selected_fields);
        
        let returnobj = find;

        // if(brand_key != 'ALL' && brand_key != ''){
        //  let models =  find[0].models.map((v)=>{
        //     return { name : v.name }
        //   })
        //   returnobj = models
        // }
        // console.log(returnobj)

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
