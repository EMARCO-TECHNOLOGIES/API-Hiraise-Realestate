import { Router } from 'express';
import { addBanner, bannerById, deleteBanner, editBanner, getBanner } from '../controller/adminController/bannerController.js'
import { upload, uploadMultiple } from "../middlewares/multer.js";
import { PropertyById, addPhoto, addProperty, deleteProperty, editProperty, getProperty, removePhoto } from '../controller/adminController/propertyController.js';
import { addTestimonial, deleteTestimonial, editTestimonial, getTestimonial, testimonialById } from '../controller/adminController/testimonialController.js';
import { loginAdmin, registerAdmin } from '../controller/adminController/adminController.js';
import { addBlog, blogById, deleteBlog, editBlog, getBlog } from '../controller/adminController/blogController.js';

var router = Router();


router.post('/register', registerAdmin)
router.post('/login', loginAdmin)

router.get('/banner', getBanner);
router.post('/addBanner', addBanner)
router.post('/editBanner', editBanner)
router.delete('/deleteBanner', deleteBanner)
router.get('/bannerById', bannerById)

router.get('/property', getProperty);
router.post('/addProperty', addProperty)
router.post('/editProperty', upload, uploadMultiple, editProperty)
router.delete('/deleteProperty', deleteProperty)
router.get('/propertyById', PropertyById)

router.get('/testimonial', getTestimonial);
router.post('/addTestimonial', upload, addTestimonial)
router.post('/editTestimonial', upload, editTestimonial)
router.delete('/deleteTestimonial', deleteTestimonial)
router.get('/testimonialById', testimonialById)

router.get('/blog', getBlog);
router.post('/addBlog', upload, addBlog)
router.post('/editBlog', upload, editBlog)
router.delete('/deleteBlog', deleteBlog)
router.get('/blogById', blogById)

router.post('/uploadPhoto', upload, addPhoto)
router.post('/removePhoto', removePhoto)



export default router;
