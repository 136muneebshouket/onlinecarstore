const mongoose = require("mongoose");

const car_options = new mongoose.Schema({
   
   
    name:{
        type:String,
    },
    models:{
        type: Array,
    }
   
})


// const userid =localStorage.getItem("userid");
   
export default mongoose.models.options || mongoose.model("options", car_options);