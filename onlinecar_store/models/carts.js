const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
   
   userid: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },

    cartItems: {
        default: [],
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'carscollection',
            }
        }],
    }
   
})


// const userid =localStorage.getItem("userid");
   
export default mongoose.models.carts || mongoose.model("carts", cartSchema);