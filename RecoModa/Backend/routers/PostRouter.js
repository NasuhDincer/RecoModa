//Tarık
import bodyParser from "body-parser";
import fs from "fs";
import multer from "multer";
import Post from "../models/Post.js";
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
  const saveImage = Post({
    mediaId: req.body.mediaId,
    description: req.body.description,
    fileList: req.body.fileList,
    likeList: req.body.likeList,
    commentList: req.body.commentList,
    img: {
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

router.post("/uploads", upload.array("images"), (req, res) => {
    var folder  = req.files;
    let imgArray = [];
    folder.forEach((file) => imgArray.push({
      data: fs.readFileSync("uploads/" + file.filename),
      contentType: "image/png",
    }) )
   
    var saveImage = Post({
      mediaId: req.body.mediaId,
      description: req.body.description,
      category: req.body.category,
      likeList: req.body.likeList,
      commentList: req.body.commentList,
      img : imgArray
    });
   
    /* folder.forEach((file) => saveImage.img.push([{
      data: fs.readFileSync("uploads/" + file.filename),
      contentType: "image/png",
    }]) )*/

    saveImage
      .save()
      .then((res) => {
        console.log("image is saved");
        console.log(res.category);
      })
      .catch((err) => {
        console.log(err, "error has occur");
      });
    res.send("image is saved");
  });

router.get("/", async (req, res) => {
  const allData = await Post.find();
  res.json(allData);
});

/*
CREATE POST

*/
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    //console.log("I TRY")
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
//successfully tested
router.put("/:id", async (req, res) => {
  //console.log(req.body);
  // console.log(req.params.id)
  try {
    const updatedPost = await Post.findByIdAndUpdate(
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
    await Post.findByIdAndDelete(req.params.id);
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
    const post = await Post.findById(req.params.userId);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS

router.get("/allPosts/:mediaId", async (req, res) => {
  try {
    const post = await Post.find({ mediaId: req.params.mediaId });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL CATEGORY

router.get("/allCategory/:category", async (req, res) => {
  try {
    const post = await Post.find({ category: req.params.category });
    console.log("category")
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
//successfully tested
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/media/:id", async (req, res) => {
  console.log(req.body);
  // console.log(req.params.id)
  try {
    const posts = await Post.findOne({ mediaId: req.params.id });

    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
