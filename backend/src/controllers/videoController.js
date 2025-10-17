import {pool} from '../config/init_db.js';
// import path from 'path';

export const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No video file uploaded.' });
    }

    const { title, course_id } = req.body;
    const videoPath = `/uploads/${req.file.filename}`;

    const query = 'INSERT INTO videos (title, course_id, video_url) VALUES (?, ?, ?)';
    const values = [title, course_id, videoPath];

    await pool.query(query, values);

    res.status(201).json({
      success: true,
      message: 'Video uploaded and URL saved to DB.',
      data: {
        title,
        course_id,
        url: "videoPath",
      },
    });
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ success: false, message: 'Server error during upload.' });
  }
};

export const getVideos = async (req, res) => {
  const query = 'SELECT * FROM videos';

  try {
    const [rows] = await pool.query(query);
    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch videos',
    });
  }
};
