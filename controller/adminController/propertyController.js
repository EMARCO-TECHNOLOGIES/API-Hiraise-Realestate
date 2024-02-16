import cloudinaryConfig from "../../cloudinaryConfig.js";
import { BannerModel } from "../../model/bannerSchema.js";
import { blogModel } from "../../model/blogSchema.js";
import { propertyModel } from "../../model/propertySchema.js";
import fs from "fs";



export const getProperty = async (req, res, next) => {
    try {
        const propertyList = await propertyModel.find().sort({ date: -1 })

        console.log('Property List fetched successfully')
        res.json({ success: true, fetchedData: propertyList })
    } catch (error) {
        console.log(error)

    }
}


export const addPhoto = async (req, res) => {
    try {
        const image = req.file
        const images = req.files
        console.log(images)
        cloudinaryConfig.cloudinary.uploader.upload(image.path).then((response) => {
            const imageUrl = { url: response.secure_url, public_id: response.public_id };
            console.log('Photo uploaded Successfully..')
            res.json({ success: true, imageUrl: imageUrl })

        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            fs.unlinkSync(image.path);

        })
    } catch (error) {
        console.log(error)
    }
}


export const removePhoto = async (req, res) => {
    try {
        console.log(req.body)
        const { publicId, itemId, route } = req.body
        console.log(publicId, itemId, route,)
        if (route === 'properties') {
            const document = await propertyModel.findOne({ _id: itemId })

            if (document?.photos?.length > 1) {

                const updatedPhotos = document.photos
                    .filter((item) => item.publicId !== publicId)
                    .map((item, i) => ({
                        ...item,
                        url: item.url
                    }));

                console.log(updatedPhotos, '++++++')
                // const removeFromCloudinary = await cloudinaryConfig.cloudinary.uploader.destroy(document.image_public_id)
                if (document.image_public_id) {

                    const removePreviousImage = await cloudinaryConfig.cloudinary.uploader.destroy(document.image_public_id)
                }
                await propertyModel.findOneAndUpdate({ _id: itemId }, {
                    $set: {
                        image: updatedPhotos[0]?.url,
                        image_public_id: updatedPhotos[0]?.publicId,
                        photos: updatedPhotos
                    }
                })
                console.log('Photo removed successfully..')
                res.json({ success: true })
            } else {
                res.json({ success: false, message: 'Only one photo contains' })

            }
        } else if (route === 'banner') {
            const document = await BannerModel.findOne({ _id: itemId })
            if (document.image_public_id) {

                const removePreviousImage = await cloudinaryConfig.cloudinary.uploader.destroy(document.image_public_id)
            }
            // const removeFromCloudinary = await cloudinaryConfig.cloudinary.uploader.destroy(document.image_public_id)
            await BannerModel.findOneAndUpdate({ _id: itemId }, {
                $set: {
                    image: null,
                    image_public_id: null,
                }
            })
            console.log('Photo removed successfully..')
            res.json({ success: true })
        } else {
            const document = await blogModel.findOne({ _id: itemId })
            if (document.image_public_id) {

                const removePreviousImage = await cloudinaryConfig.cloudinary.uploader.destroy(document.image_public_id)
            }
            // const removeFromCloudinary = await cloudinaryConfig.cloudinary.uploader.destroy(document.image_public_id)
            await blogModel.findOneAndUpdate({ _id: itemId }, {
                $set: {
                    image: null,
                    image_public_id: null,
                }
            })
            console.log('Photo removed successfully..')
            res.json({ success: true })
        }


    } catch (error) {
        console.log(error)
    }
}


export const addProperty = async (req, res) => {
    try {
        const { name, price, 'location / address': locationAddress, 'bed_space': bedSpace, toilets, sub_title } = req.body

        const { photos } = req.query
        console.log(req.body, '*******', req.files, photos)
        const isDuplicate = await propertyModel.findOne({ name: name.toUpperCase() })
        if (!isDuplicate) {

            const createProperty = await propertyModel.create({
                name: name.toUpperCase(),
                image: photos[0]?.url, // Use the first photo's URL as the image field
                image_public_id: photos[0]?.publicId,
                location: locationAddress,
                price: price,
                sub_title: sub_title,
                bed_space: bedSpace,
                toilet: toilets,
                date: Date.now(),
                photos: photos
            });

            console.log('Property created successfully');
            res.json({ success: true });

        } else {
            res.json({ success: false, message: 'Duplicate entry for name' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'something went wrong' })

    }
}



export const editProperty = async (req, res, next) => {
    try {
        const { name, price, 'location / address': locationAddress, sub_title, 'bed_space': bedSpace, toilet, image } = req.body
        const { id, photos } = req.query
        console.log(name.toUpperCase(), image, req.body, id, 'hellllooooooo', photos)

        const isDuplicate = await propertyModel.findOne({ name: name.toUpperCase(), _id: { $ne: id } })

        if (!isDuplicate) {

            if (photos) {
                const previousData = await propertyModel.findOne({ _id: id })
                const removePreviousImage = await cloudinaryConfig.cloudinary.uploader.destroy(previousData.image_public_id)

                const updateProperty = await propertyModel.findOneAndUpdate({ _id: id }, {
                    $set:
                    {
                        name: name.toUpperCase(),
                        image: photos[0]?.url,
                        image_public_id: photos[0]?.publicId,
                        location: locationAddress,
                        price: price,
                        sub_title: sub_title,
                        bed_space: bedSpace,
                        toilet: toilet,
                        photos: photos

                    }
                })

            } else {
                const updateProperty = await propertyModel.findOneAndUpdate({ _id: id }, {
                    $set: {
                        name: name.toUpperCase(),
                        location: locationAddress,
                        price: price,
                        sub_title: sub_title,
                        bed_space: bedSpace,
                        toilet: toilet,

                    }
                })

            }

            console.log('Property updated successfully')
            res.json({ success: true, message: 'Property updated successfully' })

        } else {
            res.json({ success: false, message: 'Duplicate entry for name' })

        }


    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: 'something went wrong' })

    }
}

export const deleteProperty = async (req, res, next) => {
    try {
        const { id } = req.query
        const previousData = await propertyModel.findOne({ _id: id })
        const removePreviousImage = await cloudinaryConfig.cloudinary.uploader.destroy(previousData.image_public_id)
        const deleteProperty = await propertyModel.findByIdAndDelete({ _id: id })
        console.log('Property deleted successfully ')
        res.json({ success: true })

    } catch (error) {
        console.log(error)
    }
}



export const PropertyById = async (req, res, next) => {
    try {
        const { id } = req.query
        const property = await propertyModel.findOne({ _id: id })

        console.log('Property get by id successfully done', property)
        res.json({ success: true, fetchedData: property })
    } catch (error) {
        console.log(error)

    }
}