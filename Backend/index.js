import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import userRouter from './routes/users.js';
import videoRouter from './routes/video.js';
import commentRouter from './routes/comments.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

const connect = async () => {
    try {
        const dbConnection = await mongoose.connect(process.env.MONGO_URI);
        console.log("connected db");
    } catch (error) {
        console.log(error);
    }
}

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comments", commentRouter);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connect();
    console.log("Server running");
})