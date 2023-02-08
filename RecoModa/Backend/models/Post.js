//Tarık 
import mongoose from "mongoose";
const PostSchema = new mongoose.Schema(
    {
        mediaId: { type: String},
        description : {type : String},
        category: {type: String},
        likeList: {type : Array},
        commentList : {type : Array},
        img:{type : Array}

    },
    { timestamps: true }
);

export default mongoose.model("Post", PostSchema);