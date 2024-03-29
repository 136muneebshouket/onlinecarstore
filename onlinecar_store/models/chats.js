const mongoose = require("mongoose");

const chatsSchema = new mongoose.Schema({
  seller_id: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  buyer_id: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  ad_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carscollection",
    required: true,
  },
  chat: [
    {
      msg: {
        type: String,
        required: true,
      },
      seen: {
        type: Boolean,
        default: false,
      },
       from:{
        type: String,
        required: true,
       }
    },
  ],
},{timestamps:true});

// const userid =localStorage.getItem("userid");

export default mongoose.models.chats || mongoose.model("chats", chatsSchema);
