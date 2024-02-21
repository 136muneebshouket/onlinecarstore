// import user from "@/models/user";
import inspec_schema from "@/models/inspec_schema";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  try {
    switch (req.method) {
      case "GET":
        let Ad_id = req.query.Ad_id
        let del_index = req.query.del
        
        let selected_fields={
          Extrior_conditions:1,
          _id:0
         }
        

        if(del_index){
          // console.log(del_index)
          let find = await inspec_schema.findOne({ad_id:Ad_id},{all_imgs:1,_id:0});
          let imgs = find.all_imgs.filter((v,i)=> v?.flag_index == del_index)
          res.status(200).json({
            success: true,
            message: "All body faults",
            payload:imgs
          });
          return
        }
        // console.log(Ad_id)
       
       let exist = await inspec_schema.findOne({ad_id : Ad_id },selected_fields);
        
        
        res.status(200).json({
            success: true,
            message: "Your slot has been received",
            payload:exist?.Extrior_conditions
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
