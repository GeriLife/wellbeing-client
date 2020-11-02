import Plotly from "plotly.js/dist/plotly.min.js";

export const renderChart = (chartName, activityLevelCounts) => {
  const colors = ["#d9534f", "#e6c829", "#5cb85c"];

  if (!activityLevelCounts || activityLevelCounts.length === 0) {
    return;
  }
  // Render chart then data is ready
  const data = activityLevelCounts.map((dataset, index) => {
    return {
      type: "bar",
      orientation: "h",
      // Activity type
      name: dataset.type,
      // Activity count
      x: [dataset.homePercentage],
      marker: { color: colors[index] },
      width: [0.8],
      hoverinfo: "x+"
    };
  });

  // Add plot layout configuration
  const layout = {
    autosize: true,
    paper_bgcolor: "transparent",
    hovermode: "closest",
    plot_bgcolor: "transparent",
    height: 50,
    xaxis: {
      showline: true,
      automargin: true,
      showticklabels: true,
      tickfont: {
        size: 10
      },
      ticklen: 4,
      ticksuffix: "%",
      range: [0, 100]
    },
    yaxis: {
      showline: false,
      automargin: true,
      showticklabels: false
    },
    margin: {
      r: 15,
      t: 10,
      b: 5,
      l: 10
    },
    barmode: "stack",
    showlegend: false
  };
  // Render plot
  Plotly.newPlot(chartName, data, layout, {
    displayModeBar: false,
    responsive: true
  });
};
