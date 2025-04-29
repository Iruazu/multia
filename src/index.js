import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/variables.css';
import './styles/global.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);