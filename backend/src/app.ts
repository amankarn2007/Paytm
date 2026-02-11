import express from "express";
const app = express();
import "./config/dbConnection.js"; //db connection
import { userModel } from "./model/userModel.js";
import bcrypt from "bcrypt"

app.use(express.json());

app.get("/", (req, res) => {
    res.send("working");
})

app.post("/signup", async (req, res) => {
    const {firstname, lastname, username, password} = req.body;
    
    try{

        const findUser = await userModel.findOne({username: username});
        if(findUser){
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

    } catch(err) {
        console.log("Error in signup endpoint", err);
    }
})


app.post("/signin", async (req, res) => {
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
        console.log("Error in signin endpoint");
    }
})





app.listen(3000, () => {
    console.log("listning on port 3000");
})