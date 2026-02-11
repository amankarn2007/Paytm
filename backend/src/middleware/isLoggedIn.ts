import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config.js";

const isLoggedIn = async(req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    //console.log(authHeader);

    if (!authHeader) {
        return res.status(403).json({
            message: "Token missing or malformed"
        });
    }

    let token = authHeader;

    if(authHeader.startsWith("Bearer ")){
        //@ts-ignore
        token = authHeader.split(" ")[1]; //only token part
    }

    try{
        //@ts-ignore
        const decoded = await jwt.verify(token, JWT_SECRET);

        if(decoded) {
            //@ts-ignore
            req.userId = decoded.userId; //for use in controllers
            next();

        } else {
            return res.status(403).json({})
        }

    } catch(err) {
        console.log("auth midd failed", err);
        return res.status(403).json({
            message: "Error in token verifying"
        });
    }

}

export default isLoggedIn;