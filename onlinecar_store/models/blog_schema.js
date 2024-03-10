const mongoose = require("mongoose")


const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    photo: {
        type: Object,
        required: false
    },
    metadesc:{
        type:String,
        required:true
    },
    priority: {
        type: Number,
        default:0
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    views:{
        type : Number , 
        default : 0
    },
  
    comments: [
        {
            name: {
                type: String,
                required: false
            },
            email: {
                type: String,
                required: false
            },
            comment:{
                type:String,
                required:true
            },
            date: {
                type: Date,
                required: false,
            }
        },
    ]
}, { timestamps: true })


export default mongoose.models.blogs || mongoose.model("blogs", BlogSchema);