import dbConnect from "@/config/dbConnect";
import blog_schema from "@/models/blog_schema";

export default async function handler(req, res) {
  dbConnect();
  if (req.method === "GET") {
    try {
    //   console.log("working");
      let { slug } = req.query

     

      let fetch_blog = await blog_schema
        .findOne({ slug : slug })
      
     

      if (!fetch_blog) {
        throw new Error("Something went wrong");
      }

      if (fetch_blog) {
        res.status(200).json({
          success: true,
          data: fetch_blog,
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
