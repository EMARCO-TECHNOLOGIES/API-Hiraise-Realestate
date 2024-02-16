import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    title: String,
    image: String,
    image_public_id: String,
    content: String,
    date: Date
})

export const blogModel = model('Blog', blogSchema);
