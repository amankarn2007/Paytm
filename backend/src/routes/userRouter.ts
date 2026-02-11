import { Router } from "express";
import { signinUser, signupUser, updateUser } from "../controller/userController.js";
const router = Router();

router.post("/signup", signupUser)

router.post("/signin", signinUser)

router.post("/update", updateUser)

export default router;