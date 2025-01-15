import { useEffect, useState } from "react";
import { useWebGazer } from "../../hooks/useWebGazer";
import styles from './Calibration.module.css';

const Calibration: React.FC = () => {
    const { startWebGazer, setIsCalibrated, stopWebGazer } = useWebGazer();
    const [currentX, setCurrentX] = useState(100);
    const [currentY, setCurrentY] = useState(100);
    const [currentCoordinate, setCurrentCoordinate] = useState(0);
    const [currentClicks, setCurrentClicks] = useState(0);

    const setNextCoordinate = () => {
        if (currentCoordinate == coordinates.length && currentClicks == 5) {
            setIsCalibrated(true);
        };

        if (currentClicks == 5) {
            setCurrentClicks(0);
            setCurrentCoordinate(currentCoordinate + 1);
            setCurrentX(coordinates[currentCoordinate].x)
            setCurrentY(coordinates[currentCoordinate].y)
        } else {
            setCurrentClicks((prevState) => prevState + 1)
        }
    };

    const coordinates = [
        { x: window.innerWidth / 2, y: 100 },
        { x: window.innerWidth - 100, y: 100 },
        { x: 100, y: window.innerHeight / 2 },
        { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        { x: window.innerWidth - 100, y: window.innerHeight / 2 },
        { x: 100, y: window.innerHeight - 100 },
        { x: window.innerWidth / 2, y: window.innerHeight - 100 },
        { x: window.innerWidth - 100, y: window.innerHeight - 100 },
    ];

    useEffect(() => {
        startWebGazer();

        return () => {
            stopWebGazer();
        }
    }, [])

    return (
        <div className={styles.calibrationPoint}
            style={{ left: `${currentX}px`, top: `${currentY}px`, opacity: `${Math.max(currentClicks / 6, 0.3)}` }}
            onClick={setNextCoordinate}>
            {currentClicks}
        </div>
    )
}

export default Calibration;