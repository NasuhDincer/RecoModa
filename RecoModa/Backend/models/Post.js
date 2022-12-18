//Tarık 
import mongoose from "mongoose";
const Post = new mongoose.Schema(
    {
        mediaId: { type: String, required: true, unique: true },
        description : {type : String},
        fileList: {type: Array}

    },
    { timestamps: true }
);

export default mongoose.model("Post", Post);