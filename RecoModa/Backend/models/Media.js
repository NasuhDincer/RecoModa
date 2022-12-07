//Zülal 
import mongoose from "mongoose";
const Media = new mongoose.Schema(
    {
        mediaId: { type: String, required: true, unique: true },
        userId: { type: String, required: true, unique: true },
        mediaProfileId:{type: String, required: true, unique: true},
        followerList:{ type: Array},
        followedList:{type: Array},
        favoritePostList: {type: Array},
        postList: {type: Array}

    },
    { timestamps: true }
);

export default mongoose.model("Media", Media);