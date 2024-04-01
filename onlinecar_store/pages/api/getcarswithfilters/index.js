import cardataschema from "../../../models/cardataschema";
import dbConnect from "../../../config/dbConnect";
import inspec_schema from "@/models/inspec_schema";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "GET":
      //   var { password, email, full_name, username } = req.body;

      try {
        // console.log(req.query);
        
        const { filters, text , sortby } = req.query;
        // console.log(text);

        var limit = req.query.limit || 12;
        var page = req.query.page || 1;
        var skip = limit * (page - 1);
        // console.log(limit)

        let sortobj = { pending: -1, createdAt: -1 }
        const appliedfilters = { active: true };
        try {
          if (filters) {
            let queryobj = JSON.parse(filters);
            // let parsequery= queryString.parse(quer)
            Object.entries(queryobj).map(([key, value]) => {
              if (typeof value === "string") {
                appliedfilters[key] = JSON.parse(value);
              } else {
                appliedfilters[key] = value;
              }
            });
          }
        } catch (error) {
          console.log(error + "json parse error");
        }
        try {
          if (text) {
            appliedfilters["$text"] = { $search: text };
          }
        } catch (error) {
          console.log(error + " text search error");
        }
        if (sortby){
          delete sortobj['createdAt']
          let sortKey = sortby.split("-")[0]
          let sortOrder = sortby.includes("desc") ? -1 : 1;
          sortobj[sortKey]= sortOrder;
        }

        const selectedfields = {
          brand: 1,
          model: 1,
          variant_name: 1,
          modelyear: 1,
          city: 1,
          Mileage: 1,
          enginetype: 1,
          enginecc: 1,
          transmission: 1,
          featured: 1,
          certified: 1,
          inspected: 1,
          auction_sheet: 1,
          managed_by: 1,
          overall_incpection_rating: 1,
          price: 1,
          pending: 1,
          images_url: { $slice: 1 }, // Limit the images array to the first element only
          _id: 1, // Exclude the "_id" field from the results
        };

        // Perform the query with the specified projection
        const result = await cardataschema
          .find(appliedfilters, selectedfields)
          .limit(limit)
          .skip(skip)
          .sort(sortobj)
          .populate("overall_incpection_rating", "overall_rating");
        const count = await cardataschema.find(appliedfilters).count();

        if (result) {
          res.status(200).json({
            success: true,
            data: result,
            count: count,
            message: "done",
          });
        }
      } catch (err) {
        res.status(400).json({
          success: false,
          message: err,
        });
      }
      break;
    default:
      return;
  }
}
