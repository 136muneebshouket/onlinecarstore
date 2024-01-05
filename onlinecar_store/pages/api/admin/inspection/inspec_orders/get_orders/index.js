// import user from "@/models/user";
import slots_schema from "@/models/slots_schema";
import admin_schema from "@/models/admin_schema";
import dbConnect from "@/config/dbConnect";
import inspec_request from "@/models/inspec_request";

export default async function handler(req, res) {
  dbConnect();
  try {
    switch (req.method) {
      case "GET":
        let findobj ={}
        let selectedfields={}
        if(req.query.slotdate){
            findobj.slot = req.query.slotdate
            selectedfields.slottime = 1
        }
        
       let find = await inspec_request.find(findobj,selectedfields)
       
        res.status(200).json({
            success: true,
            message: "done",
            payload:find
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
