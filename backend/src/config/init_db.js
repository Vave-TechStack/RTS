import dotenv from "dotenv";
import mysql2 from 'mysql2/promise';
import path from 'path';
dotenv.config({ path: path.resolve('backend/.env') });

const pool=mysql2.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    connectionLimit:10,
    queueLimit:0,
    waitForConnections:true
});

const checkConnection=async()=>{
    try {
        const connection = await pool.getConnection();
        console.log("Database Connection Successfull!!");
        connection.release();
    } catch (error) {
        console.log("Error connecting to database!");
        throw error;
    }
}

export {pool,checkConnection};

// const mongoose = require('mongoose')

// mongoose
//   .connect(process.env.MONGODB_URI, {
//     dbName: process.env.DB_NAME,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.log('mongodb connected.')
//   })
//   .catch((err) => console.log(err.message))

// mongoose.connection.on('connected', () => {
//   console.log('Mongoose connected to db')
// })

// mongoose.connection.on('error', (err) => {
//   console.log(err.message)
// })

// mongoose.connection.on('disconnected', () => {
//   console.log('Mongoose connection is disconnected.')
// })

// process.on('SIGINT', async () => {
//   await mongoose.connection.close()
//   process.exit(0)
// })