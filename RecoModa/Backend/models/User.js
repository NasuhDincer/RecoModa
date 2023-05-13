//Tarık
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phoneNumber : { type: String, required: true },
        role: {type: String},
        favoriteProductList :{ type: Array },
        weight: {type: String},
        height: {type: String},
        gender: {type: String},
        clothingSize: {type: Array},
        shoeSize: {type: String},
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);