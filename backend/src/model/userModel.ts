import mongoose, { Schema } from "mongoose";

const userSchema = new Schema ({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }

})

export const userModel = mongoose.model("User", userSchema);