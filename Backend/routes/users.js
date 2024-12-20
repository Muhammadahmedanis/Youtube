import express from 'express';
import { deleted, getUser, like, subscribe, unlike, unsubscribe, updated } from '../Server/controllers/user.js';
import { verifyToken } from '../verifyToken.js';

const userRouter = express.Router();

// update user
userRouter.put("/:id", verifyToken, updated);

// delete user
userRouter.delete("/:id", verifyToken, deleted);

// get a user
userRouter.get("/find/:id", getUser)

// subscribe a user
userRouter.put("/sub/:id", verifyToken, subscribe)

// unsubscribe a user
userRouter.put("/unsub/:id", verifyToken, unsubscribe)

// like a video
userRouter.put("/like/:videoId", verifyToken, like)

// unlike a video
userRouter.put("/unlike/:videoId", verifyToken, unlike)

export default userRouter;