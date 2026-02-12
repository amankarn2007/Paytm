import mongoose from "mongoose";

//const URI = "mongodb://localhost:27017/paytm";
const MONGO_ATLAS = "mongodb+srv://amankarn187_db_user:iPdgLZHEudAyQy8F@cluster0.dzuydvk.mongodb.net/?appName=Cluster0";;

//async function connectDb() {
//    try{
//        await mongoose.connect(URI, {
//            auth: {
//                username: "amanAdmin",
//                password: "Backend@987"
//            },
//            authSource: "admin"
//        })
//        console.log("DB connected");
        
//    } catch(err) {
//        console.log("Error in connection DB");
//    }
//}

async function connectDb() {
    try{
        await mongoose.connect(MONGO_ATLAS)
        console.log("DB connected");
        
    } catch(err) {
        console.log("Error in connection DB");
    }
}

connectDb();

export default connectDb;