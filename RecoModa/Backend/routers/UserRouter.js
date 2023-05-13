//Tarık

import User from "../models/User.js";
import Media from "../models/Media.js";
import MediaProfile  from "../models/MediaProfile.js";
import bcrypt from "bcryptjs";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "./verifyToken.js";

import express from "express";

const router = express.Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(
      req.body.password,
      process.env.PASSWORD_HASH
    );
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
//successfully tested

router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/findname/:username", async (req, res) => {
  try {
    console.log(req.params.username)
    const user = await User.findOne({username : req.params.username});
    console.log(user.username)
    const { password, ...others } = user._doc;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
//successfully tested
router.get("/all", async (req, res) => {

  console.log("get all");
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Successfully tested
router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { username, password, phoneNumber, email , weight, height, gender, clothingSize, shoeSize} = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      weight, 
      height, 
      gender, 
      clothingSize, 
      shoeSize
    });
    
    const userId  = createdUser._id;
    console.log(userId)
    const userMedia = await Media.create(
      {
        userId,
      }
    )
    const userMediaProfile = await MediaProfile.create(
      {
        userId,
      }
    )
    console.log(userMediaProfile)
    return res
      .status(201)
      .json({ user: createdUser, message: "you are successfully registered" });
  } catch (error) {
    console.log(error);
    return res.json({ message: "create user failed" });
  }
});

export default router;
