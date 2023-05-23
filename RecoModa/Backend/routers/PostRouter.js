//Tarık
import bodyParser from "body-parser";
import fs from "fs";
import multer from "multer";
import Post from "../models/Post.js";
import path from "path";
import { createCanvas, Image } from "canvas";
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

const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "process");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const upload2 = multer({ storage: storage2 });

router.post("/process", upload2.single("images"), (req, res) => {
  try{
    console.log("reqF : ", req.file.path)
    const imageData = fs.readFileSync(req.file.path);
    const img = new Image();
    console.log("X1:",imageData)
    img.src = imageData;
  
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext("2d");
  
    ctx.drawImage(img, 0, 0);
  
    const pixelData = ctx.getImageData(0, 0, img.width, img.height).data;
    const hexCounts = {};
  
    for (let i = 0; i < pixelData.length; i += 4) {
      const r = pixelData[i];
      const g = pixelData[i + 1];
      const b = pixelData[i + 2];
  
      const hex = `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
      hexCounts[hex] = hexCounts[hex] ? hexCounts[hex] + 1 : 1;
    }
  
    const sortedHexCounts = Object.entries(hexCounts).sort((a, b) => b[1] - a[1]);
    const topHexCounts = sortedHexCounts.slice(0, 15);
    const firstElements = topHexCounts.map(([firstElement]) => firstElement);
    console.log(firstElements);
    res.status(200).json(firstElements);
  }catch (err) {
    res.status(500).json(err);
  }
  
});

router.post("/upload", upload.single("images"), (req, res) => {
  console.log("req : ", req.body)
  console.log("reqF : ", req.file)
  const saveImage = Post({
    mediaId: req.body.mediaId,
    description: req.body.description,
    likeList: req.body.likeList,
    category: req.body.category,
    commentList: req.body.commentList,
    img: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png",
    },
    productInfo : req.body.productInfo
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
        //console.log(results);
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
    console.log("AKSDDDD")
    console.log(updatedPost.likeList);
    var isLike = true;
    var likeArr = updatedPost.likeList;
    console.log(req.body.userId);
    likeArr.forEach((element) => {
      if (element == req.body.userId) isLike = false;
    });
    console.log("likearr", likeArr)

    console.log(isLike);

    if (isLike) {
      likeArr.push(req.body.userId);
      console.log(likeArr);

      const updatePost = await Post.findByIdAndUpdate(
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
    likeArr.forEach((element, index) => {
      if (element == req.body.postId) {
        isLike = false;
        likeArr.splice(index, 1); // Remove the liked post from the array
      }
    });

    console.log(isLike);

    if (isLike) {
      likeArr.remove(req.body.userId);
      console.log(likeArr);

      const updatePost = await Post.findByIdAndUpdate(
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
  // console.log(req.body);
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
router.get("/findSimilar/:id", async (req, res) => {

  try {
    console.log(req.params.id)
    var count = 2;
    var output = null;
    const options = {
      mode: "text",
      scriptPath: "../Model/",
      args: [req.params.id, count],
    };
    let pyshell = new PythonShell("recoSimilar.py", options);
    pyshell.on("message", function (message) {
      console.log(message);
      output = message.replace(/'/g, '"');
      console.log(output);
      res.status(200).json(JSON.parse(output));
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/cameraSimilar", upload2.single("images"), (req, res) => {
  try{
    //console.log("reqF : ", req.file.path)
    const imageData = fs.readFileSync(req.file.path);
   
    const options = {
      mode: "text",
      scriptPath: "../Model/",
      args: [imageData],
    };
    let pyshell = new PythonShell("camerasimilar.py", options);
    pyshell.on("message", function (message) {
      console.log(message);
      output = message.replace(/'/g, '"');
      console.log(output);
      res.status(200).json(JSON.parse(output));
    });
  }catch (err) {
    res.status(500).json(err);
  }
  
});

//GET ALL EMBED ARRAY OF POSTS
router.get("/embed", async (req, res) => {
  try {
    const options = {
      mode: "text",
      scriptPath: "../Model/",
      args: "[arr_str]",
    };
    let pyshell = new PythonShell("recoSimilar.py", options);
    pyshell.on("message", function (message) {
      console.log(message);
    });
    
    res.status(200).json("");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/search/:searchString", async (req, res) => {
  const searchString = req.params.searchString; // Assuming the search string is passed as a query parameter "q"

  try {
    // Perform the search query using the User model
    const searchResults = await Post.find({
      description: { $regex: searchString, $options: "i" },
    });

    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during the search." });
  }
});
//GET ALL
//successfully tested
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    const arr = posts.map((post) => [post._id, post.embedArray]);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
