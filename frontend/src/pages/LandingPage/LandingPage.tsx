import { Button, Carousel, Container } from "react-bootstrap";
import useSignOut from "../../hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import calibrationTutorial from '../../assets/CalibrationTutorialHAHD.mp4';
import simulationVideo from '../../assets/SimulationTutorial.mp4';
import questionnaireTutorial from '../../assets/QuestionnaireTutorial.mp4';
import { useState } from "react";
import Profile from "../../components/Profile/Profile";

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

    const carouselItemStyle = {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 0',
    };

    return (
        <Container
            fluid
            className="min-vh-100 position-relative align-items-center justify-content-center"
        >
            <Profile />
            <div style={{ position: 'absolute', top: '5%', left: '8%' }}>
                <p className="fw-bold fst-italic" style={{
                    fontSize: 'clamp(2rem, 2vw, 1.6rem)'
                }}>
                    Survey Instructions
                </p>
            </div>
            <div
                className="position-absolute top-50 start-50 translate-middle"
                style={{
                    width: '85%',
                    height: '80%',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '10px',
                }}>
                <Carousel
                    activeIndex={index}
                    onSelect={handleSelect}
                    data-bs-theme="dark"
                    interval={null}
                    prevIcon={index === 0 ? null : <span aria-hidden="true" className="carousel-control-prev-icon" />}
                    nextIcon={index === 3 ? null : <span aria-hidden="true" className="carousel-control-next-icon" />}
                    style={{ height: '100%' }}
                >
                    <Carousel.Item>
                        <div style={carouselItemStyle}>
                            <div style={{ width: 'min(45%, 1200px)' }} className="text-center">
                                <div className='d-flex align-items-center justify-content-center gap-3 mb-4'>
                                    <i className="bi bi-1-square" style={{ fontSize: 'clamp(1.7rem, 1.5vw, 1.5rem)' }}></i>
                                    <h4 className="fw-bold m-0" style={{ fontSize: 'clamp(1.4rem, 2vw, 2rem)' }}>
                                        Eye-Tracker Calibration
                                    </h4>
                                </div>
                                <p className="mb-5" style={{ fontSize: 'clamp(1rem, 1.2vw, 1.2rem)' }}>
                                    Before we begin, you need to calibrate the eye tracker. Please ensure that you allow camera access, sit up straight, and make sure there is appropriate lighting in your environment. You will be asked to click on 9 dots on the screen before starting the survey.
                                </p>
                                <div className="d-flex justify-content-center">
                                    <video
                                        src={calibrationTutorial}
                                        style={{
                                            width: 'min(100%, 900px)',
                                            height: 'auto',
                                            minHeight: '200px'
                                        }}
                                        autoPlay
                                        loop
                                        muted
                                    />
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div style={carouselItemStyle}>
                            <div style={{ width: 'min(45%, 1200px)' }} className="text-center">
                                <div className='d-flex align-items-center justify-content-center gap-3 mb-4'>
                                    <i className="bi bi-2-square" style={{ fontSize: 'clamp(1.7rem, 1.5vw, 1.5rem)' }}></i>
                                    <h4 className="fw-bold m-0" style={{ fontSize: 'clamp(1.4rem, 2vw, 2rem)' }}>
                                        Observe Driving Footage
                                    </h4>
                                </div>
                                <p className="mb-5" style={{ fontSize: 'clamp(1rem, 1.2vw, 1.2rem)' }}>
                                    Once you've completed the eye-tracker calibration, you'll watch a video of driving footage.
                                    Simply observe naturally as if you were behind the wheel. Your eye movements will be tracked to understand
                                    how drivers scan their environment. Please maintain your seated position throughout the video.
                                </p>
                                <div className="d-flex justify-content-center">
                                    <video
                                        src={simulationVideo}
                                        style={{
                                            width: 'min(100%, 900px)',
                                            height: 'auto',
                                            minHeight: '200px'
                                        }}
                                        autoPlay
                                        loop
                                        muted
                                    />
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div style={carouselItemStyle}>
                            <div style={{ width: 'min(45%, 1200px)' }} className="text-center">
                                <div className='d-flex align-items-center justify-content-center gap-3 mb-4'>
                                    <i className="bi bi-3-square" style={{ fontSize: 'clamp(1.7rem, 1.5vw, 1.5rem)' }}></i>
                                    <h4 className="fw-bold m-0" style={{ fontSize: 'clamp(1.4rem, 2vw, 2rem)' }}>
                                        Post-Simulation Survey
                                    </h4>
                                </div>
                                <p className="mb-5" style={{ fontSize: 'clamp(1rem, 1.2vw, 1.2rem)' }}>
                                    After reviewing the driving footage, you will answer questions related to the content. These questions assess your ability to identify key events and driving behaviors, helping train the model to align with human judgment and decision-making in driving scenarios
                                </p>
                                <div className="d-flex justify-content-center">
                                    <video
                                        src={questionnaireTutorial}
                                        style={{
                                            width: 'min(100%, 900px)',
                                            height: 'auto',
                                            minHeight: '200px'
                                        }}
                                        autoPlay
                                        loop
                                        muted
                                    />
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div style={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20rem 0',
                        }}>
                            <div style={{ width: 'min(45%, 1200px)' }} className="text-center">
                                <p className="mb-1" style={{ fontSize: 'clamp(1rem, 1.2vw, 1.2rem)' }}>
                                    Thank you for participating in this survey. Your contributions are valuable to our research!
                                </p>
                                <p className="mb-5" style={{ fontSize: 'clamp(1rem, 1.2vw, 1.2rem)' }}>
                                    Repeat steps 2 and 3 for as many images as possible. Every answer is greatly appreciated!
                                </p>
                                <Button
                                    variant="dark"
                                    onClick={handleBeginCalibration}
                                    style={{ fontSize: 'clamp(1rem, 1.2vw, 1.2rem)' }}
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