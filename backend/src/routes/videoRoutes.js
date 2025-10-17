import express from 'express';
import multer from 'multer';
import { uploadVideo, getVideos } from '../controllers/videoController.js';

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // where to store videos
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('video'), uploadVideo);
router.get('/', getVideos);

export default router;
