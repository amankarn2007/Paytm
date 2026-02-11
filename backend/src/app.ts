import express from "express";
const app = express();
import "./config/dbConnection.js"; //db connection
import userRouter from "./routes/userRouter.js"


app.use(express.json());

app.get("/", (req, res) => {
    res.send("working");
})

app.use("/user", userRouter);



app.listen(3000, () => {
    console.log("listning on port 3000");
})