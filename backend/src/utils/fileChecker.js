// import fs from 'fs';
// import path from 'path';
// import { pool } from '../db/pool.js'; // adjust path to your db config

// export const checkMissingFiles = async () => {
//   const [videos] = await pool.query('SELECT id, file_path FROM videos');

//   for (const video of videos) {
//     const fullPath = path.join('uploads', video.file_path);
//     if (!fs.existsSync(fullPath)) {
//       console.warn(`Missing file for video ID ${video.id}: ${video.file_path}`);
//       await pool.query('UPDATE videos SET file_path = NULL WHERE id = ?', [video.id]);
//     }
//   }

//   console.log('Video file sync check complete.');
// };
