
const mongoose = require('mongoose');

const postShema =new mongoose.Schema({

    title: String,
    message: String,
    creator: String,
    tag:[String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    }

},{timestamps:true})


module.exports= mongoose.model('Post',postShema)


