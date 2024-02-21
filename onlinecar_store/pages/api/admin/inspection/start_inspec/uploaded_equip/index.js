// import user from "@/models/user";
import inspec_schema from "@/models/inspec_schema";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  try {
    switch (req.method) {
      case "GET":
        // console.log(req.query)
       let {Ad_id} = req.query
    //    if(!equip_parent || !equip_name || !Ad_id){
    //     throw new Error("Error in fetching equipment");
    //    }
    
       let selected_fields = {}
       let obj = {};
       if (Ad_id) {
         obj.ad_id = Ad_id
         selected_fields.accident_checklist = 1
         selected_fields.ETC = 1
         selected_fields.brakes = 1
         selected_fields.susp_steering = 1
         selected_fields.interior = 1
         selected_fields.Ac_heater = 1
         selected_fields.Electronics = 1
         selected_fields.Exterior = 1
         selected_fields.Tyres = 1
         selected_fields.Test_drive = 1
         selected_fields['_id'] = 0
       }
    
       let exist = await inspec_schema.findOne(obj,selected_fields);
        
    //    console.log(exist.accident_checklist)
       let obj_send=[]
        
       for (var key in exist) {
           if(Array.isArray(exist[key])){
            let arr = exist[key]
            arr.forEach((v,index)=>{
                if(v?.equip_name){
                  obj_send.push(v?.equip_name)
                }
            })
           }
      }
    //    console.log(obj_send) 

        res.status(200).json({
            success: true,
            message: "Your slot has been received",
            payload:obj_send
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
