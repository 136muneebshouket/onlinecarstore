import cardataschema from "../../../models/cardataschema";
import dbConnect from "../../../config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  switch (req.method) {
    case "GET":
    //   var { password, email, full_name, username } = req.body;

      try {
        // console.log('getting cars')
        const selectedfields = {
            brand: 1,
            variant_name: 1,
            modelyear: 1,
            city: 1,
            Mileage: 1,
            enginetype: 1,
            enginecc: 1,
            transmission: 1,
            price: 1,
            images_url: { $slice: 1 }, // Limit the images array to the first element only
            _id: 1, // Exclude the "_id" field from the results
          };
      
          // Perform the query with the specified projection
          const result = await cardataschema.find({}, selectedfields);
      
          // Process the query results
          console.log(result); // This will contain documents with only the selected fields and the first element of the images array
          if(result){
            res.status(200).json({
                success: true,
                data:result,
                message:'done',
              });
          }
       
      
      } catch (err) {
       
                 res.status(400).json({
                  success: false,
                  message:err
                });

      }
      break;
    default:
      return;
  }
}
