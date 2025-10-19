import express from 'express';
import { getAllCourses, addCourse } from '../controllers/courseController.js';
import verifyToken from '../middlewares/validateToken.js';

const router = express.Router();

router.get('/get-course', verifyToken, getAllCourses);
router.post('/add-course', verifyToken, addCourse);

export default router;