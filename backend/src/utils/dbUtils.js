import { pool } from "../config/init_db.js";

const userTableQuery = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'student') DEFAULT 'student',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

const courseTableQuery = `CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);`;

const videoTableQuery = `CREATE TABLE IF NOT EXISTS videos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    video_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);`;

const createTable = async (tableName, query) => {
  try {
    await pool.query(query);
    // console.log(`${tableName} table created or already exists`);
  } catch (error) {
    console.log(`Error creating ${tableName}`, error);
  }
};

export const createAllTable = async () => {
  try {
    await createTable("Users", userTableQuery);
    await createTable("Courses", courseTableQuery);
    await createTable("Videos", videoTableQuery);
    console.log("All tables created successfully!!");
  } catch (error) {
    console.log("Error creating tables", error);
    throw error;
  }
};

export const getTableData = async (tableName, query) => {
  try {
    const result = await pool.query(query);
    console.log(`Fetched data from ${tableName} table`);
    // console.log("result", result)
    return result[0];
  } catch (error) {
    console.log(`Error fetching data from ${tableName}`, error);
    throw error;
  }
};

// const getUserTableQuery = `SELECT * FROM Courses;`;

// export const getAllTable = async () => {
//   try {
//     await getTableData("Users", getUserTableQuery);
//     console.log("All tables created successfully!!");
//   } catch (error) {
//     console.log("Error creating tables", error);
//     throw error;
//   }
// };