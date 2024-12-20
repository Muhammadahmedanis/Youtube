// 401 you have no token
// 403  token not valid / user fir invalid data
// import jwt from "jsonwebtoken.js";
import { createError } from './error.js';
import jwt from 'jsonwebtoken'

export const verifyToken =  (req, res, next) => {
    const token = req.cookies.access_token;
    
    if(!token) return next(createError(401, "You are not authenticated!"));

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) return next(createError(403, "Token is invalid"));
        //  if not error so assign below userId in user 
        req.user = user;
        next();
    });
}