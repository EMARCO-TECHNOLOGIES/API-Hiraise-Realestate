import cloudinaryConfig from "../../cloudinaryConfig.js"
import { blogModel } from "../../model/blogSchema.js"
import fs from "fs";





export const getBlog = async (req, res, next) => {
    try {
        const blogList = await blogModel.find().sort({ date: -1 })

        console.log('Blog List fetched successfully')
        res.json({ success: true, fetchedData: blogList })
    } catch (error) {
        console.log(error)

    }
}


export const addBlog = async (req, res, next) => {
    try {
        const { title, content, image } = req.body
        // const image = req.file
        console.log(title, content, image)
        // cloudinaryConfig.cloudinary.uploader.upload(image.path).then(async (response) => {

        //     const imgUrls = response.secure_url
        const createBlog = await blogModel.create({
            title: title.toUpperCase(),
            image: image.url,
            image_public_id: image?.publicId,
            content: content,
            date: Date.now()
        })
        console.log('Blog created successfully')
        res.json({ success: true, message: 'Property created successfully' })
        // }).catch((error) => {
        //     console.log(error)
        //     res.json({ success: false, message: 'Please check your network connection' })
        // }).finally(() => {
        //     fs.unlinkSync(image.path);

        // })

    } catch (error) {
        console.log(error)
    }
}



export const editBlog = async (req, res, next) => {
    try {
        const { title, content, image } = req.body
        // const image = req.file
        const { id } = req.query
        console.log(id, title, content, image)
        // if (image) {
        const previousData = await blogModel.findOne({ _id: id })
        if (previousData.image_public_id) {

            const removePreviousImage = await cloudinaryConfig.cloudinary.uploader.destroy(previousData.image_public_id)
        }

        // const uploadedResults = await cloudinaryConfig.cloudinary.uploader.upload(image.path);
        // const imgUrls = uploadedResults.secure_url
        const updateBlog = await blogModel.findOneAndUpdate({ _id: id }, {
            $set:
            {
                title: title.toUpperCase(),
                image: image.url,
                image_public_id: image.publicId,
                content: content,
            }
        })
        // fs.unlinkSync(image.path);

        // } else {
        //     const updateProperty = await blogModel.findOneAndUpdate({ _id: id }, {
        //         $set: {
        //             title: title.toUpperCase(),
        //             content: content,
        //         }
        //     })
        //     console.log(updateProperty)

        // }

        console.log('Blog updated successfully')
        res.json({ success: true, message: 'Blog updated successfully' })




    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: 'something went wrong' })

    }
}


export const deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.query
        const previousData = await blogModel.findOne({ _id: id })
        if (previousData.image_public_id) {

            const removePreviousImage = await cloudinaryConfig.cloudinary.uploader.destroy(previousData.image_public_id)
        }
        const deleteBlog = await blogModel.findByIdAndDelete({ _id: id })

        console.log('Blog deleted successfully ')
        res.json({ success: true, message: 'Blog deleted successfully ' })

    } catch (error) {
        console.log(error)
    }
}


export const blogById = async (req, res, next) => {
    try {
        const { id } = req.query
        const blog = await blogModel.findOne({ _id: id })

        console.log('Blog get by id successfully done')
        res.json({ success: true, fetchedData: blog })
    } catch (error) {
        console.log(error)

    }
}