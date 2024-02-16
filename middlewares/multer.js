import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
        console.log(file.originalname, '****************', file)
    }

})

export const upload = multer({ storage: storage }).single('image')

export const uploadMultiple = multer({ storage: storage }).array("images")