

export const getBanner = async (req, res, next) => {
    try {
        const bannersList = await BannerModel.find().sort({ date: -1 })

        console.log('BannerList fetched successfully')
        res.json({ success: true, fetchedData: bannersList })
    } catch (error) {
        console.log(error)

    }
}