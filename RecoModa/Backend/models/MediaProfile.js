//Tarık
import mongoose from "mongoose";
const MediaProfileSchema = new mongoose.Schema(
  {
    userId: { type: String, },
    description: { type: String },
    profilePicture: { type : Array }
  },
  { timestamps: true }
);

export default mongoose.model("MediaProfile", MediaProfileSchema);
