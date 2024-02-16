import { BannerModel } from "../../model/bannerSchema.js";
import cloudinaryConfig from '../../cloudinaryConfig.js';
import fs from "fs";

export const addBanner = async (req, res, next) => {
    try {
        const { name, image } = req.body
        const { photos } = req.query
        console.log(photos, '++++++++++')
        const isDuplicate = await BannerModel.findOne({ name: name.toUpperCase() })
        if (!isDuplicate) {

            const createBanner = await BannerModel.create({
                name: name.toUpperCase(),
                image: image.url,
                image_public_id: image?.publicId, // cloudinary image public id
                date: Date.now()
            })
            console.log('Banner created successfully')
            res.json({ success: true })

        } else {
            res.json({ success: false, message: 'Duplicate entry for name' })
        }

    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: 'something went wrong' })

    }
}



export const editBanner = async (req, res, next) => {
    try {
        const { name, image } = req.body
        // const image = req.file
        const { id } = req.query
        console.log(name.toUpperCase(), req.body, id, 'hellllooooooo')

        const isDuplicate = await BannerModel.findOne({ name: name.toUpperCase(), _id: { $ne: id } })

        if (!isDuplicate) {

            // if (image) {
            const previousData = await BannerModel.findOne({ _id: id })
            if (previousData.image_public_id) {

                const removePreviousImage = await cloudinaryConfig.cloudinary.uploader.destroy(previousData.image_public_id)
            }
            // const uploadedResults = await cloudinaryConfig.cloudinary.uploader.upload(image.path)

            // const imgUrls = uploadedResults.secure_url
            // fs.unlinkSync(image.path);

            const updateBanner = await BannerModel.findOneAndUpdate({ _id: id }, { $set: { name: name.toUpperCase(), image: image.url, image_public_id: image.publicId } })
            // } else {
            //     const updateBanner = await BannerModel.findOneAndUpdate({ _id: id }, { $set: { name: name.toUpperCase() } })

            // }

            console.log('Banner updated successfully')
            res.json({ success: true })

        } else {
            res.json({ success: false, message: 'Duplicate entry for name' })

        }


    }
    catch (err) {
        console.log(err)
    }
}


export const deleteBanner = async (req, res, next) => {
    try {
        const { id } = req.query
        const previousData = await BannerModel.findOne({ _id: id })
        const removePreviousImage = await cloudinaryConfig.cloudinary.uploader.destroy(previousData.image_public_id)
        console.log(previousData, '2222222222222222222222', removePreviousImage)
        const deleteBanner = await BannerModel.findByIdAndDelete({ _id: id })
        console.log('Banner deleted successfully ')
        res.json({ success: true })

    } catch (error) {
        console.log(error)
    }
}


export const getBanner = async (req, res, next) => {
    try {
        const bannersList = await BannerModel.find().sort({ date: -1 })

        console.log('BannerList fetched successfully')
        res.json({ success: true, fetchedData: bannersList })
    } catch (error) {
        console.log(error)

    }
}


export const bannerById = async (req, res, next) => {
    try {
        const { id } = req.query
        const banner = await BannerModel.findOne({ _id: id })

        console.log('BannerList get by id successfully done')
        res.json({ success: true, fetchedData: banner })
    } catch (error) {
        console.log(error)

    }
}

