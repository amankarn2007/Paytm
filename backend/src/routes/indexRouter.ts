import { Router } from "express";
const router = Router();
import userRouter from "./userRouter.js";
import accountRouter from "./accountRouter.js"


router.use("/user", userRouter); //handle user queries

router.use("/account", accountRouter); //handle account queries

export default router;