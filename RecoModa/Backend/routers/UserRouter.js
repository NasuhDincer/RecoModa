//Zulal

import express from "express";
import mongoose from "mongoose";
import User from '../models/User.js';

const router = express.Router();

// localhost:5000/users 'a yapılan post isteği
router.post("/signup", async (req, res)=>{
    try {
        //console.log(req.body)
        const { username, email, password, phoneNumber, userType, role, favoriteProductList } = req.body;
        
        const userExists = await User.findOne({ email })
        if(userExists)
            return res.status(400).json({ message: 'User already exists.'})

        const createdUser = await User.create({
            username, 
            email, 
            password, 
            phoneNumber, 
            userType, 
            role, 
            favoriteProductList
        })

        return res.status(201).json(createdUser);
    } catch (error) {
        console.log(error)
        return res.json({message: "create user failed"})
    }
})

// localhost:5000/users/signin POST request
router.post("/signin", async (req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user)
            return res.status(400).json({message: "user does not exist"})
        
        const isPasswordCorrect = await compare(password, user.password)
        if(!isPasswordCorrect)
            return res.status(400).json({message: "Wrong Password"})
        
        return res.status(200).json({ user, message: 'Authentication successful' })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

export default router;