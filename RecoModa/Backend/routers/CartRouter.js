//Tarık

import Cart from "../models/Cart.js";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "./verifyToken.js";

import express from "express";

const router = express.Router();

/*
CREATE CART
 After a successful sign up, the unique cart of the user will be created. 
*/
router.post("/", async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    //console.log("I TRY")
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE CART
//successfully tested
router.put("/:id", async (req, res) => {
  console.log(req.body);
  // console.log(req.params.id)
  try {
 
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.params.id },
      {
        $set: req.body,
      },
      { new: true }
    );
    console.log("Güncelledi");
    console.log(updatedCart);
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE CART
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
//successfully tested
router.get("/find/:userId", async (req, res) => {
  //console.log("geldi")
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
//successfully tested
router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
