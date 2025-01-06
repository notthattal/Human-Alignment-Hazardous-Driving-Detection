import { Button, Carousel, Container } from "react-bootstrap";
import useSignOut from "../../hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import calibrationTutorial from '../../assets/CalibrationTutorialHAHD.mp4';
import simulationVideo from '../../assets/SimulationTutorial.mp4';
import questionnaireTutorial from '../../assets/QuestionnaireTutorial.mp4';
import { useState } from "react";

const LandingPage: React.FC = () => {
    const { signOut } = useSignOut();
    const navigate = useNavigate();
    const [index, setIndex] = useState<number>(0);

    const handleBeginCalibration = () => {
        const permissions = window.confirm('The Human-Alignment Hazard Detection Survey would like to access your camera.');

        if (permissions) {
            navigate('/calibration');
        }
    }

    const handleSelect = (selectedIndex: number): void => {
        setIndex(selectedIndex);
    };

    return (
        <Container
            fluid
            className="min-vh-100 position-relative d-flex align-items-center justify-content-center"
        >
            <Button
                variant="dark"
                className="position-absolute top-0 end-0 m-2"
                onClick={signOut}
            >
                Sign Out
            </Button>

            <div
                className="position-absolute top-50 start-50 translate-middle"
                style={{
                    width: '85%',
                    height: '80%',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '10px',
                    overflow: 'hidden'
                }}>
                <Carousel
                    activeIndex={index}
                    onSelect={handleSelect}
                    data-bs-theme="dark"
                    className="d-flex align-items-center justify-content-center h-100"
                    style={{ height: '100%' }}
                >
                    <Carousel.Item>
                        <div className="d-flex align-items-center justify-content-center h-100">
                            <div style={{ width: '55%' }} className="text-center">
                            <h4 className="mb-3 fw-bold">Eye-Tracker Calibration</h4>
                                <p className="mb-5">
                                    Before we begin, you need to calibrate the eye tracker. Please ensure that you allow camera access, sit up straight, and make sure there is appropriate lighting in your environment. You will be asked to click on 9 dots on the screen before starting the survey.
                                </p>
                                <video
                                    src={calibrationTutorial}
                                    className="w-100"
                                    style={{ maxWidth: '650px', height: 'auto' }}
                                    autoPlay
                                    loop
                                    muted
                                />
                            </div>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div className="d-flex align-items-center justify-content-center h-100">
                            <div style={{ width: '55%' }} className="text-center">
                                <h4 className="mb-3 fw-bold">Observe Driving Footage</h4>
                                <p className="mb-5">
                                    Once you've completed the eye-tracker calibration, you'll watch a video of driving footage.
                                    Simply observe naturally as if you were behind the wheel. Your eye movements will be tracked to understand
                                    how drivers scan their environment. Please maintain your seated position throughout the video.
                                </p>
                                <video
                                    src={simulationVideo}
                                    className="w-100"
                                    style={{ maxWidth: '650px', height: 'auto' }}
                                    autoPlay
                                    loop
                                    muted
                                />
                            </div>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div className="d-flex align-items-center justify-content-center h-100">
                            <div style={{ width: '55%' }} className="text-center">
                            <h4 className="mb-3 fw-bold">Post-Simulation Survey</h4>
                                <p className="mb-5">
                                    After reviewing the driving footage, you will answer questions related to the content. These questions assess your ability to identify key events and driving behaviors, helping train the model to align with human judgment and decision-making in driving scenarios
                                </p>
                                <video
                                    src={questionnaireTutorial}
                                    className="w-100"
                                    style={{ maxWidth: '650px', height: 'auto' }}
                                    autoPlay
                                    loop
                                    muted
                                />
                            </div>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div className="d-flex align-items-center justify-content-center h-100">
                            <div style={{ width: '55%' }} className="text-center">
                                <p className="mb-1">
                                    Thank you for participating in this survey. Your contributions are valuable to our research!
                                </p>
                                <p className="mb-5">
                                    Repeat steps 1 and 2 for as many images as possible. Every answer is greatly appreciated!
                                </p>
                                <Button
                                    variant="dark"
                                    onClick={handleBeginCalibration}
                                >
                                    Begin Calibration
                                </Button>
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
        </Container>
    );
}

export default LandingPage;