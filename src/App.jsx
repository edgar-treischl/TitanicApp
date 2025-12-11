// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import Navbar from './Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Alluvial from './pages/Alluvial';
import Idea from './pages/Idea';
import Models from './pages/Models';
import OddsRatios from './pages/OddsRatios';
import TitanicPrediction from './pages/TitanicPrediction';
import Roc from './pages/Roc';

export default function App() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: { xs: '1rem', md: '1rem 2rem' },
          backgroundColor: '#f0f2f5',
          boxSizing: 'border-box',
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Helmet>
                  <title>Home | The Titanic App</title>
                  <meta name="description" content="The Titanic App." />
                </Helmet>
                <Home />
              </>
            }
          />
          <Route
            path="/variables"
            element={
              <>
                <Helmet>
                  <title>Variables | The Titanic App</title>
                  <meta name="description" content="Explore variable relationships." />
                </Helmet>
                <Alluvial />
              </>
            }
          />
          <Route
            path="/idea"
            element={
              <>
                <Helmet>
                  <title>Idea | The Titanic App</title>
                  <meta name="description" content="Learn about the idea behind it." />
                </Helmet>
                <Idea />
              </>
            }
          />
          <Route
            path="/oddsratios"
            element={
              <>
                <Helmet>
                  <title>Odds Ratios | The Titanic App</title>
                  <meta name="description" content="Check the odds ratios." />
                </Helmet>
                <OddsRatios />
              </>
            }
          />
          <Route
            path="/models"
            element={
              <>
                <Helmet>
                  <title>Models | The Titanic App</title>
                  <meta name="description" content="Explore predictive models." />
                </Helmet>
                <Models />
              </>
            }
          />
          <Route
            path="/roc"
            element={
              <>
                <Helmet>
                  <title>ROC | The Titanic App</title>
                  <meta name="description" content="View ROC curves and model performance." />
                </Helmet>
                <Roc />
              </>
            }
          />
          <Route
            path="/prediction"
            element={
              <>
                <Helmet>
                  <title>Prediction | The Titanic App</title>
                  <meta name="description" content="Make predictions." />
                </Helmet>
                <TitanicPrediction />
              </>
            }
          />
        </Routes>
      </Box>

      <Footer />
    </Box>
  );
}
