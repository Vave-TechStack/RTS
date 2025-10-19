// const courses = [1,2,3,4,5,6];
import { getTableData, insertIntoTable } from '../utils/dbUtils.js';

export const getAllCourses = async (req, res) => {
  const query = 'SELECT * FROM Courses';
  try {
    const courses = await getTableData('Courses', query);
    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses',
    });
  }
};

export const addCourse = async (req, res) => {
  const { userId, title, description } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  if (!title) {
    return res.status(400).json({ message: 'Course title is required' });
  }

  const query = `INSERT INTO courses (title, description, created_by) VALUES (?, ?, ?)`;
  const values = [title, description || null, userId];

  try {
    const result = await insertIntoTable('courses', query, values);
    res.status(201).json({
      success: true,
      message: 'Course added successfully',
      courseId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add course',
    });
  }
};