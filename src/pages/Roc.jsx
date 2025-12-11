// src/pages/Roc.jsx with step by step story telling
import React from "react";
import { Typography, Box, Card, CardContent } from "@mui/material";
import PageWrapper from "../components/PageWrapper";
import sensitivityPlot from "../assets/prediction.png";
import rocPlot from "../assets/sensitivity.png";

export default function Roc() {
  return (
    <PageWrapper gap={3} paddingY={2}>
      {/* Step 1: Sensitivity */}
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Step 1: Sensitivity
          </Typography>
          <Typography paragraph>
            Sensitivity measures how well the model identifies <b>true positives</b> — passengers who survived.
            It is calculated as: <i>true positives / all actual survivors</i> (207 / 290 ≈ 0.71).
          </Typography>
          <Box
            component="img"
            src={sensitivityPlot}
            alt="Sensitivity Plot"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 1,
              objectFit: "contain",
              backgroundColor: "#fafafa",
              mt: 2,
            }}
          />

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            Step 2: Specificity
          </Typography>
          <Typography paragraph>
            Specificity measures how well the model identifies <b>true negatives</b> — passengers who did not survive.
            Calculated as: <i>true negatives / all actual non-survivors</i> (356 / 424).
          </Typography>
        </CardContent>
      </Card>

      {/* Step 3: ROC Curve */}
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Step 3: ROC Curve
          </Typography>
          <Typography paragraph>
            The ROC curve combines sensitivity and specificity into one visualization.
            The y-axis is sensitivity, and the x-axis is the false positive rate (1 − specificity).
            A model with perfect prediction touches the top-left corner (sensitivity=1, false positive rate=0).
            The further the curve is from the diagonal, the stronger the model’s predictive power.
          </Typography>

          <Box
            component="img"
            src={rocPlot}
            alt="ROC Curve Plot"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 1,
              objectFit: "contain",
              backgroundColor: "#fafafa",
              mt: 2,
            }}
          />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
