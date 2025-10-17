import dotenv from 'dotenv';
import express from 'express';
import createError from 'http-errors';
import { checkConnection } from './config/init_db.js';
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
// import {createAllTable} from './utils/dbUtils.js';
import path from 'path';
// dotenv.config();
dotenv.config({ path: path.resolve('backend/.env') });
 
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.resolve('uploads')));

app.get('/', async (req, res, next) => {
  res.send('Hello from express.')
})
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/videos', videoRoutes);

app.use(async (req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, async() => {
  console.log(`Server running on port ${PORT}`)
  try {
    await checkConnection();
    // await createAllTable();
  } catch (error) {
    console.log("Failed to initialize the database", error);
  }
});