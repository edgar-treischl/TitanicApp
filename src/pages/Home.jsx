import React, { useState } from 'react';
import { Typography, Tabs, Tab, CardMedia, Box, Container } from '@mui/material';
import CardPanel from '../components/CardPanel';

import SurvivalPlot from '../components/titanic/SurvivalPlot';
import SexPlot from '../components/titanic/SexPlot';
import ClassPlot from '../components/titanic/ClassPlot';
import AgePlot from '../components/titanic/AgePlot';


export default function Titanic() {
  const [tab, setTab] = useState(0);
  const tabLabels = ['Survival', 'Sex', 'Class', 'Age'];

  return (
    <Box sx={{ backgroundColor: 'grey.50', minHeight: '100vh', py: 6 }}>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
          The Titanic
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
          The RMS Titanic was a British passenger liner that sank in the North Atlantic Ocean in April 1912 after striking an iceberg during its maiden voyage from Southampton to New York City.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
          Over <strong>1,500 people</strong> lost their lives in the disaster, making it one of the deadliest commercial peacetime maritime tragedies in modern history.
        </Typography>

        <CardMedia
          component="img"
          image="https://upload.wikimedia.org/wikipedia/commons/f/fd/RMS_Titanic_3.jpg"
          alt="RMS Titanic"
          sx={{
            borderRadius: 2,
            mt: 3,
            width: '100%',
            maxHeight: 250,
            objectFit: 'cover',
            boxShadow: 3
          }}
        />

        <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
          Image: RMS Titanic, Wikimedia Commons
        </Typography>
      </Container>

      {/* Tabbed Plots Section */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
          This app demonstrates logistic regression by estimating the effect of passenger's sex, class, and age on survival during the Titanic accident.
        </Typography>
        <CardPanel>
          {/* Tabs */}
          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{ mb: 2 }}
          >
            {tabLabels.map((label, i) => (
              <Tab
                key={i}
                label={label}
                sx={{ textTransform: 'none', fontWeight: 'medium' }}
              />
            ))}
          </Tabs>

          {/* Plot */}
          <Box sx={{ mt: 2, width: '100%', height: 400 }}>
            {tab === 0 && <SurvivalPlot />}
            {tab === 1 && <SexPlot />}
            {tab === 2 && <ClassPlot />}
            {tab === 3 && <AgePlot />}
          </Box>
        </CardPanel>
      </Container>

      {/* Subsections */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Insights
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
          The plots allow you to explore how different variables affected survival. 
          For example, male passengers had lower survival odds, while higher-class passengers had higher chances of survival.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
          Observing the effect of age demonstrates how logistic regression captures continuous predictors. 
          You can switch tabs to focus on each variable individually and compare their impact.
        </Typography>
      </Container>

    </Box>
  );
}
