import { useState } from "react";
import VideoPlayer from "../../components/video/VideoPlayer";
import Questions from "../Questions/Questions";
import { Modal, Button } from "react-bootstrap";

const Survey: React.FC = () => {
    const [videoPlaying, setVideoPlaying] = useState<boolean>(true);
    const [videoId, setVideoId] = useState('');
    const [spacebarTimestamps, setSpacebarTimestamps] = useState<number[]>([]);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

    const handleVideoComplete = () => {
        setVideoPlaying(false);
    }

    const handleFormSubmitted = () => {
        setShowConfirmation(true);
    }

    const handleNextScenario = () => {
        setShowConfirmation(false);
        setVideoPlaying(true);
    }

    const handleVideoId = (videoId: string) => {
        setVideoId(videoId);
    }

    const handleSpacebarTimestamps = (spacebarTimestamps: number[]) => {
        setSpacebarTimestamps(spacebarTimestamps)
    }

    const KeyboardSVG = () => (
        <svg viewBox="0 0 400 200" style={{ width: '200px', margin: '1rem auto' }}>
            <rect x="50" y="40" width="300" height="120" rx="10" fill="#2f3640" filter="url(#shadow)"/>
            <g fill="#3f4853">
                <rect x="70" y="55" width="30" height="30" rx="4"/>
                <rect x="105" y="55" width="30" height="30" rx="4"/>
                <rect x="140" y="55" width="30" height="30" rx="4"/>
                <rect x="175" y="55" width="30" height="30" rx="4"/>
                <rect x="210" y="55" width="30" height="30" rx="4"/>
                <rect x="245" y="55" width="30" height="30" rx="4"/>
                <rect x="280" y="55" width="30" height="30" rx="4"/>
            </g>
            <g className="spacebar">
                <rect x="100" y="100" width="200" height="40" rx="4" fill="#3f4853">
                    <animate
                        attributeName="y"
                        values="100;105;100"
                        dur="2s"
                        repeatCount="indefinite"
                        begin="0s"
                    />
                    <animate
                        attributeName="fill"
                        values="#3f4853;#2d3436;#3f4853"
                        dur="1.5s"
                        repeatCount="indefinite"
                        begin="0s"
                    />
                </rect>
            </g>
            <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#000" flood-opacity="0.3"/>
                </filter>
            </defs>
            <text x="200" y="190" text-anchor="middle" fill="#1E90FF" font-size="20" font-family="Arial, sans-serif" font-weight="bold">
                Press when you spot a hazard
            </text>
        </svg>
    );

    const ConfirmationDialog = () => (
        <Modal
            show={showConfirmation}
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body className="text-center py-4">
                <h4 style={{ marginBottom: '1.5rem' }}>Are you ready for the next driving scenario?</h4>
                <p style={{ 
                    fontSize: '1.1rem', 
                    color: '#4a5568',
                    marginBottom: '1.5rem'
                }}>
                    Remember to press the spacebar whenever you spot a potentially hazardous situation.
                </p>
                <KeyboardSVG />
                <Button
                    variant="primary"
                    onClick={handleNextScenario}
                    style={{
                        backgroundColor: '#1E90FF',
                        border: 'none',
                        padding: '0.75rem 2rem',
                        fontSize: '1.1rem',
                        marginTop: '1rem'
                    }}
                >
                    Yes, I'm Ready
                </Button>
            </Modal.Body>
        </Modal>
    );

    if (videoPlaying) {
        return (
            <VideoPlayer 
                onVideoComplete={handleVideoComplete} 
                passVideoId={handleVideoId} 
                passSpacebarTimestamps={handleSpacebarTimestamps} 
            />
        )
    } else {
        return (
            <>
                <Questions 
                    onFormSumbitted={handleFormSubmitted} 
                    videoId={videoId} 
                    spacebarTimestamps={spacebarTimestamps}
                />
                <ConfirmationDialog />
            </>
        )
    }
};

export default Survey;