// import cardataschema from "../../../../models/cardataschema";
// import dbConnect from "../../../../config/dbConnect";
// import userschema from "../../../../models/user";
// import carts from "../../../../models/carts";

// export default async function handler(req, res) {
//   dbConnect();
//   switch (req.method) {
//     case "POST":
//       try {
//         // console.log(req.body)
        
//         let userexist = await userschema.findById({ _id: req.body.userid });
//         if(!userexist){
//           let back = err(404, "user not found", false);
//           if (back) {
//             return;
//           }
//         }

//         let cart = await carts.findOne({ userid: req.body.userid });
//         if (cart && cart.id) {
//           if(cart.cartItems?.length > 0){
//             let exist = false;
//             cart.cartItems.map((v,i)=>{
//              if(v.product == req.body.cartItems[0].product){
//               exist = true;
//              }
//             })
//             if(exist == true){
//               let back = err(200, "Already in favourites", true);
//               if (back) {
//               return;
//               }
//             }
//           }
//          let pushcart = await carts.updateOne(
//             { _id: cart.id },
//             { $push: { cartItems: req.body.cartItems[0] } }
//           );
//           if(pushcart){
//             let back = err(200, "Added to favourites", true);
//             if (back) {
//               return;
//             }
//           }
//         } else {
//         let createcart=  await carts.create(req.body);
//           if(createcart){
//             let back = err(200, "Added to favourites", true);
//             if (back) {
//               return;
//             }
//           }
//         }
        
//         function err(status, message, success, payload) {
//           // getback = true
//           res.status(status).json({
//             success: success,
//             message: message,
//             data: payload || "",
//           });
//           return true;
//         }
        
//       } catch (err) {
//         res.status(400).json({
//           success: false,
//           message: err,
//         });
//       }
//       break;
//     default:
//       return;
//   }
// }
