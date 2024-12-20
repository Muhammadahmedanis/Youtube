import express, { Router } from 'express';
import { signup, signin, googleAuth, logout } from '../Server/controllers/auth.js';

const authRouter = express.Router();

// Create A user
authRouter.post("/signup", signup);

// SIGN IN
authRouter.post("/signin", signin);

// Google
authRouter.post("/google", googleAuth);

// SIGNOUT
authRouter.post("/logout", logout)
export default authRouter;