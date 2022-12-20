//Zülal
import mongoose from "mongoose";
const Product = new mongoose.Schema(
    {
        productId: { type: String, required: true, unique: true },
        productName: { type: String, required: true, unique: true },
        brand: {type:String, required : true},
        price: { type: String, required: true },
        description : { type: String, required: true },
        catagory: {type: String, required: true},
        color :{ type: Array, required: true },
        owner: {type: String, required: true},
        sizeInfo: {type: String, required: true},
        inStock:{type: Boolean, required: true}
    },
    { timestamps: true }
);

export default mongoose.model("Product", Product);