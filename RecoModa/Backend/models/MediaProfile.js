//Tarık
import mongoose from "mongoose";
const MediaProfileSchema = new mongoose.Schema(
  {
    mediaId: { type: String, },
    description: { type: String },
    profilePicture: { data: Buffer, contentType: String }
  },
  { timestamps: true }
);

export default mongoose.model("MediaProfile", MediaProfileSchema);
