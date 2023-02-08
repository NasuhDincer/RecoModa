//Tarık
import bodyParser from "body-parser";
import fs from "fs";
import multer from "multer";
import MediaProfile from "../models/MediaProfile.js";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "./verifyToken.js";

import express from "express";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("images"), (req, res) => {
  const saveImage = MediaProfile({
    mediaId: req.body.mediaId,
    description: req.body.description,

    profilePicture: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png",
    },
  });
  saveImage
    .save()
    .then((res) => {
      console.log("image is saved");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
  res.send("image is saved");
});

//UPDATE POST
//successfully tested
router.put("/:id", async (req, res) => {
  //console.log(req.body);
  // console.log(req.params.id)
  try {
    const updatedPost = await MediaProfile.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    console.log("Güncelledi");
    console.log(updatedPost);
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    await MediaProfile.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
//successfully tested
router.get("/:id", async (req, res) => {
  //console.log("geldi")
  try {
    const profile = await MediaProfile.findById(req.params.id);
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS

router.get("/:mediaId", async (req, res) => {
  try {
    const profile = await MediaProfile.find({ mediaId: req.params.mediaId });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
//successfully tested
router.get("/", async (req, res) => {
  try {
    const profiles = await MediaProfile.find();
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/media/:id", async (req, res) => {
  console.log(req.body);
  // console.log(req.params.id)
  try {
    const profile = await MediaProfile.findOne({ mediaId: req.params.id });

    console.log(profile);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
