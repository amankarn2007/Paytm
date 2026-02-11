import { Router } from "express";
const router = Router();
import { checkBalance } from "../controller/accountController.js";
import isLoggedIn from "../middleware/isLoggedIn.js";


router.get("/balance", isLoggedIn, checkBalance)

export default router;