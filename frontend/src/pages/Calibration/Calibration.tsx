import { useEffect, useState } from "react";
import { useWebGazer } from "../../hooks/useWebGazer";
import styles from './Calibration.module.css';

const Calibration: React.FC = () => {
    const { startWebGazer, setIsCalibrated, stopWebGazer } = useWebGazer();
    
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

    const [calibrationState, setCalibrationState] = useState({
        x: 100,
        y: 100,
        coordinate: 0,
        clicks: 0,
    });

    const setNextCoordinate = () => {
        setCalibrationState((prev) => {
            const nextClicks = prev.clicks + 1;
            const isLastPoint = prev.coordinate === coordinates.length - 1;

            if (isLastPoint && nextClicks === 5) {
                setIsCalibrated(true);
                
                return prev;
            }

            if (nextClicks === 5) {
                const nextCoordinate = prev.coordinate + 1;
                return {
                    x: coordinates[nextCoordinate]?.x,
                    y: coordinates[nextCoordinate]?.y,
                    coordinate: nextCoordinate,
                    clicks: 0,
                };
            }

            return { ...prev, clicks: nextClicks };
        });
    };

    useEffect(() => {
        startWebGazer();

        return () => stopWebGazer();
    }, []);

    const handleDotClick = () => {
        setNextCoordinate();
    };

    return (
        <div
            className={styles.calibrationPoint}
            style={{
                position: 'absolute',
                left: `${calibrationState.x}px`,
                top: `${calibrationState.y}px`,
                opacity: Math.max(calibrationState.clicks / 6, 0.3),
                zIndex: 1000,
            }}
            onClick={handleDotClick}
        >
            {calibrationState.clicks}
        </div>
    );
};

export default Calibration;
