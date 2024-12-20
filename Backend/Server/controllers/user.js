import { createError } from "../../error.js";
import User from '../models/User.js';
import Video from '../models/Video.js';

export const updated = async(req, res, next) => {
    if(req.params.id === req.user.id){
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },
            { new: true }
        )
            res.status(200).json(updateUser)
        } catch (err) {
            next(err)
        }
    } else{
        return next(createError(403, "You can update only your account"))
    }
}


export const deleted = async(req, res, next) => {
    if(req.params.id === req.user.id){
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted");
        } catch (err) {
            next(err)
        }
    } else{
        return next(createError(403, "You can delete only your account"))
    }
}


export const getUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        console.log(user);
        res.status(200).json(user);
    } catch (err) {
        next(err)
    }
}

// req.user.id is a jwt token it user id
export const subscribe = async(req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push:{subscribedUsers: req.params.id} // other channel user id   jin channel ko mena sunbscribe kia ha unchannel ki id ha
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc:{ subscribers: 1 },
        });
        res.status(200).send("Subscription successfull.");
    } catch (err) {
        next(err)
    }
}


export const unsubscribe = async(req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull:{subscribedUsers: req.params.id} // other channel user id   jin channel ko mena sunbscribe kia ha unchannel ki id ha
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc:{ subscribers: -1 },
        });
        res.status(200).send("Unsubscription successfull.");
    } catch (err) {
        next(err)
    }
}


export const like = async(req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId; 
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet:{likes:id},
            $pull:{disLikes:id},
        });
        res.status(200).json("The video has been liked");
    } catch (err) {
        next(err)
    }
}


export const unlike = async(req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId; 
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet:{disLikes:id},
            $pull:{likes:id},
        });
        res.status(200).json("The video has been unliked");
    } catch (error) {
        
    }
}
