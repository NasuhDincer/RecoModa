//Zülal
import Product from "../models/Product.js";
import multer from 'multer';
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const imageStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './products/');
    },
    filename: (req,file,cb)=> {
        cb(null, file.filename + '_'+Date.now() 
        + path.extname((file.originalname)))
    }
});
const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 1000000*16 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
});
router.post('/uploadProductImage', imageUpload.array('images', 4),     (req, res) => {
    res.send(req.files)
 }, (error, req, res, next) => {
     res.status(400).send({ error: error.message })
 });
 //Upload Product
router.post ('/uploadProducts', imageUpload.array ('images',4), async(req,res)=>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        productId : req.body.productId,
        productName : req.body.productName,
        brand: req.body.brand,
        price: req.body.price,
        description: req.body.description,
        catagory: req.body.catagory,
        color: req.body.color,
        owner: req.body.owner,
        sizeInfo: req.body.sizeInfo,
        inStock: req.body.inStock
    });
    try { 
        const newProduct = await Product.bulkSave();
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
});
//update product
router.put("/:id", async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      console.log("Güncelledi");
      console.log(updatedProduct);
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //DELETE CART
router.delete("/:id", async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

  export default router;