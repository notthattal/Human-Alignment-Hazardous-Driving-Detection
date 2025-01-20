import { createContext, useState, ReactNode, useRef } from "react";
import { WebGazerContextType } from "../../utils/interfaces";
import { GazeData } from "../../utils/types";

export const WebGazerContext = createContext<WebGazerContextType | null>(null);

export const WebGazerProvider = ({children}: {children: ReactNode}) => {
  const [isCalibrated, setIsCalibrated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [gazeData, setGazeData] = useState<GazeData[]>([]);
  const [finalGazeData, setFinalGazeData] = useState<GazeData[]>([]);
  
  const webgazerInstance = useRef<any>(null);
  const lastLogTime = useRef<number>(0);
  const LOGGING_INTERVAL = 200;

  const logGazeData = (data: GazeData) => {
    const currentTime = Date.now();
    
    if (currentTime - lastLogTime.current >= LOGGING_INTERVAL) {
      const timestampedData = {
        ...data,
        timestamp: currentTime,
      };
      
      setGazeData(prev => [...prev, timestampedData]);
      lastLogTime.current = currentTime;
    }
  };
  
  const startWebGazer = async () => {
    if (!window.webgazer) {
      throw new Error('WebGazer.js is not loaded.')
    }

    try {
      setGazeData([]);
      console.log('WebGazer starting...', new Date().toLocaleTimeString());
      
      lastLogTime.current = Date.now();

      webgazerInstance.current = await window.webgazer
        .setRegression('ridge')
        .setGazeListener((data: GazeData | null) => {
          if (data) {
            logGazeData(data);
          }
        })
        .showVideoPreview(false)
        .showPredictionPoints(false)
        .begin();
      
      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing WebGazer:', error);
      throw error;
    }
  };

  const stopWebGazer = () => {
    if (webgazerInstance.current) {
      console.log('WebGazer shutting down...');
      
      setFinalGazeData(gazeData);
      window.webgazer.end();
      setIsInitialized(false);
      setGazeData([]);
    }
  };

  const resetFinalGazeData = () => {
    setFinalGazeData([]);
  }

  return (
    <WebGazerContext.Provider
      value={{
        isCalibrated,
        isInitialized,
        gazeData,
        finalGazeData,
        startWebGazer,
        stopWebGazer,
        setIsCalibrated,
        resetFinalGazeData
      }}
    >
      {children}
    </WebGazerContext.Provider>
  );
};