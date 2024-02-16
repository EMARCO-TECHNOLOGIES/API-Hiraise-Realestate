import { Schema, model } from "mongoose";

const testimonialSchema = new Schema({
    user: String,
    message: String,
    date: Date
})

export const TestimonialModel = model('Testimonial', testimonialSchema);

