import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VideoData, VideoPlayerProps } from '../../utils/interfaces';
import { Spinner } from 'react-bootstrap';
import { useWebGazer } from '../../hooks/useWebGazer';

const VideoPlayer: React.FC<VideoPlayerProps> = ({ onVideoComplete, passVideoId, passFootageMetaData }) => {
    const { startWebGazer, stopWebGazer, isInitialized } = useWebGazer();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [flashActive, setFlashActive] = useState<boolean>(false);
    const [spacebarTimestamps, setSpacebarTimestamps] = useState<number[]>([]);
    const [timestampsLength, setTimestampsLength] = useState<number>(0);
    const [startTime, setStartTime] = useState<number>(0);


    const handleVideoFinished = useCallback(() => {
        if (isInitialized) {
            stopWebGazer();
        };

        // Record Unix Timestamp for Video End Time.
        const endTime: number = Date.now();

        // Append Final Spacebar Timestamp if Recoding Hazard was in Progress.
        if (timestampsLength % 2 != 0) {
            spacebarTimestamps.push(Date.now());
        };

        passFootageMetaData(spacebarTimestamps, startTime, endTime);
        onVideoComplete?.();
    }, [isInitialized, stopWebGazer, onVideoComplete]);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const timeLeft = videoRef.current.duration - videoRef.current.currentTime;
            if (timeLeft <= 0.05 && isInitialized) {
                stopWebGazer();
            };
        };
    };

    const fetchRandomVideo = async (): Promise<void> => {
        try {
            setLoading(true);
            const response = await fetch('https://human-alignment-hazardous-driving.onrender.com/api/videos/random');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            };

            const data: VideoData = await response.json();
            console.log('Received video data:', data);

            if (!data.url) {
                throw new Error('No video URL in response');
            };

            setVideoUrl(data.url);

            if (data.videoId) {
                // Remove .mp4 from ID
                const videoId = data.videoId.slice(0, data.videoId.length - 4);
                passVideoId(videoId);
            };
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            console.error('Error fetching video:', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleBeginWebGazer = async () => {
        if (isInitialized) {
            return;
        }

        setStartTime(Date.now())
        try {
            await startWebGazer();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to start WebGazer';
            console.error('Error starting WebGazer:', errorMessage);
        }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
        setTimestampsLength(timestampsLength + 1);
        const currentTime = Date.now();

        if (event.code === "Space" && videoRef.current) {
            if (timestampsLength % 2 == 0) {
                setFlashActive(true);
                setSpacebarTimestamps((prev) => [...prev, currentTime]);
            } else {
                setFlashActive(false);
                setSpacebarTimestamps((prev) => [...prev, currentTime]);
            }
        };
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);

    useEffect(() => {
        fetchRandomVideo();

        return () => {
            if (isInitialized) {
                stopWebGazer();
            }
        };
    }, []);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', minWidth: '100vw', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000' }}>
                <Spinner
                    animation="border"
                    variant="light"
                    style={{ width: '5rem', height: '5rem' }}
                />
                <div style={{ color: '#ffffff' }}>Loading Driving Footage...</div>
            </div>
        );
    }

    return (
        <div className="video-container" style={{ overflow: 'hidden', backgroundColor: '#000000', height: '100vh' }}>
            {videoUrl && (
                <div style={{ position: 'relative' }}>
                    <video
                        ref={videoRef}
                        width="100%"
                        muted
                        autoPlay
                        onEnded={handleVideoFinished}
                        onTimeUpdate={handleTimeUpdate}
                        onPlay={handleBeginWebGazer}
                        style={{ maxWidth: '100vw', maxHeight: '100vh', display: 'block' }}
                    >
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    {flashActive && (
                        <>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                border: '20px solid rgba(255, 0, 0, 0.9)',
                                boxShadow: '0 0 0 1000px rgba(255, 0, 0, 0.6)',
                                pointerEvents: 'none',
                                animation: 'urgentHazardPulse 0.8s ease-in-out infinite',
                                zIndex: 9999
                            }} />
                            <style>
                                {`
            @keyframes urgentHazardPulse {
                0%, 100% { 
                    border-color: rgba(255, 0, 0, 0.9);
                    opacity: 1;
                }
                50% { 
                    border-color: rgba(255, 0, 0, 0.5);
                    opacity: 0.7;
                }
            }
        `}
                            </style>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;