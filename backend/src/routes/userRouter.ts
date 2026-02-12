import { Router } from "express";
import { bulkFilter, logoutUser, signinUser, signupUser, updateUser } from "../controller/userController.js";
const router = Router();

router.post("/signup", signupUser);

router.post("/signin", signinUser);

router.post("/logout", logoutUser);

router.post("/update", updateUser);

router.get("/bulk", bulkFilter); // to filter users

export default router;