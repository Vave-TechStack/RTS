import { pool } from "../config/init_db.js";

const userTableQuery = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'student') DEFAULT 'student',
        token VARCHAR(255) DEFAULT NULL,
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
    duration_seconds INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);`;

const userVideoProgressTableQuery = `CREATE TABLE IF NOT EXISTS user_video_progress (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    course_id INT NOT NULL,
    video_id INT NOT NULL UNIQUE,
    is_completed TINYINT(1) DEFAULT 0,
    completed_at TIMESTAMP NULL DEFAULT NULL,
    watch_seconds INT DEFAULT 0,
    last_watched_at TIMESTAMP NULL DEFAULT NULL,
    last_position_seconds INT DEFAULT 0,
    KEY course_id_idx (course_id),
    KEY video_id_idx (video_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
)`;

const memberTableQuery = `CREATE TABLE IF NOT EXISTS members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) NOT NULL UNIQUE,
        number INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    await createTable("Progress", userVideoProgressTableQuery);
    await createTable("Members", memberTableQuery);
    console.log("All tables created successfully or already exists!!");
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

export const insertIntoTable = async (tableName, query, values) => {
  try {
    const [result] = await pool.query(query, values);
    console.log(`Inserted data into ${tableName} table. Insert ID: ${result.insertId}`);
    return result;
  } catch (error) {
    console.error(`Error inserting data into ${tableName}`, error);
    throw error;
  }
};

export const updateTableData = async (tableName, query, values) => {
  try {
    const [result] = await pool.query(query, values);
    console.log(`Updated data in ${tableName} table. Affected Rows: ${result.affectedRows}`);
    return result;
  } catch (error) {
    console.error(`Error updating data in ${tableName}`, error);
    throw error;
  }
};

export const deleteTableRow = async (tableName, query, values) => {
  try {
    const [result] = await pool.query(query, values);
    console.log(`Deleted data from ${tableName} table. Affected Rows: ${result.affectedRows}`);
    return result;
  } catch (error) {
    console.error(`Error deleting data from ${tableName}`, error);
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