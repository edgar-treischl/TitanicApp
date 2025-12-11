import React, { useState } from "react";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Paper
} from "@mui/material";

// Load your exported data
import scatter from "../../data/titanic_scatter.json";
import linearCurve from "../../data/linear_curve.json";
import logitCurve from "../../data/logit_curve.json";
import probitCurve from "../../data/probit_curve.json";

const CURVES = {
  linear: linearCurve,
  logit: logitCurve,
  probit: probitCurve
};

export default function LogitVsLinear() {
  const [method, setMethod] = useState("linear");

  return (
    <Paper elevation={2} sx={{ p: 2, height: 400 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>

        {/* Modern MUI Toggle Group */}
        <ToggleButtonGroup
          value={method}
          exclusive
          size="small"
          onChange={(e, v) => v && setMethod(v)}
        >
          <ToggleButton value="linear">Linear</ToggleButton>
          <ToggleButton value="logit">Logit</ToggleButton>
          <ToggleButton value="probit">Probit</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ height: "330px" }}>
        <ResponsiveScatterPlot
          data={[
            { id: "points", data: scatter }
          ]}
          margin={{ top: 20, right: 20, bottom: 50, left: 55 }}
          xScale={{ type: "linear" }}
          yScale={{ type: "linear", min: -0.1, max: 1.1 }}
          colors={["#777"]} // scatter point color

          // === Minimal Clean Grid Lines ===
          enableGridX={true}
          enableGridY={true}
          gridXValues={5}
          gridYValues={3}
          theme={{
            grid: {
              line: {
                stroke: "#e0e0e0",
                strokeWidth: 1,
                strokeDasharray: "3 3"
              }
            }
          }}

          axisLeft={null}
          axisBottom={{
            legend: "x",
            legendPosition: "middle",
            legendOffset: 36
          }}

          layers={[
            "grid",
            "axes",
            "nodes",

            // Smooth curve layer
            (props) => {
              const curveData = CURVES[method];
              const { xScale, yScale } = props;

              const path = curveData
                .map((p, i) => {
                  const x = xScale(p.x);
                  const y = yScale(p.y);
                  return i === 0 ? `M ${x},${y}` : `L ${x},${y}`;
                })
                .join(" ");

              return (
                <path
                  d={path}
                  fill="none"
                  stroke="#008080"
                  strokeWidth={4}
                />
              );
            },

            "mesh",
            "legends"
          ]}

          nodeSize={7}
        />
      </Box>
    </Paper>
  );
}
