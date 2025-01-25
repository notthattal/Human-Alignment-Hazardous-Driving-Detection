import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { AuthContextProvider } from './components/Auth/AuthContext';
import { WebGazerProvider } from './components/WebGazer/WebGazerContext';

declare global {
  interface Window {
    webgazer: any;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <WebGazerProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WebGazerProvider>
    </AuthContextProvider>
  </React.StrictMode>
);