import { pool } from '../config/init_db.js';
import fs from 'fs/promises';
import path from 'path';

export const uploadVideo = async (req, res) => {
  try {
    let { title } = req.body;
    const video = req.file;
    const { course_id, duration_seconds } = req.body;

    if (!video || !course_id || !duration_seconds) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!title || title.trim() === '') {
      title = video.originalname;
    }

    const ext = path.extname(title);
    const baseName = path.basename(title, ext);
    const videoTitle = baseName.trim();

    const videoPath = video.filename
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-_]/g, '');

    const url = `${process.env.HOST_URL}/uploads/${videoPath}`;

    const query = 'INSERT INTO videos (title, course_id, video_url, duration_seconds) VALUES (?, ?, ?, ?)';
    const values = [videoTitle, course_id, url, duration_seconds];

    await pool.query(query, values);

    res.status(201).json({
      success: true,
      message: 'Video uploaded and URL saved to DB.',
      data: {
        title: videoTitle,
        course_id,
        url,
        duration_seconds,
      },
    });
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ success: false, message: 'Server error during upload.' });
  }
};

export const deleteVideo = async (req, res) => {
  const { videoId } = req.params;

  try {
    // 1. Get video details
    const [videos] = await pool.query('SELECT file_path FROM videos WHERE id = ?', [videoId]);
    if (videos.length === 0) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const filePath = videos[0].file_path;
    const fullPath = path.join('uploads', filePath);

    // 2. Delete file from disk
    await fs.unlink(fullPath);

    // 3. Delete record from DB (or just nullify the path)
    await pool.query('DELETE FROM videos WHERE id = ?', [videoId]);

    res.status(200).json({ message: 'Video and file deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getVideos = async (req, res) => {
  const { courseId, userId } = req.query;

  let query = `
    SELECT v.*, 
           COALESCE(uvp.watch_seconds, 0) AS watch_seconds,
           COALESCE(uvp.last_position_seconds, 0) AS last_position_seconds,
           COALESCE(uvp.is_completed, FALSE) AS is_completed
    FROM videos v
    LEFT JOIN user_video_progress uvp
      ON v.id = uvp.video_id AND uvp.user_id = ?
  `;

  const params = [userId || null];

  if (courseId) {
    query += ' WHERE v.course_id = ?';
    params.push(courseId);
  }

  try {
    const [rows] = await pool.query(query, params);
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


export const getCourseProgress = async (req, res) => {
  const { userId, courseId } = req.query;

  if (!userId || !courseId) {
    return res.status(400).json({ message: 'userId and courseId are required' });
  }

  try {
    // Get total videos in the course
    const [videos] = await pool.query(
      'SELECT COUNT(*) AS total FROM videos WHERE course_id = ?',
      [courseId]
    );

    const totalVideos = videos[0]?.total || 0;

    if (totalVideos === 0) {
      return res.status(404).json({ message: 'No videos found for this course' });
    }

    // Get completed videos by user
    const [completed] = await pool.query(
      `SELECT COUNT(*) AS completed
       FROM user_video_progress
       WHERE user_id = ? AND course_id = ? AND is_completed = TRUE`,
      [userId, courseId]
    );

    const completedVideos = completed[0]?.completed || 0;
    const completionRate = ((completedVideos / totalVideos) * 100).toFixed(2);

    res.status(200).json({
      message: 'User course progress retrieved',
      data: {
        userId,
        courseId,
        totalVideos,
        completedVideos,
        completionRate: `${completionRate}%`,
        isCompleted: completedVideos === totalVideos,
      },
    });
  } catch (err) {
    console.error('Error fetching progress:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateVideoProgress = async (req, res) => {
  const { userId, courseId, videoId, watchSeconds } = req.body;
  if (!userId || !courseId || !videoId || watchSeconds == null) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await pool.query(
      `
      INSERT INTO user_video_progress 
        (user_id, course_id, video_id, watch_seconds, last_position_seconds, is_completed, completed_at, last_watched_at)
      VALUES (?, ?, ?, ?, ?, FALSE, NULL, NOW())
      ON DUPLICATE KEY UPDATE
        watch_seconds = GREATEST(VALUES(watch_seconds), watch_seconds),
        last_position_seconds = VALUES(last_position_seconds),
        last_watched_at = NOW(),
        is_completed = IF(VALUES(watch_seconds) >= (
          SELECT duration_seconds FROM videos WHERE id = ?
        ) * 0.9, TRUE, is_completed),
        completed_at = IF(VALUES(watch_seconds) >= (
          SELECT duration_seconds FROM videos WHERE id = ?
        ) * 0.9, NOW(), completed_at)
      `,
      [
        userId,
        courseId,
        videoId,
        watchSeconds,
        watchSeconds,
        videoId, // for subquery 1
        videoId  // for subquery 2
      ]
    );

    res.status(200).json({ message: 'Video progress updated' });
  } catch (err) {
    console.error('Error updating video progress:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};