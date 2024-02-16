import { Schema, model } from "mongoose";

const BannerSchema = new Schema({
    name: String,
    image: String,
    image_public_id: String,
    date: Date
})

export const BannerModel = model('Banner', BannerSchema);
