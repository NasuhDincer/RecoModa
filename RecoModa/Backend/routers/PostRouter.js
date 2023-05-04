//Tarık
import bodyParser from "body-parser";
import fs from "fs";
import multer from "multer";
import Post from "../models/Post.js";
import path from "path";
import { PythonShell } from "python-shell";
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
      const options = {
        mode: "text",
        scriptPath: "../Model/",
        args: [res._id],
      };
      PythonShell.run("embedModel.py", options).then((results) => {
        console.log("here");
        console.log(results);
      });

      let pyshell = new PythonShell("embedModel.py", options);
      pyshell.on("message", function (message) {
        console.log(message);
      });
      console.log("image is saved");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
  res.send("image is saved");
});

router.post("/uploads", upload.array("images"), (req, res) => {
  var folder = req.files;
  let imgArray = [];
  folder.forEach((file) =>
    imgArray.push({
      data: fs.readFileSync("uploads/" + file.filename),
      contentType: "image/png",
    })
  );

  var saveImage = Post({
    mediaId: req.body.mediaId,
    description: req.body.description,
    category: req.body.category,
    likeList: req.body.likeList,
    commentList: req.body.commentList,
    img: imgArray,
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

/*
CREATE POST

*/
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
//successfully tested
router.put("/post/:id", async (req, res) => {
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

//LIKE FUNCTION
//successfully tested
router.put("/addLike/:id", async (req, res) => {
  //console.log(req.body);
  // console.log(req.params.id)
  try {
    const updatedPost = await Post.findById(req.params.id);
    console.log(updatedPost.likeList);
    var isLike = true;
    var likeArr = updatedPost.likeList;
    console.log(req.body.userId);
    likeArr.forEach((element) => {
      if (element == req.body.userId) isLike = false;
    });

    console.log(isLike);

    if (isLike) {
      likeArr.push(req.body.userId);
      console.log(likeArr);

      const updatePost = await Post.findOneAndUpdate(
        req.params.id,
        {
          $set: { likeList: likeArr },
        },
        { new: true }
      );
      console.log(updatePost.likeList);
      res.status(200).json(updatePost.likeList);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/addEmbed/:id", async (req, res) => {
  //console.log(req.body);
  // console.log(req.params.id)
  try {
    const updatedPost = await Post.findById(req.params.id);
    console.log(req.params.id);

    const updatePost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: { embedArray : req.body.embedArray },
      },
      { new: true }
    );
    
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//REMOVE LIKE FUNCTION
//successfully tested
router.put("/removeLike/:id", async (req, res) => {
  //console.log(req.body);
  // console.log(req.params.id)
  try {
    const updatedPost = await Post.findById(req.params.id);

    var isLike = true;
    var likeArr = updatedPost.likeList;
    console.log(req.body.userId);
    likeArr.forEach((element) => {
      if (element == req.body.userId) isLike = false;
    });

    console.log(isLike);

    if (isLike) {
      likeArr.remove(req.body.userId);
      console.log(likeArr);

      const updatePost = await Post.findOneAndUpdate(
        req.params.id,
        {
          $set: { likeList: likeArr },
        },
        { new: true }
      );
      console.log(updatePost.likeList);
      res.status(200).json(updatePost.likeList);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//LIKE FUNCTION
//successfully tested
router.put("/addComment/:id", async (req, res) => {
  //console.log(req.body);
  // console.log(req.params.id)
  try {
    const updatedPost = await Post.findById(req.params.id);
    console.log(updatedPost.likeList);
    var isLike = true;
    var likeArr = updatedPost.likeList;
    console.log(req.body.userId);
    likeArr.forEach((element) => {
      if (element == req.body.userId) isLike = false;
    });

    console.log(isLike);

    if (isLike) {
      likeArr.push(req.body.userId);
      console.log(likeArr);

      const updatePost = await Post.findOneAndUpdate(
        req.params.id,
        {
          $set: { likeList: likeArr },
        },
        { new: true }
      );
      console.log(updatePost.likeList);
      res.status(200).json(updatePost.likeList);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
//successfully tested
router.delete("/post/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE All Media
//successfully tested
router.delete("/media/:mediaId", async (req, res) => {
  try {
    await Post.deleteMany({ mediaId: req.params.mediaId });
    res.status(200).json("Posts has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
//successfully tested
router.get("/post/:id", async (req, res) => {
  //console.log("geldi")
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
//successfully tested
router.get("/allPosts/:mediaId", async (req, res) => {
  try {
    console.log("medd");
    const post = await Post.find({ mediaId: req.params.mediaId });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL CATEGORY
//successfully tested
router.get("/allCategory/:category", async (req, res) => {
  try {
    const post = await Post.find({ category: req.params.category });
    console.log("category");
    res.status(200).json(post);
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

//GET EMBED ARRAY OF POST
router.get("/embed/:id", async (req, res) => {
  console.log(req.body);
  // console.log(req.params.id)
  try {
    const post = await Post.findOne({ postId: req.params.id });

    console.log(post);
    res.status(200).json(post.embedArray);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL EMBED ARRAY OF POSTS
router.get("/embed", async (req, res) => {
  try {
    const posts = await Post.find();
    const arr = posts.map((post) => [post._id, post.embedArray]);

    //console.log(arr);
    const options = {
      mode: "text",
      scriptPath: "../Model/",
      args: [arr],
    };
    let pyshell = new PythonShell("recoSimilar.py", options);
    pyshell.on("message", function (message) {
      console.log(message);
    });

    res.status(200).json(arr);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
//successfully tested
router.get("/", async (req, res) => {
  console.log("hii");
  try {
    const posts = await Post.find();
    const arr = posts.map((post) => [post._id, post.embedArray]);

    console.log(arr);

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
