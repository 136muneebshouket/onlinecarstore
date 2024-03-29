import chats from "@/models/chats";
import cardataschema from "@/models/cardataschema";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let { user_id } = req.query;

      //   let seller = await cardataschema.findById(
      //     { _id: ad_id },
      //     { seller_id: 1, _id: 0 }
      //   );
      //  console.log(seller.seller_id)

      let chat = await chats.find({
        $or: [
          { seller_id: { $in: [user_id] } },
          { buyer_id: { $in: [user_id] } },
        ],
      },{chat:0}).populate('ad_id' , 'brand model').populate('seller_id' , { name: 1, _id: 0}).populate('buyer_id' , { name: 1, _id: 0}).sort({updatedAt:-1});
      // console.log(chat)

      return res.status(200).json({ success: true, payload: chat });
    } catch (error) {
      //   console.error('Error uploading images:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    // Handle any other HTTP method
  }
}
