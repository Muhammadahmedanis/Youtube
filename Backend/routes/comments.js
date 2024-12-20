import express from 'express';
import { addComment, deleteComment, getComments } from '../Server/controllers/comment.js'
import {verifyToken} from '../verifyToken.js'
const commentRouter = express.Router();

commentRouter.post("/", verifyToken, addComment);
commentRouter.delete("/:id", verifyToken, deleteComment);
commentRouter.get("/:videoId", verifyToken, getComments);

export default commentRouter;