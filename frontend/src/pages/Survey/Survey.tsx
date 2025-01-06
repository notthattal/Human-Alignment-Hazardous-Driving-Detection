import { useState } from "react";
import VideoPlayer from "../../components/video/VideoPlayer";
import Questions from "../Questions/Questions";

const Survey: React.FC = () => {
    const [videoPlaying, setVideoPlaying] = useState<boolean>(true);

    const handleVideoComplete = () => {
        setVideoPlaying(false);
    }

    const handleFormSubmitted = () => {
        setVideoPlaying(true);
    }

    if (videoPlaying) {
        return (
            <VideoPlayer onVideoComplete={handleVideoComplete} />
        )
    } else {
        return (
            <Questions onFormSumbitted={handleFormSubmitted} />
        )
    }
};

export default Survey;