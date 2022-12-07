import express from "express";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const router = express.Router()

router.post("/login", async (req,res)=>{
    User.findOne({ username: req.body.username }).then(user => {
        //No user found
        
        if (!user) {
            console.log("NO USER");
            return res.status(401).send({
                success: false,
                message: "Could not find the user"
            })
            
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).send({
                success: false,
                message: "Incorrect password"
            })
        }

        const payload = {
            username: user.username,
            role: user.role,
            id: user._id
        }
        
        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" })
        return res.status(200).send({
            success: true,
            message: "Logged in successfully",
            token: "Bearer " + token,
            user : user,
            role: user.role
        })
    })
});

export default router;