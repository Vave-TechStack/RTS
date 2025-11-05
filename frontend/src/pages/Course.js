import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer'
import pdfDownload from './pdfDownload'
import { jwtDecode } from 'jwt-decode';

const Course = () => {
  const [videos, setVideos] = useState([]);
  const [progress, setProgress] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const { courseId } = useParams();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/videos/get-videos?userId=${decoded.userId}&courseId=${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch videos');
        const data = await response.json();
        setVideos(data?.data || []);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchProgress = async () => {
      try {
        const response = await fetchCourseProgress({ userId: decoded.userId, courseId, token });
        setProgress(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchVideos();
    fetchProgress();
  }, [token, decoded.userId, courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      setError('Please select a video file to upload.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Step 1: Get duration using a promise
      const duration = await getVideoDuration(videoFile);

      // Step 2: Upload form with video and duration
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('title', videoFile.name);
      formData.append('course_id', courseId);
      formData.append('duration_seconds', duration);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/videos/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');
      setSuccess('Video uploaded successfully!');
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to extract video duration
  const getVideoDuration = (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };

      video.onerror = () => {
        reject(new Error('Failed to load video metadata'));
      };

      video.src = URL.createObjectURL(file);
    });
  };

  return (
    <div className="solutions-section">
      <div className="dashboard">
        <h3>Course Overview</h3>
        <p><strong>Progress:</strong> {parseFloat(progress?.completionRate || 0).toFixed(2)}%
          <span> </span>{progress?.completionRate === "100.00%" ?
            <><i className="fa fa-certificate" aria-hidden="true"></i>
              <button style={{ float: 'right' }} onClick={() => pdfDownload(courseId, decoded.userId)}>Download PDF</button></> :
            <i className="fa fa-tasks" aria-hidden="true"></i>
          }</p>
      </div>

      <div className="solutions-header">
        <h2>Videos</h2>
        <h1>Learn at Your Pace</h1>
      </div>

      {videos.length === 0 ? (
        <p>No Videos available.</p>
      ) : (
        videos.map((video) => (
          <div key={video.id} className="solution-card">
            <div className="solution-image">
              <VideoPlayer video={video} userId={decoded.userId} courseId={courseId} />
            </div>
            <div className="solution-content">
              <h1>{video.title}</h1>
              <p>{video.description || 'No description available'}</p>
            </div>
          </div>
        ))
      )}

      <div className="solutions-header">
        <h1>Upload New Video</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Video File:</label><br />
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Video'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>

    </div>
  );
};

export default Course;

const fetchCourseProgress = async ({ userId, courseId, token }) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/videos/course-progress?userId=${userId}&courseId=${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.message || 'Failed to fetch course progress');
  }

  return response.json();
};