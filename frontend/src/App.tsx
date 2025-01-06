import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import './App.css'
import SignInPage from './pages/SignIn/SignInPage';
import RegistrationPage from './pages/Registration/RegistrationPage';
import LandingPage from './pages/LandingPage/LandingPage';
import Calibration from './pages/Calibration/Calibration';
import Survey from './pages/Survey/Survey';
import { useWebGazer } from './hooks/useWebGazer';
import { useEffect } from 'react';
import Questions from './pages/Questions/Questions';

const App: React.FC = () => {

  const { user } = useAuth();
  const { isCalibrated, stopWebGazer } = useWebGazer();
  const location = useLocation();

  useEffect(() => {
    if (!['/calibration', '/survey'].includes(location.pathname)) {
      stopWebGazer();
    }
  }, [location.pathname, stopWebGazer]);

  return (
    <Routes>
      <Route path='/' element={ user ? <Navigate to='/landingpage' /> : <SignInPage />} />
      <Route path='/registration' element={<RegistrationPage />} />
      <Route path='/questions' element={<Questions />} />
      <Route path='/landingpage' 
                element={
                    !user ? <Navigate to='/' /> :
                    isCalibrated ? <Navigate to='/survey' /> : <LandingPage />
                } 
            />
            <Route path='/calibration' 
                element={
                    !user ? <Navigate to='/' /> :
                    isCalibrated ? <Navigate to='/survey' /> : <Calibration />
                } 
            />
            <Route path='/survey' 
                element={
                    !user ? <Navigate to='/' /> :
                    !isCalibrated ? <Navigate to='/calibration' /> : <Survey />
                } 
            />
            
    </Routes>
  )
}

export default App
