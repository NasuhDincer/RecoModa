//Zülal 
import mongoose from "mongoose";
const Media = new mongoose.Schema(
    {
        userId: { type: String, required: true, unique: true },
        followerList:{ type: Array},
        followedList:{type: Array},
        favoritePostList: {type: Array},
    },
    { timestamps: true }
);

export default mongoose.model("Media", Media);