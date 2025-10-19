import { fileURLToPath } from 'url';
import express from 'express';
import multer from 'multer';
import { uploadVideo, getVideos, getCourseProgress, updateVideoProgress } from '../controllers/videoController.js';
import verifyToken from '../middlewares/validateToken.js';
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, 'uploads/'); // where to store videos
  // },
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['video/mp4', 'video/webm', 'video/ogg'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

const upload = multer({ storage, fileFilter });

router.post('/upload', verifyToken, upload.single('video'), uploadVideo);
router.get('/get-videos', verifyToken, getVideos);
router.get('/course-progress', verifyToken, getCourseProgress);
router.post('/video-progress', verifyToken, updateVideoProgress);

export default router;
