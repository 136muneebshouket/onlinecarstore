import cardataschema from "@/models/cardataschema";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  if (req.method === "POST") {
    try {
         let {slug , current_view} = req.body
        let view_count = await cardataschema.findOneAndUpdate({slug:slug},{views : current_view})
        if(!view_count){
            throw new Error('something went wrong')
        }
      res.status(200).json({
        success: true,
        views: view_count.views,
      });
      return;
    } catch (error) {
      res.status(200).json({
        success: false,
        message: error,
      });
    }
  }
}
