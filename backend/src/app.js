import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express from 'express';
import createError from 'http-errors';
import { checkConnection } from './config/init_db.js';
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import cors from 'cors';
import { createAllTable } from './utils/dbUtils.js';
import path from 'path';
// import { subscribe } from './controllers/userController.js';

dotenv.config({ path: path.resolve('backend/.env') });

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({ origin: process.env.REACT_HOST_URL, credentials: true }));
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

app.disable('x-powered-by'); // Don't advertise our server type

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get('/', async (req, res, next) => {
  // res.send('Hello from express.')
  const result = await fetch("https://ifconfig.me", {
    headers: { "User-Agent": "curl/7.64.1" },
  });
  const ip = await result.text();
  console.log("ip", ip)
  res.send('Hello from express.', ip)
})

// app.post('/subscribe-newsletter', subscribe); 
//need backend production website to allow gmail

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/videos', videoRoutes);

// 404 handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  console.log("error", err)
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
  try {
    await checkConnection();
    await createAllTable();
  } catch (error) {
    console.log("Failed to initialize the database", error);
  }
});