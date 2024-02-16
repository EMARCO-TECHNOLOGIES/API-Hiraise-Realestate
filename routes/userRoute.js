import { Router } from 'express';
import { getBanner } from '../controller/adminController/bannerController.js';
import { PropertyById, getProperty } from '../controller/adminController/propertyController.js';
import { getBlog } from '../controller/adminController/blogController.js';
import { getTestimonial } from '../controller/adminController/testimonialController.js';
var router = Router();

router.get('/banner', getBanner)
router.get('/property', getProperty)
router.get('/propertyById', PropertyById)
router.get('/blog', getBlog);
router.get('/testimonial', getTestimonial);

export default router;
