import { Router } from "express";
const router = Router();
import { checkBalance, transferMoney } from "../controller/accountController.js";
import isLoggedIn from "../middleware/isLoggedIn.js";


router.get("/balance", isLoggedIn, checkBalance)

router.post("/transfer", isLoggedIn, transferMoney)

export default router;