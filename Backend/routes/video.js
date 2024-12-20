import express from 'express';
import { addVideo, addView, getByTag, getVideo, random, search, sub, trend } from '../Server/controllers/video.js'
import { verifyToken } from '../verifyToken.js';
const  videoRouter = express.Router();

videoRouter.post("/", verifyToken, addVideo)
videoRouter.put("/:id", verifyToken, addVideo)
videoRouter.delete("/:id", verifyToken, addVideo)
videoRouter.get("/find/:id", getVideo)
videoRouter.get("/view/:id", addView)
videoRouter.get("/trend", trend)
videoRouter.get("/random", random)
videoRouter.get("/sub", verifyToken, sub)
videoRouter.get("/tags", getByTag)
videoRouter.get("/search", search)


export default videoRouter;