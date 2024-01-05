import dbConnect from "@/config/dbConnect";
import cardataschema from "@/models/cardataschema";

export default async function handler(req, res) {
  dbConnect();
  if (req.method === "GET") {
    try {

        // if(req.query.single_ad){
         
        //  const singleAd = await cardataschema.findOne({_id: req.query.single_ad});
        //  if(singleAd){
        // //  console.log(singleAd)
        //     res.status(200).json({
        //         success: true,
        //         payload: singleAd,
        //         message: "done",
        //       });
        //  }

        // }else{
            let find={pending:0,active:true}
            const selectedfields = {
                brand: 1,
                model:1,
                variant_name: 1,
                modelyear: 1,
                _id: 1, // Exclude the "_id" field from the results
              };
              
              const result = await cardataschema.find(find, selectedfields)
              
              if (result) {
                res.status(200).json({
                  success: true,
                  payload: result,
                  message: "done",
                });
              }
        // }
       
    } catch (error) {

        res.status(400).json({
            success: false,
            message: error,
          });

    }
  }
}
