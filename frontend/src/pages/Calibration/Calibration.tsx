import { useEffect, useState } from "react";
import { useWebGazer } from "../../hooks/useWebGazer";
import styles from './Calibration.module.css';

const Calibration: React.FC = () => {
    const { startWebGazer, setIsCalibrated, stopWebGazer } = useWebGazer();
    const [currentX, setCurrentX] = useState(100);
    const [currentY, setCurrentY] = useState(100);
    const [currentCoordinate, setCurrentCoordinate] = useState(0);
    const [currentClicks, setCurrentClicks] = useState(0);

    const coordinates = [
        { x: 100, y: 100 }, 
        { x: window.innerWidth / 2, y: 100 }, 
        { x: window.innerWidth - 100, y: 100 }, 
        { x: 100, y: window.innerHeight / 2 }, 
        { x: window.innerWidth / 2, y: window.innerHeight / 2 }, 
        { x: window.innerWidth - 100, y: window.innerHeight / 2 }, 
        { x: 100, y: window.innerHeight - 100 }, 
        { x: window.innerWidth / 2, y: window.innerHeight - 100 }, 
        { x: window.innerWidth - 100, y: window.innerHeight - 100 }, 
    ];

    const setNextCoordinate = () => {
        const nextClicks = currentClicks + 1;
        
        if (currentCoordinate === coordinates.length - 1 && nextClicks === 5) {
            setIsCalibrated(true);
            return;
        }

        if (nextClicks === 5) {
            const nextCoordinate = currentCoordinate + 1;
            if (nextCoordinate < coordinates.length) {
                setCurrentClicks(0);
                setCurrentCoordinate(nextCoordinate);
                setCurrentX(coordinates[nextCoordinate].x);
                setCurrentY(coordinates[nextCoordinate].y);
            }
        } else {
            setCurrentClicks(nextClicks);
        }
    };

    useEffect(() => {
        // Set initial position
        if (coordinates.length > 0) {
            setCurrentX(coordinates[0].x);
            setCurrentY(coordinates[0].y);
        }

        startWebGazer();

        return () => {
            stopWebGazer();
        }
    }, []);

    const opacity = Math.max(currentClicks / 6, 0.3);

    return (
        <div 
            className={styles.calibrationPoint}
            style={{ 
                position: 'absolute',
                left: `${currentX}px`, 
                top: `${currentY}px`, 
                opacity: opacity 
            }}
            onClick={setNextCoordinate}
        >
            {currentClicks}
        </div>
    );
}

export default Calibration;