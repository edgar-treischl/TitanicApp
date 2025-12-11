// src/pages/OddsRatios.jsx

import React, { useState, useEffect } from "react";
import {
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Container
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import CardPanel from "../components/CardPanel";

// Local JSON data
import or_m1 from "../data/or_m1.json";
import or_m2 from "../data/or_m2.json";
import or_m3 from "../data/or_m3.json";

export default function OddsRatios() {
  const [model, setModel] = useState("m1");
  const [data, setData] = useState([]);

  const labelMap = {
    "Sexmale": "Male",
    "PclassSecond class": "2nd Class",
    "PclassThird class": "3rd Class",
    "Age": "Age",
  };

  useEffect(() => {
    const datasets = { m1: or_m1, m2: or_m2, m3: or_m3 };
    const withLabels = (datasets[model] || []).map((d) => ({
      ...d,
      displayLabel: labelMap[d.term] || d.term,
    }));
    setData(withLabels);
  }, [model]);

  const modelTitles = {
    m1: "Model 1: Sex",
    m2: "Model 2: Sex + Passenger Class",
    m3: "Model 3: Sex + Passenger Class + Age",
  };

  return (
    <Box sx={{ backgroundColor: "grey.50", minHeight: "100vh", py: 6 }}>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
          Understanding Odds Ratios
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
          The odds ratio (OR) compares the odds of an event between groups. 
          For example, if men had the same odds of survival as women, the OR would be 1.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
          The odds for men are calculated as survived / not survived = 109 / 468. 
          For women, the odds are 233 / 81. Dividing the men’s odds by the women’s odds gives the Odds Ratio (OR). 
          Therefore, the OR for men is 0.081, indicating that men were less likely to survive compared to women.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
          Try different models to see how each variable affects survival probabilities in a more intuitive way.
        </Typography>
      </Container>

      {/* Plot Section - centered and aligned */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        <CardPanel>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Typography variant="h6">Odds Ratio Plot</Typography>
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={model}
              onChange={(e, newModel) => newModel && setModel(newModel)}
              size="small"
            >
              <ToggleButton value="m1">Model 1</ToggleButton>
              <ToggleButton value="m2">Model 2</ToggleButton>
              <ToggleButton value="m3">Model 3</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            {modelTitles[model]}
          </Typography>

          <Box sx={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
              <BarChart
                data={data}
                margin={{ top: 20, right: 20, left: 10, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="displayLabel" angle={-30} textAnchor="end" />
                <YAxis
                  domain={[0, 1]}
                  label={{
                    value: "Odds Ratio",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  formatter={(value) => value.toFixed(3)}
                  labelFormatter={(label) => `Term: ${label}`}
                />
                <ReferenceLine y={1} stroke="#E74C3C" strokeDasharray="4 4" />
                <Bar dataKey="oddsRatio" fill="#2C3E50">
                  <LabelList
                    dataKey="oddsRatio"
                    position="top"
                    formatter={(v) => v.toFixed(3)}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </CardPanel>
      </Container>

      {/* Subsections */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Key Takeaways
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
          Logistic regression odds ratios allow us to quantify the effect of each predictor on survival odds. 
          An OR &gt; 1 indicates increased odds, OR = 1 means no effect, and 0 &lt; OR &lt; 1 indicates decreased odds.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
          Observing multiple models shows how adding variables like passenger class and age affects the ORs of other predictors. 
          This helps students understand confounding and model adjustment.
        </Typography>
      </Container>

    </Box>
  );
}

