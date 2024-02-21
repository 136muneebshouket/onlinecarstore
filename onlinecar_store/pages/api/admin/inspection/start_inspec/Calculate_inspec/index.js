// import user from "@/models/user";
import inspec_schema from "@/models/inspec_schema";
import dbConnect from "@/config/dbConnect";
import cardataschema from "@/models/cardataschema";
import inspec_request from "@/models/inspec_request";

export default async function handler(req, res) {
  dbConnect();
  try {
    switch (req.method) {
      case "POST":
        // console.log(req.query)
        let { Ad_id } = req.body;
        //    if(!equip_parent || !equip_name || !Ad_id){
        //     throw new Error("Error in fetching equipment");
        //    }

        let selected_fields = {};
        let obj = {};
        if (Ad_id) {
          obj.ad_id = Ad_id;
          selected_fields.Extrior_conditions = 1;
          selected_fields.accident_checklist = 1;
          selected_fields.ETC = 1;
          selected_fields.brakes = 1;
          selected_fields.susp_steering = 1;
          selected_fields.interior = 1;
          selected_fields.Ac_heater = 1;
          selected_fields.Electronics = 1;
          selected_fields.Exterior = 1;
          selected_fields.Tyres = 1;
          selected_fields.Test_drive = 1;
        }

        let exist = await inspec_schema.findOne(obj, selected_fields);

        let percentage = {};
     
        for (var key in exist) {
          if (Array.isArray(exist[key])) {
            if(key == 'Test_drive'){
              continue;
            }
            if (key == "Extrior_conditions") {
              let arr = exist[key];
              let sum = arr.reduce((total, v) => total + v.status_mark, 0);
              let percent = 100 + sum;
              if(percent < 0){
                percent = 0
              }
              percentage[key] = parseInt(percent);
            } else {
              let arr = exist[key];
              let total_equips = arr.length;
              let sum = arr.reduce((total, v) => total + v.status_mark, 0);
              let percent = (sum / total_equips) * 100;
              percentage[key] = parseInt(percent);
            }
          }
        }

        let mean = 0
        for (var key in percentage) {
        mean += percentage[key]
        }

        try {
         let total_parts = Object.keys(percentage).length;
         let rate = (((mean / total_parts) / 100) * 10).toFixed(1);
         let update_inspec =  await inspec_schema.findOneAndUpdate(obj, {percentages: percentage , overall_rating:rate});
         let update_AD =  await cardataschema.findOneAndUpdate({_id : Ad_id}, {overall_incpection_rating: exist?._id });

        let done_inspec = await inspec_request.findOneAndUpdate({ad_id:Ad_id} , {completed:true})

        } catch (error) {
          throw new Error('something wrong in Calculating inspection')
        }
        
        res.status(200).json({
          success: true,
          message: "Done inspection",
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
