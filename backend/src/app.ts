import express from "express";
const app = express();
import "./config/dbConnection.js"; //db connection
import indexRouter from "./routes/indexRouter.js";
import cors from "cors";


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("working");
})

app.use("/api/v1", indexRouter);



app.listen(3000, () => {
    console.log("listning on port 3000");
})