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
    likeArr.forEach((element, index) => {
      if (element == req.body.postId) {
        isLike = false;
        likeArr.splice(index, 1); // Remove the liked post from the array
      }
    });
    console.log("newlikeArr", likeArr)
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

// Define the route for handling the follow request
router.put("/follow/:id", async (req, res) => {
  const { id } = req.params; // takip ettiğin kisi
  const { userId } = req.body; // sen


  try {
    // Find the media document with the given id
    const personWillBeFollowed = await Media.findOne({ userId: id });
    const me = await Media.findOne({ userId: userId });

    if (!personWillBeFollowed) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user is already following
    if (personWillBeFollowed.followerList.includes(userId)) {
      return res.status(400).json({ error: "You are already following this user" });
    }

    // Check if the userId is already in followedList
    if (!personWillBeFollowed.followedList.includes(userId)) {
      // Add the userId to the followedList array
      personWillBeFollowed.followedList.push(userId);
      me.followerList.push(id)
    }

    // Add the userId to the followerList array
    personWillBeFollowed.followerList.push(userId);
    me.followedList.push(id)
    // Save the updated personWillBeFollowed document
    await personWillBeFollowed.save();
    await me.save();

    res.json({ message: "Successfully followed the user" });
  } catch (error) {
    console.log("Error following user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/unfollow/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    // Find the media document with the given id
    const personWillBeFollowed = await Media.findOne({ userId: id });
    const me = await Media.findOne({ userId: userId });

    if (!personWillBeFollowed) {
      return res.status(404).json({ error: "Media not found" });
    }

    // Check if the user is already following
    if (!personWillBeFollowed.followerList.includes(userId)) {
      return res.status(400).json({ error: "You are not following this user" });
    }

    // Remove the userId from the followedList array
    personWillBeFollowed.followedList = personWillBeFollowed.followedList.filter((followedId) => followedId !== userId);
    me.followerList = me.followerList.filter((followerId) => followerId !== id);
    // Remove the userId from the followerList array
    personWillBeFollowed.followerList = personWillBeFollowed.followerList.filter((followerId) => followerId !== userId);
    me.followedList = me.followedList.filter((followedId) => followedId !== id);
    // Save the updated media document
    await personWillBeFollowed.save();
    await me.save();

    res.json({ message: "Successfully unfollowed the user" });
  } catch (error) {
    console.log("Error unfollowing user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
