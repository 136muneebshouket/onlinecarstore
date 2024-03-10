import dbConnect from "@/config/dbConnect";
import blog_schema from "@/models/blog_schema";

export default async function handler(req, res) {
  dbConnect();
  if (req.method === "GET") {
    try {
    //   console.log("working");
      let find = {};

      let selected_fields = {
        priority: 0,
        comments: 0,
      };

      var limit = req.query.limit || 12;
      var page = req.query.page || 1;
      var skip = limit * (page - 1);

      let fetch_blogs = await blog_schema
        .find(find, selected_fields)
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 });

      let count = await blog_schema.find(find).count();

      if (!fetch_blogs) {
        throw new Error("Something went wrong");
      }

      if (fetch_blogs) {
        res.status(200).json({
          success: true,
          data: fetch_blogs,
          count: count,
          message: "done",
        });
      }

      // Process a POST request
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  }
}
