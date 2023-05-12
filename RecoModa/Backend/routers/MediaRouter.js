//Tarık
import Media from "../models/Media.js";
import { PythonShell } from "python-shell";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "./verifyToken.js";

import express from "express";

const router = express.Router();

//GET MEDIA

router.get("/mediaUser/:id", async (req, res) => {
  try {
    const media = await Media.find({userId : req.params.id});
    res.status(200).json(media);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/media/:id", async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    res.status(200).json(media);
  } catch (err) {
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

router.put("/addLike/:id", async (req, res) => {
  //console.log(req.body);
  // console.log(req.params.id)
  try {
    const media = await Media.findById(req.params.id);
    console.log(media);
    var isLike = true;
    var likeArr = media.favoritePostList;
    console.log("post id : ",req.body.postId);
    console.log("likeArr : ",media.favoritePostList);
    likeArr.forEach((element) => {
      if (element == req.body.postId) isLike = false;
    });

    console.log(isLike);

    if (isLike) {
      likeArr.push(req.body.postId);
      console.log(likeArr);

      const updateMedia = await Media.findByIdAndUpdate(
        req.params.id,
        {
          $set: { favoritePostList: likeArr },
        },
        { new: true }
      );
      console.log(updateMedia.favoritePostList);
      res.status(200).json(updateMedia.favoritePostList);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/homePage/:id", async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    var favList = media.favoritePostList;
    var output = []
   // for (var i = 0; i < 1; i++) {
      const options = {
        mode: "text",
        scriptPath: "../Model/",
        args: [favList[0]],
      };
      console.log(favList[0])
      let pyshell = new PythonShell("recoSimilar.py", options);
      pyshell.on("message", function (message) {
        console.log(message);
        output[0] = message;
       
      });
 //   }
    console.log(output);
    console.log(updateMedia.favoritePostList);
    res.status(200).json(updateMedia.favoritePostList);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
