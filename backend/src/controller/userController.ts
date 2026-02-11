import type { Request, Response } from "express";
import { userModel } from "../model/userModel.js";
import bcrypt from "bcrypt"

export async function signupUser(req: Request, res: Response) {

    const { firstname, lastname, username, password } = req.body;

    try {

        const findUser = await userModel.findOne({ username: username });
        if (findUser) {
            return res.json({
                message: "user already exists"
            })
        }

        const salt = await bcrypt.genSalt(7);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            firstname,
            lastname,
            username,
            password: hashedPassword,
        })
        //console.log(user);

        res.status(201).json({
            message: "User created successfully",
            user
        })

    } catch (err) {
        res.json({
            message: "Error in signup endpoint"
        })
        console.log("Error in signup endpoint", err);
    }
}

export async function signinUser(req: Request, res: Response) {
    const {username, password} = req.body;

    try{
        const user = await userModel.findOne({username: username})
        //console.log(user);

        if(!user){
            return res.status(401).json({
                message: "can't find user",
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            return res.status(201).json({
                message: "successfully signed in",
            })
        }

        res.json({
            status: 400,
            message: "incorrect password",
        })

    } catch(err) {
        res.json({
            message: "Error in signin endpoint",
        })
        console.log("Error in signin endpoint", err);
    }
}

export async function updateUser(req: Request, res: Response) {
    const { firstname, lastname, username, password } = req.body;

    try{
        const user = await userModel.findOne({username: username});
        if(!user){
            return res.status(401).json({
                message: "can't find user",
            })
        }

        const updateData: any = {};

        if(firstname) updateData.firstname = firstname;

        if(lastname) updateData.lastname = lastname;
        
        if(password){
            const salt = await bcrypt.genSalt(6);
            const hash = await bcrypt.hash(password, salt);

            updateData.password = hash;
        }

        const updateUser = await userModel.findByIdAndUpdate(
            user._id,
            updateData,
            { new: true }
        )
        //console.log(updateUser);

        res.status(200).json({
            message: "successfully updates",
            updateUser,
        })

    } catch(err) {
        res.json({
            message: "Error in update endpoint"
        })
        console.log("Error in update endpoint")
    }

}