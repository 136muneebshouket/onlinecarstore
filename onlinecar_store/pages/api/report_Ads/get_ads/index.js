
import dbConnect from "@/config/dbConnect";
import report_ad_schema from "@/models/report_ad_schema";

export default async function handler(req, res) {
    if(req.method == 'GET'){
     try {
        const result = await report_ad_schema.find()
              
        if (result) {
          res.status(200).json({
            success: true,
            payload: result,
            message: "done",
          });
        }
     } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
          });
     }
    }
}