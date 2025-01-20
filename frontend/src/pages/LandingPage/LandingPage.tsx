import { Button, Carousel, Container } from "react-bootstrap";
import useSignOut from "../../hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import calibrationTutorial from '../../assets/CalibrationTutorialHAHD.mp4';
import simulationVideo from '../../assets/SimulationTutorial.mp4';
import questionnaireTutorial from '../../assets/QuestionnaireTutorial.mp4';
import { useState } from "react";
import styles from './LandingPage.module.css';

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
        <Container fluid className={styles.container}>
            <Button
                variant="dark"
                className={styles.signOutButton}
                onClick={signOut}
            >
                Sign Out
            </Button>

            <h1 className={styles.title}>
                Survey Instructions
            </h1>

            <div className={styles.carouselWrapper}>
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
                        <div className={styles.carouselItem}>
                            <div className={styles.content}>
                                <div className={styles.stepHeader}>
                                    <i className={`bi bi-1-square ${styles.stepNumber}`}></i>
                                    <h2 className={styles.stepTitle}>Eye-Tracker Calibration</h2>
                                </div>
                                <p className={styles.description}>
                                Before starting, you'll need to calibrate the eye tracker. Grant camera access, sit up straight, and ensure proper lighting. You'll click on nine dots multiple times on the screen before beginning the survey.
                                </p>
                                <video
                                    src={calibrationTutorial}
                                    className={styles.video}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            </div>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div className={styles.carouselItem}>
                            <div className={styles.content}>
                                <div className={styles.stepHeader}>
                                    <i className={`bi bi-2-square ${styles.stepNumber}`}></i>
                                    <h2 className={styles.stepTitle}>Observe Driving Footage</h2>
                                </div>
                                <p className={styles.description}>
                                After calibrating the eye tracker, you'll watch a driving footage video. Observe naturally, as if you're behind the wheel, while your eye movements are tracked. Stay seated and press the spacebar whenever you spot a potential hazard.
                                </p>
                                <div className={styles.videoContainer}>
                                    <video
                                        src={simulationVideo}
                                        className={styles.video}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                    <div className={styles.keyboardContainer}>
                                        <svg viewBox="0 0 400 200" className={styles.keyboard}>
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
                                                        dur="2s"
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
                                            <text x="200" y="180" text-anchor="middle" fill="#1E90FF" font-size="20" font-family="Arial, sans-serif" font-weight="bold">
                                                Press when you spot a hazard
                                            </text>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div className={styles.carouselItem}>
                            <div className={styles.content}>
                                <div className={styles.stepHeader}>
                                    <i className={`bi bi-3-square ${styles.stepNumber}`}></i>
                                    <h2 className={styles.stepTitle}>Post-Simulation Survey</h2>
                                </div>
                                <p className={styles.description}>
                                    After reviewing the driving footage, you will answer questions related to the content. These questions 
                                    assess your ability to identify key events and driving behaviors, helping train the model to align 
                                    with human judgment and decision-making in driving scenarios.
                                </p>
                                <video
                                    src={questionnaireTutorial}
                                    className={styles.video}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            </div>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div className={styles.carouselItem}>
                            <div className={`${styles.content} ${styles.finalSlide}`}>
                                <div>
                                    <p className={styles.description}>
                                    Participate in as many driving simulations as possible! Each completed simulation earns you one raffle entry, and every successful referral grants you 10 entries. The grand prize winner will receive $100!
                                    </p>
                                    <p className={styles.description}>
                                        Thank you for participating in this survey. Your contributions are valuable to our research!
                                    </p>
                                    <Button
                                        variant="dark"
                                        onClick={handleBeginCalibration}
                                        className={styles.button}
                                    >
                                        Begin Calibration
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
        </Container>
    );
}

export default LandingPage;