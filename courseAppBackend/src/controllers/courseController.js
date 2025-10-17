// const courses = [1,2,3,4,5,6];
import { getTableData } from '../utils/dbUtils.js';

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