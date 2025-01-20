import { useContext } from "react";
import { WebGazerContextType } from "../utils/interfaces";
import { WebGazerContext } from "../components/WebGazer/WebGazerContext";

export const useWebGazer = (): WebGazerContextType => {
    const context = useContext(WebGazerContext);
    
    if (!context) {
      throw new Error('useWebGazer must be used within a WebGazerProvider');
    }

    return context;
  };