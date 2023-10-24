import admin_schema from "@/models/admin_schema";
import utube_schema from "@/models/utube_schema";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "GET":
      

      try {
        // console.log(req.query)
        let videos = {}
        let match = {}

        var limit = parseInt(req.query.limit) || 12
        var page = req.query.page || 1
        var skip = (limit * (page - 1))

        if (req.query.catogery) {
            match.catogery = req.query.catogery
        }
        if (req.query.keyword) {
            match.title = new RegExp(req.query.keyword, "i")
        }
        if (req.query.priority) {
            match.priority = req.query.priority
        }

        if (req.query.countOnly) {
            videos.count = await utube_schema.find().count()
        } else {
            // videos.data = await utube_schema.find(match)
            videos.data = await utube_schema.find(match).limit(limit).skip(skip).sort({createdAt:-1})
            // 
            videos.count = await utube_schema.find(match).count()
        }

        // console.log(videos.data)
        res.status(200).json({
            success: true,
            payload: videos
        })

       
      } catch (err) {
        console.log(err);
       
          // Handle other types of errors
          res.status(500).json({
            success: false,
            message: "something went wrong",
          });
        
      }
      break;
    default:
      return;
  }
}
