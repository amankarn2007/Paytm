import mongoose, { Schema } from "mongoose";

const userSchema = new Schema ({
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        //minLength: 6,
        maxLength: 20,
    },
    password: {
        type: String,
        required: true,
        //minLength: 6
    }

})

export const userModel = mongoose.model("User", userSchema);