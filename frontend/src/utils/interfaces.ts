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
    startWebGazer: () => Promise<void>;
    stopWebGazer: () => void;
    setIsCalibrated: (value: boolean) => void;
}

export interface VideoData {
    url: string;
    videoId: string;
}

export interface VideoPlayerProps {
    onVideoComplete?: () => void;
}

export interface QuestionsProps {
    onFormSumbitted?: () => void;
}

export interface QuestionsFormData {
    hazardDetected: string;         
    noDetectionReason: string;      // Categorical: 'noHazards', 'uncertain', 'subtleHazards'
    detectionConfidence: number;    // Scale 1-5 confidence rating
    hazardSeverity: number;         // Scale 1-5 severity rating
    hazardDescription: string;      // Text feature for NLP analysis
    attentionFactors: string[];     // Multi-label categorical: ['motion', 'velocity', 'proximity', 'environment', 'anomaly', 'other']
}
