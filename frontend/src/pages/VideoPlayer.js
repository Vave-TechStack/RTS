import { useEffect, useRef, useCallback } from 'react';

const VideoPlayer = ({ video, userId, courseId }) => {
  const videoRef = useRef(null);
  const lastReportedTimeRef = useRef(0);
  const token = localStorage.getItem('token');

  const sendProgressUpdate = useCallback(async (seconds) => {
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
  }, [token, userId, courseId, video.id]);

  // Resume video from the last watched position
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleLoadedMetadata = () => {
      const start = parseFloat(video.last_position_seconds);
      if (!isNaN(start)) {
        videoEl.currentTime = start;
      }
    };

    videoEl.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      videoEl.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [video.last_position_seconds]);

  // Track progress every 10s and on video end
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleTimeUpdate = () => {
      const currentTime = videoEl.currentTime;
      if (currentTime - lastReportedTimeRef.current >= 10) {
        lastReportedTimeRef.current = currentTime;
        sendProgressUpdate(currentTime);
      }
    };

    const handleVideoEnded = () => {
      sendProgressUpdate(videoEl.duration);
    };

    videoEl.addEventListener('timeupdate', handleTimeUpdate);
    videoEl.addEventListener('ended', handleVideoEnded);

    return () => {
      videoEl.removeEventListener('timeupdate', handleTimeUpdate);
      videoEl.removeEventListener('ended', handleVideoEnded);
    };
  }, [sendProgressUpdate]);

  return (
    <video ref={videoRef} width="400" controls>
      <source src={video.video_url} type="video/mp4" />
    </video>
  );
};

export default VideoPlayer;