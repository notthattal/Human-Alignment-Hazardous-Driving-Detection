import { useState } from "react";
import VideoPlayer from "../../components/video/VideoPlayer";
import Questions from "../Questions/Questions";

const Survey: React.FC = () => {
    const [videoPlaying, setVideoPlaying] = useState<boolean>(true);
    const [videoId, setVideoId] = useState('');
    const [spacebarTimestamps, setSpacebarTimestamps] = useState<number[]>([]);
    

    const handleVideoComplete = () => {
        setVideoPlaying(false);
    } 

    const handleFormSubmitted = () => {
        setVideoPlaying(true);
    }

    const handleVideoId = (videoId: string) => {
        setVideoId(videoId);
    }

    const handleSpacebarTimestamps = (spacebarTimestamps: number[]) => {
        setSpacebarTimestamps(spacebarTimestamps) 
    }

    if (videoPlaying) {
        return (
            <VideoPlayer onVideoComplete={handleVideoComplete} passVideoId={handleVideoId} passSpacebarTimestamps={handleSpacebarTimestamps} />
        )
    } else {
        return (
            <Questions onFormSumbitted={handleFormSubmitted} videoId={videoId} spacebarTimestamps={spacebarTimestamps}/>
        )
    }
};

export default Survey;