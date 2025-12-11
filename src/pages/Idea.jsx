import React from "react";
import { Box, Typography, Container } from "@mui/material";
import CardPanel from "../components/CardPanel";
import LogitVsLinear from "../components/titanic/LogitVsLinear";

export default function Idea() {
  return (
    <Box sx={{ backgroundColor: "grey.50", minHeight: "100vh", py: 6 }}>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
          Logistic Regression — But Why?
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
          There are several reasons why logistic regression was invented to model binary outcomes.
          The most obvious one is right there in the figure below. Imagine trying to fit a simple regression line to predict a binary outcome.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
          In linear regression, we fit a line that minimizes error assuming the error variance is constant (homoscedastic).
          But when the outcome is binary, the error variance depends on the value of X — and here’s the catch: the outcome can only be 0 or 1.
          This mismatch causes problems.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
          Next up, you’ll see how logistic and probit functions distribute probabilities differently.
          Instead of trying to fit a straight line, logistic regression uses a sigmoid (S-shaped) curve — the logit function — to better capture the relationship between X and Y.
        </Typography>

        <Typography variant="caption" display="block" sx={{ mt: 1, color: "text.secondary" }}>
          Note: The scatter plot data is simulated, which is why it looks nice and smooth.
        </Typography>
      </Container>

      {/* Plot Section - aligned with hero text */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        <CardPanel>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Visual Example
          </Typography>
          <LogitVsLinear />
        </CardPanel>
      </Container>

      {/* Subsections */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Key Takeaways
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
          Logistic regression works well for binary outcomes because it constrains predicted probabilities between 0 and 1.
          Linear regression does not, which can lead to unrealistic predictions and heteroskedastic errors.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
          Probit regression is very similar to logistic regression but uses the cumulative normal distribution function instead of the logistic function.
          Both produce S-shaped curves, with slight differences in tails.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
          Visualizing these curves side by side or interactively allows students to grasp why generalized linear models are necessary for binary outcomes.
        </Typography>
      </Container>

    </Box>
  );
}
