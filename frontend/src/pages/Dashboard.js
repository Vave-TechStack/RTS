import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import img1 from "../assets/leader.jpg";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  const fetchWithAuth = async (endpoint) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.message || 'Failed to fetch data');
    }

    return response.json();
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes] = await Promise.all([
          fetchWithAuth('/api/courses/get-course'),
        ]);
        setCourses(coursesRes?.courses || []);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/courses/add-course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          "userId": 1,
          title,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to add course');
      }

      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Add course error:', err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <h1>Dashboard</h1>
      <LogoutButton />
      <div className="solutions-section">
        <div className="solutions-header">
          <h2>Courses</h2>
          <h1>Learning self pace</h1>
        </div>
        {courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          <div>
            {courses.map((course) => (
              <div key={course.id} className="solution-card">
                <div className="solution-image">
                  <img src={img1} alt="Leadership Development" />
                </div>
                <div className="solution-content">
                  <h1>{course.title}</h1>
                  <p>{course.description}</p>
                  {/* <a href="/course">Know More</a> */}
                  <Link to={`/course/${course.id}`}>Know More</Link>
                </div>
              </div>
            ))}
          </div>)}
      </div>
      <h2>Add New Course</h2>
      <form onSubmit={handleAddCourse}>
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Course'}
        </button>
      </form>
    </div>
  );
};

export default Dashboard;

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Logout failed');
      }
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  );
};