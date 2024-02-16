import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: String,
    password: String,
    date: Date,
    role: String
})

export const UserModel = model('User', userSchema)