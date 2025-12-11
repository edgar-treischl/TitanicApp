/*Full-bleed chart:*/

import React, { useState } from "react";
import { Typography, TextField, MenuItem, Box, Container } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

export default function TitanicPrediction() {
  const [sex, setSex] = useState("male");
  const [age, setAge] = useState(30);
  const [pclass, setPclass] = useState(1);

  const prediction = predictSurvival(sex, age, pclass);

  const data = {
    labels: ["Predicted Probability"],
    datasets: [
      {
        label: "Prediction",
        data: [prediction],
        backgroundColor: "#E69F00",
        borderRadius: 8,
      }
    ],
  };

  const options = {
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      datalabels: {
        color: '#2C3E50',
        anchor: 'end',
        align: 'end',
        font: { size: 16, weight: 'bold' },
        formatter: (value) => `${value}%`
      },
      tooltip: {
        callbacks: {
          label: (context) => `Survival: ${context.raw}%`
        }
      }
    },
    scales: {
      x: { max: 100, title: { display: true, text: "Survival Probability (%)" } },
      y: { display: false }
    }
  };

  return (
    <Box sx={{ backgroundColor: 'grey.50', minHeight: '100vh', py: 6 }}>
      
      {/* Top Section: Text + Inputs */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            alignItems: 'flex-start', 
            gap: 4 
          }}
        >
          {/* Text */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Titanic Survival Prediction
            </Typography>
            <Typography paragraph sx={{ lineHeight: 1.5, fontSize: '0.95rem' }}>
              Adjust passenger details on the right side to predict survival probability using logistic regression.
            </Typography>
          </Box>

          {/* Inputs */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 200 }}>
            <TextField
              select
              label="Sex"
              size="small"
              value={sex}
              onChange={e => setSex(e.target.value)}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>

            <TextField
              type="number"
              label="Age"
              size="small"
              value={age}
              onChange={e => setAge(Number(e.target.value))}
              onBlur={() => { if (age < 1) setAge(1); if (age > 99) setAge(99); }}
              inputProps={{ min: 1, max: 99 }}
            />

            <TextField
              select
              label="Passenger Class"
              size="small"
              value={pclass}
              onChange={e => setPclass(Number(e.target.value))}
            >
              <MenuItem value={1}>First class</MenuItem>
              <MenuItem value={2}>Second class</MenuItem>
              <MenuItem value={3}>Third class</MenuItem>
            </TextField>
          </Box>
        </Box>
      </Container>

      {/* Chart Section */}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: { xs: '95%', sm: '70%', md: '60%' } }}>
          <Bar data={data} options={options} />
        </Box>
      </Box>
    </Box>
  );
}

// Logistic regression prediction function
function predictSurvival(sex, age, pclass) {
  const coef = { intercept: 5.056, sexMale: -2.522, age: -0.0369, pclass: -1.2885 };
  let x = coef.intercept;
  if (sex === "male") x += coef.sexMale;
  x += coef.age * age;
  x += coef.pclass * pclass;
  return Math.round((1 / (1 + Math.exp(-x))) * 100);
}
