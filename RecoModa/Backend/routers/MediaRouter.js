//Tarık
import Media from "../models/Media.js";
import Post from "../models/Post.js";
import multer from 'multer';
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "./verifyToken.js";

import express from "express";

const router = express.Router();

//GET MEDIA

router.get("/:id", async (req,res) => {
  try{
     const media = await Media.findById(req.params.id)
     res.status(200).json(media);
  }catch(err) {
    res.status(500).json(err);
  }
});

//UPDATE MEDIA
router.put("/:id", async (req, res) => {
  try {
    const updatedMedia = await Media.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    console.log("Güncelledi");
    console.log(updatedMedia);
    res.status(200).json(updatedMedia);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE MEDIA
router.delete("/:id", async (req, res) => {
  try {
    await Media.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL

router.get("/", async (req, res) => {
  try {
    const medias = await Media.find();
    res.status(200).json(medias);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
