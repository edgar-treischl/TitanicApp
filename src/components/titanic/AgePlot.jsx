import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import titanicData from "../../data/titanic.json";

// Helper: compute histogram bins
function getHistogram(data, binSize = 5, max = 80) {
  const bins = Array.from({ length: Math.ceil(max / binSize) }, (_, i) => ({
    bin: `${i * binSize}-${(i + 1) * binSize}`,
    count: 0,
  }));

  data.forEach((value) => {
    if (value != null) {
      const index = Math.min(Math.floor(value / binSize), bins.length - 1);
      bins[index].count += 1;
    }
  });

  return bins;
}

export default function AgePlot() {
  // Separate ages by survival
  const survivedAges = titanicData
    .filter((d) => d.Age != null && d.Survived === "Survived")
    .map((d) => d.Age);

  const notSurvivedAges = titanicData
    .filter((d) => d.Age != null && d.Survived === "Not survived")
    .map((d) => d.Age);

  // Histogram bins
  const binSize = 5;
  const maxAge = 80;
  const survivedBins = getHistogram(survivedAges, binSize, maxAge);
  const notSurvivedBins = getHistogram(notSurvivedAges, binSize, maxAge);

  // Merge bins for Nivo
  const data = survivedBins.map((bin, i) => ({
    bin: bin.bin,
    Survived: bin.count,
    "Not survived": notSurvivedBins[i].count,
  }));

  // Colors
  const colors = {
    Survived: "#E69F00",       // gold/orange
    "Not survived": "#009E73", // teal/green
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ResponsiveBar
        data={data}
        keys={["Not survived", "Survived"]}
        indexBy="bin"
        margin={{ top: 30, right: 30, bottom: 60, left: 60 }}
        padding={0.3}
        groupMode="overlay"
        colors={({ id }) => colors[id]}
        enableGridX={false}
        enableGridY={true}
        axisBottom={{
          tickRotation: -45,
          legend: "Age",
          legendPosition: "middle",
          legendOffset: 40,
        }}
        axisLeft={{
          legend: "Count",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        theme={{
          background: "white",
          grid: { line: { stroke: "#e0e0e0" } },
          tooltip: { container: { fontSize: "13px" } },
        }}
        tooltip={({ id, value, indexValue }) => (
          <strong>
            {id} (Age {indexValue}): {value}
          </strong>
        )}
      />
    </div>
  );
}
