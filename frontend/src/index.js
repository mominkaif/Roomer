import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProfilesContextProvider } from './context/ProfileContext'
import { AuthContextProvider } from './context/AuthContext'
import { NewProfileContextProvider } from './context/NewProfileContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <NewProfileContextProvider>
       <ProfilesContextProvider>
          <App />
       </ProfilesContextProvider>
      </NewProfileContextProvider>
    </AuthContextProvider>
    
  </React.StrictMode>
);