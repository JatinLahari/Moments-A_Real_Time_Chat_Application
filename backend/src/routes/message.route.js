import express from "express";
import { auth } from "../middleware/auth.js";
import { userForSideBar, getMessages, sendMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", auth, userForSideBar);
router.get("/:id",auth,getMessages);
router.post("/send/:id", auth,sendMessages);
export default router;