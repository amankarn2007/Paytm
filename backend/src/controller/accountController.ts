import type { Request, Response } from "express";
import { accountModel } from "../model/accountModel.js";
import mongoose from "mongoose";


export const checkBalance = async(req: Request, res: Response) => {
    try{
        //@ts-ignore
        const userID = req.userId;
        //console.log(userID);

        const userAccount = await accountModel.findOne({userId: userID});
        //console.log(userAccount);

        if(!userAccount) {
            return res.status(401).json({
                message: "Account not found",
            })
        }

        res.status(200).json({
            message: "balanced checked successfully",
            balance: userAccount.balance
        })

    } catch(err) {
        console.log("error in balance endpoint", err);
        res.status(400).json({
            message: "Error in balance check"
        })
    }
}

export const transferMoney = async(req: Request, res: Response) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    //@ts-ignore
    const userId = req.userId; //sender's user id

    //sender's account
    const account = await accountModel.findOne({userId: userId}).session(session); 

    if(!account || account.balance < amount) {
        await session.abortTransaction();

        return res.status(400).json({
            message: "Insufficient Balance",
        })
    }

    //receiver's account
    const toAccount = await accountModel.findOne({userId: to}).session(session);

    if(!toAccount) {
        await session.abortTransaction();

        return res.status(400).json({
            message: "Invalid account",
        })
    }

    await accountModel.findOneAndUpdate( //decrease amnt from sender's account
        { userId: userId },
        { $inc: {balance: -amount} }
    ).session(session)

    await accountModel.findOneAndUpdate( //increase amnt from receiver's account
        { userId: to },
        { $inc: { balance: amount } } 
    ).session(session)

    await session.commitTransaction();

    res.json({
        message: "transaction successfully",
    })
}