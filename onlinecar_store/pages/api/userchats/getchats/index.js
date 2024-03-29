import chats from "@/models/chats";
import cardataschema from "@/models/cardataschema";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let { ad_id, user_id } = req.query;

      //   let seller = await cardataschema.findById(
      //     { _id: ad_id },
      //     { seller_id: 1, _id: 0 }
      //   );
      //  console.log(seller.seller_id)
      // console.log(ad_id)
      if(!ad_id && !user_id){
        throw new Error('AD and user info is required')
      }

      let chat = await chats.findOne(
        {
          $or: [
            { seller_id: { $in: [user_id] } },
            { buyer_id: { $in: [user_id] } },
          ],
          ad_id: ad_id,
        },
        {
          chat: 1,
        }
      );
      // console.log(user_id)
     let newchat = chat.chat.map((v) => {
        if (v.from == user_id) {
          v.from = "mine";
        }
        return v
      });
    //  console.log(newchat)
     chat.chat = newchat
      return res.status(200).json({ success: true, payload: chat });
    } catch (error) {
      //   console.error('Error uploading images:', error);
      return res.status(400).json({ success: false, message: error.message });
    }
  } else {
    // Handle any other HTTP method
  }
}
