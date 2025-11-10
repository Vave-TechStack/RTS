import dotenv from "dotenv";
import mysql2 from 'mysql2/promise';
import path from 'path';
// dotenv.config({ path: path.resolve('backend/.env') });
dotenv.config();

const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  connectionLimit: 10,
  queueLimit: 0,
  waitForConnections: true,
  connectTimeout: 10000,
  family: 4,
});

// const checkConnection = async () => {
//   try {
//     const connection = await pool.getConnection();
//     console.log("Database Connection Successfull!!");
//     connection.release();
//   } catch (error) {
//     console.log("Error connecting to database!");
//     throw error;
//   }
// }

const checkConnection = async (retries = 5, delay = 5000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const connection = await pool.getConnection();
      console.log("Database connection successful!");
      connection.release();
      return true;
    } catch (error) {
      console.error(`Error connecting to database (attempt ${attempt}/${retries}): ${error.code}`);
      if (attempt < retries) {
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error("All retry attempts failed. Database still unreachable.");
        throw error; // stop retrying after last attempt
      }
    }
  }
};

process.on('SIGINT', async () => {
  try {
    await pool.end();
    console.log('MySQL connection pool closed.');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MySQL pool:', err.message);
    process.exit(1);
  }
});

export { pool, checkConnection };