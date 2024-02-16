import { TestimonialModel } from "../../model/testimonialSchema.js"




export const addTestimonial = async (req, res, next) => {
    try {
        const { user, message } = req.body
        const createTestimonial = await TestimonialModel.create({
            user: user.toUpperCase(),
            message: message,
            date: Date.now()
        })
        console.log('Testimonial created successfully')
        res.json({ success: true })

    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: 'something went wrong' })

    }
}


export const editTestimonial = async (req, res, next) => {
    try {
        const { user, message } = req.body
        const { id } = req.query
        const updateTestimonial = await TestimonialModel.findOneAndUpdate({ _id: id }, {
            $set: {
                user: user.toUpperCase(),
                message: message,
            }
        })
        console.log('Testimonial updated successfully')
        res.json({ success: true })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: 'something went wrong' })

    }
}



export const getTestimonial = async (req, res, next) => {
    try {
        const testimonialList = await TestimonialModel.find().sort({ date: -1 })

        console.log('Testimonial List fetched successfully')
        res.json({ success: true, fetchedData: testimonialList })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'something went wrong' })
    }
}

export const deleteTestimonial = async (req, res, next) => {
    try {
        const { id } = req.query
        const deleteTestimonial = await TestimonialModel.findByIdAndDelete({ _id: id })

        console.log('Testimonial deleted successfully ')
        res.json({ success: true })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'something went wrong' })
    }
}


export const testimonialById = async (req, res, next) => {
    try {
        const { id } = req.query
        const testimonial = await TestimonialModel.findOne({ _id: id })

        console.log('Property get by id successfully done', testimonial)
        res.json({ success: true, fetchedData: testimonial })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'something went wrong' })

    }
}