// import user from "@/models/user";
import inspec_schema from "@/models/inspec_schema";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  try {
    switch (req.method) {
      case "GET":
        // console.log(req.query)
       let {equip_parent , equip_name , Ad_id} = req.query
       if(!equip_parent || !equip_name || !Ad_id){
        throw new Error("Error in fetching equipment");
       }
    
       let selected_fields = {}
       let obj = {};
       if (equip_parent) {
         obj.ad_id = Ad_id
         obj[equip_parent] = { $elemMatch: { equip_name: equip_name } };
        //  obj['all_imgs'] = { $elemMatch: { img_flag: `${equip_parent}>${equip_name}` } };
         selected_fields[`${equip_parent}`] = 1
         selected_fields["all_imgs"] = 1
         selected_fields['_id'] = 0
       }
    
       let exist = await inspec_schema.findOne(obj,selected_fields);
        
       let obj_send={}

        if (exist) {
          let data = exist[`${equip_parent}`].filter(v => v.equip_name == equip_name)
          obj_send = data[0]
          let imgs = exist.all_imgs.filter(v => v.img_flag == `${equip_parent}>${equip_name}`)
          obj_send.imgs = imgs
        //   throw new Error("Already uploaded");
        }

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
