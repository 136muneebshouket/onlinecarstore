import chats from "@/models/chats";
import cardataschema from "@/models/cardataschema";
import user from "@/models/user";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let { ad_id, user_id, msg, chat_id } = req.body;

      if (!user_id) {
        throw new Error("User is missing try login again");
      }
      if (!ad_id) {
        throw new Error("Ad is missing");
      }
      if (!msg) {
        throw new Error("message is required");
      }

      let seller = await cardataschema.findById(
        { _id: ad_id },
        { seller_id: 1, _id: 0 }
      );
      if (!seller) {
        throw new Error("Ad or seller is missing");
      }

      let msgobj = {
        msg: msg,
        from:user_id
      };
   
      //    console.log(seller.seller_id)
      //   try {

      //   } catch (error) {}
      if (chat_id) {
        let chat = await chats.findByIdAndUpdate(
          { _id: chat_id },
          { $push: { chat: msgobj } }
        );
      } else {
        if(user_id == seller?.seller_id){
          throw new Error("You cannot start a chat");
        }
        let chatobj = {
          seller_id: seller?.seller_id,
          buyer_id: user_id,
          ad_id: ad_id,
          chat: [msgobj],
        };
        
        let create_chat = await chats.create(chatobj);

        if (!create_chat) {
          throw new Error("something went wrong");
        }
      }

      //   if (!chat) {

      //   }
      //   console.log(chat)

      return res.status(200).json({ success: true, message: "done" });
    } catch (error) {
      //   console.error('Error uploading images:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    // Handle any other HTTP method
  }
}
