import mongoose from "mongoose";
const PostObjectSchema = new mongoose.Schema(
    {
        mediaId: { type: String},
        description : {type : String},
        category: {type: Array},
        likeList: {type : Array},
        commentList : {type : Array},
        img:{type : Array},
        productInfo :{ type: Array},

    },
    { timestamps: true }
);

export default mongoose.model("PostOject", PostObjectSchema);