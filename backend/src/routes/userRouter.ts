import { Router } from "express";
import { bulkFilter, signinUser, signupUser, updateUser } from "../controller/userController.js";
const router = Router();

router.post("/signup", signupUser);

router.post("/signin", signinUser);

router.post("/update", updateUser);

router.get("/bulk", bulkFilter); // to filter users

export default router;