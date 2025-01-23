import { AuthAction, GazeData } from "./types";

export interface User {
    id: string;
    email: string;
    token: string;
}

export interface AuthState {
    user: any | null;
}

export interface AuthContextType {
    user: any | null;
    dispatch: React.Dispatch<AuthAction>;
}

export interface WebGazerContextType {
    isCalibrated: boolean;
    isInitialized: boolean;
    gazeData: GazeData[];
    finalGazeData: GazeData[];
    startWebGazer: () => Promise<void>;
    stopWebGazer: () => void;
    setIsCalibrated: (value: boolean) => void;
    resetFinalGazeData: () => void;
}

export interface VideoData {
    url: string;
    videoId: string;
}

export interface VideoPlayerProps {
    onVideoComplete?: () => void;
    passVideoId: (id: string) => void;
    passSpacebarTimestamps: (timestamp: number[]) => void;
}

export interface QuestionsProps {
    videoId: string,
    spacebarTimestamps: number[];
    onFormSumbitted?: () => void;
}

export interface QuestionsFormData {
    hazardDetected: string;         
    noDetectionReason: string;      
    detectionConfidence: number;    
    hazardSeverity: number;         
    attentionFactors: string[];
    spacebarTimestamps: number[];
}

export interface SurveyResults {
    userId: number,
    videoId: string,
    gaze: GazeData[],
    formData: QuestionsFormData
}

export interface Country {
    code: string;
    name: string;
}

export interface ReferralCode {
    code: string
}