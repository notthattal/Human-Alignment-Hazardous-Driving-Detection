import React, { useState, useEffect } from 'react';
import { VideoData, VideoPlayerProps } from '../../utils/interfaces';
import { useWebGazer } from '../../hooks/useWebGazer';

const VideoPlayer: React.FC<VideoPlayerProps> = ({ onVideoComplete }) => {
    const { startWebGazer, stopWebGazer } = useWebGazer();

    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const handleVideoFinished = () => {
        stopWebGazer();
        if (onVideoComplete) {
            onVideoComplete();
        }
    }

    const fetchRandomVideo = async (): Promise<void> => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3001/api/videos/random');
            if (!response.ok) {
                throw new Error('Failed to fetch video');
            }
            const data: VideoData = await response.json();
            console.log('Received video data:', data);
            setVideoUrl(data.url);
        } catch (err) {
            console.error('Error fetching video:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        startWebGazer();
        fetchRandomVideo();
    }, []);

    if (loading) {
        return <div>Loading video...</div>;
    }

    return (
        <div className="video-container">
            {videoUrl && (
                <video 
                    width="100%" 
                    muted
                    autoPlay
                    onEnded={handleVideoFinished}
                    style={{ maxWidth: '100vw', maxHeight: '100vh' }}
                    key={videoUrl}
                >
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
};

export default VideoPlayer;