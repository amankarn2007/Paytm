import mongoose from "mongoose";

const URI = "mongodb://localhost:27017/paytm";

async function connectDb() {
    try{
        await mongoose.connect(URI, {
            auth: {
                username: "amanAdmin",
                password: "Backend@987"
            },
            authSource: "admin"
        })
        console.log("DB connected");
        
    } catch(err) {
        console.log("Error in connection DB");
    }
}

connectDb();

export default connectDb;