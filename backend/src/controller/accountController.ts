import type { Request, Response } from "express";
import { userModel } from "../model/userModel.js";
import { accountModel } from "../model/accountModel.js";


export const checkBalance = async(req: Request, res: Response) => {
    try{
        //@ts-ignore
        const userID = req.userId;
        console.log(userID);

        const user = await userModel.findById({_id: userID});
        console.log(user);

        const userAccount = await accountModel.findOne({userId: userID});

        console.log(userAccount);

        res.status(200).json({
            message: "balanced checked successfully",
            userAccount
        })

    } catch(err) {
        console.log("error in balance endpoint", ErrorEvent);
        res.status(400).json({
            messsage: "Error in balace check"
        })
    }

}