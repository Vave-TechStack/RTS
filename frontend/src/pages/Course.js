import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

const Course = () => {

  const [videos, setVideos] = useState([]);
  const [progress, setProgress] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');
  const userId = 1; // Replace with dynamic userId if needed
  const { courseId } = useParams();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/videos/get-videos?userId=${userId}&courseId=${courseId}`, {
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
        const response = await fetchCourseProgress({ userId, courseId, token });
        setProgress(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchVideos();
    fetchProgress();
  }, [token, userId, courseId]);

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
        <p><strong>Progress:</strong> {progress?.completionRate || 0}
          <span> </span>{progress?.completionRate === "100.00%" ?
            <i className="fa fa-certificate" aria-hidden="true"
            // style={{ float: 'right' }}
            ></i> : <i className="fa fa-tasks" aria-hidden="true"></i>
          }
        </p>
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
              <VideoPlayer video={video} userId={1} courseId={courseId} />
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

const VideoPlayer = ({ video, userId, courseId }) => {
  const videoRef = useRef(null);
  const lastReportedTimeRef = useRef(0);
  const token = localStorage.getItem('token');

  // ⏱️ Send progress update to backend
  const sendProgressUpdate = async (seconds) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/videos/video-progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          courseId,
          videoId: video.id,
          watchSeconds: Math.floor(seconds),
        }),
      });

      if (!res.ok) {
        console.error('Failed to update video progress');
      } else {
        console.log('Progress updated at', seconds);
      }
    } catch (err) {
      console.error('Progress update error:', err);
    }
  };

  // 🕒 Resume from last watch
  useEffect(() => {
    const videoEl = videoRef.current;

    const handleLoadedMetadata = () => {
      if (video.last_position_seconds && !isNaN(video.last_position_seconds)) {
        videoEl.currentTime = video.last_position_seconds;
      }
    };

    if (videoEl) {
      videoEl.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      if (videoEl) {
        videoEl.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, [video.last_position_seconds]);

  // 📈 Update watch progress every 10s + on complete
  useEffect(() => {
    const videoEl = videoRef.current;

    const handleTimeUpdate = () => {
      const currentTime = videoEl.currentTime;

      if (currentTime - lastReportedTimeRef.current >= 10) {
        lastReportedTimeRef.current = currentTime;
        sendProgressUpdate(currentTime);
      }
    };

    const handleVideoEnded = () => {
      sendProgressUpdate(videoEl.duration); // Force update on complete
    };

    if (videoEl) {
      videoEl.addEventListener('timeupdate', handleTimeUpdate);
      videoEl.addEventListener('ended', handleVideoEnded);
    }

    return () => {
      if (videoEl) {
        videoEl.removeEventListener('timeupdate', handleTimeUpdate);
        videoEl.removeEventListener('ended', handleVideoEnded);
      }
    };
  }, [video.id, userId, courseId]);

  return (
    <video ref={videoRef} width="400" controls>
      <source src={video.video_url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};
