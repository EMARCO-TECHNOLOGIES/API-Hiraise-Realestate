import { Schema, model } from "mongoose";

const propertySchema = new Schema({
    name: String,
    image: String,
    image_public_id: String,
    price: String,
    location: String,
    sub_title: String,
    bed_space: Number,
    toilet: Number,
    date: Date,
    photos: Array

})

export const propertyModel = model('Property', propertySchema);
