import express from "express";
import {body} from "express-validator";
import { logout, profile, userLogin, userSignUp, updateProfile, checkAuth } from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.post("/signup",
    body("email","Email is required").notEmpty(),
    body("email","Email is not valid").isEmail(),
    body("fullName","Full name is required").notEmpty(),
    body("password","Password is required").notEmpty(),
    body("password","Password must be at least 6 characters").isLength({min:6}),
    userSignUp);
router.post("/login",
    body("email","Email is required").notEmpty(),
    body("password","Password is required").notEmpty(),
    body("password","Password must be at least 6 characters").isLength({min:6})
    ,userLogin);
router.get("/profile", auth, profile);
router.post("/logout", logout);

router.put("/update-profile",auth, updateProfile); 
router.get("/check",auth,checkAuth);

export default router;