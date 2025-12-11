// src/main.jsx
import '@fontsource/roboto';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { HelmetProvider } from "react-helmet-async";
import './index.css';

import App from './App';

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';  // <-- import your custom theme

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter>
          <App />
        </HashRouter>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
