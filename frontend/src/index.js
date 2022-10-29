import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProfilesContextProvider } from './context/ProfileContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProfilesContextProvider>
      <App />
    </ProfilesContextProvider>
  </React.StrictMode>
);