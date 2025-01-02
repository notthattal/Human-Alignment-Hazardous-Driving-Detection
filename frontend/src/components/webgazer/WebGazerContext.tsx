import { useEffect, createContext, useState, ReactNode, useRef } from "react";
import { WebGazerContextType } from "../../utils/interfaces";
import { GazeData } from "../../utils/types";

export const WebGazerContext = createContext<WebGazerContextType | null>(null);

export const WebGazerProvider = ({children}: {children: ReactNode}) => {
  const [isCalibrated, setIsCalibrated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [gazeData, setGazeData] = useState<GazeData[]>([]);

  const webgazerInstance = useRef<any>(null);

  console.log('WebGazer Context Provider')
  
  const startWebGazer = async () => {
    if (!window.webgazer) {
      throw new Error('WebGazer.js is not loaded.')
    }
    
    try {
      webgazerInstance.current = await window.webgazer
        .setRegression('ridge')
        .setGazeListener((data: GazeData | null) => {
          if (data) {
            setGazeData(prev => [...prev, data]);
          }
        })
          .showVideoPreview(false)
          .begin();
      
          setIsInitialized(true);
        } catch (error) {
          console.error('Error initializing WebGazer:', error);
          throw error;
        }
      }

  const stopWebGazer = () => {
      if (webgazerInstance.current) {
        window.webgazer.end();
        setIsInitialized(false);
        setIsCalibrated(false);
      }
    };
    
    useEffect(() => {
      return () => {
        stopWebGazer();
      };
    }, []);

    return (
      <WebGazerContext.Provider 
        value={{
          isCalibrated,
          isInitialized,
          gazeData,
          startWebGazer,
          stopWebGazer,
          setIsCalibrated
        }}
      >
        {children}
      </WebGazerContext.Provider>
    );
}