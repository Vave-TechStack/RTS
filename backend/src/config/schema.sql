CREATE DATABASE course_app;
USE course_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- hashed password
    role ENUM('admin', 'student') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password, role)
VALUES 
  ('Admin User', 'admin@example.com', 'hashed_password_1', 'admin'),
  ('Student User', 'student@example.com', 'hashed_password_2', 'student');

------------------------------

CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

INSERT INTO courses (title, description, created_by)
VALUES ('Full Stack Web Development', 'Learn HTML, CSS, JS, Node.js and MySQL from scratch.', 1);

-----------------------------------

CREATE TABLE videos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    video_url TEXT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

INSERT INTO videos (course_id, title, video_url)
VALUES 
(1, 'Introduction to Full Stack', 'https://example.com/videos/intro.mp4'),
(1, 'Setting Up Development Environment', 'https://example.com/videos/setup.mp4'),
(1, 'Building First Node.js App', 'https://example.com/videos/node-app.mp4');

-----------------------------

-- List all courses
SELECT * FROM courses;

-- List all videos for a course
SELECT * FROM videos WHERE course_id = 1;
