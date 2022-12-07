import express from 'express';
import dotenv from 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoute from "./routers/UserRouter.js";
import authRoute from "./routers/AuthRouter.js";
import authRoute from "./routers/CartRouter.js";


const app = express();

const PORT = process.env.PORT || 5000;

const connection_url =  "mongodb+srv://tarik:" + process.env.MONGO_PASSWORD + "@cluster0.ymimfnq.mongodb.net/RecoModa?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log("Error on mongodb connect")
        throw err;
    }
    console.log("Mongoose is connected");
});
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});
app.use(cors({
    credentials: false,
    origin: "*"
}));

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/cart", cartRoute);

app.listen(PORT,()=>{
    console.log(`Example app listening on port ${PORT}`)
})