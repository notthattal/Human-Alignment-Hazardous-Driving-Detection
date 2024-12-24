import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import './App.css'
import SignInPage from './pages/SignIn/SignInPage';
import RegistrationPage from './pages/Registration/RegistrationPage';
import LandingPage from './pages/LandingPage/LandingPage';
import Calibration from './pages/Calibration/Calibration';
import Survey from './pages/Survey/Survey';
import { useWebGazer } from './hooks/useWebGazer';

const App: React.FC = () => {

  const { user } = useAuth();
  const { isCalibrated } = useWebGazer();

  return (
    <Routes>
      <Route path='/signin' element={ user ? <Navigate to='/landingpage' /> : <SignInPage />} />
      <Route path='/registration' element={<RegistrationPage />} />
      <Route path='/landingpage' 
                element={
                    !user ? <Navigate to='/signin' /> :
                    isCalibrated ? <Navigate to='/survey' /> : <LandingPage />
                } 
            />
            <Route path='/calibration' 
                element={
                    !user ? <Navigate to='/signin' /> :
                    isCalibrated ? <Navigate to='/survey' /> : <Calibration />
                } 
            />
            <Route path='/survey' 
                element={
                    !user ? <Navigate to='/signin' /> :
                    !isCalibrated ? <Navigate to='/calibration' /> : <Survey />
                } 
            />
    </Routes>
  )
}

export default App
