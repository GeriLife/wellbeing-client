import Plotly from "plotly.js/dist/plotly.min.js";
import { i18n } from "src/boot/i18n";

export const renderActivityChart = (chartName, dailyActivityData = {}) => {
  // Chart data consists of multiple traces
  const inactiveTrace = {
    mode: "lines",
    name: i18n.t("homeResidentActivityLevelTrend-legend-inactive"),
    line: { color: "red" },
    // X values are activity dates
    x: dailyActivityData.date,
    // Y values are activity counts
    y: dailyActivityData.inactivityCounts
  };

  const semiActiveTrace = {
    mode: "lines",
    name: i18n.t("homeResidentActivityLevelTrend-legend-semiActive"),
    line: { color: "gold" },
    // X values are activity dates
    x: dailyActivityData.date,
    // Y values are activity counts
    y: dailyActivityData.semiActivityCounts
  };

  const activeTrace = {
    mode: "lines",
    name: i18n.t("homeResidentActivityLevelTrend-legend-active"),
    line: { color: "green" },
    // X values are activity dates
    x: dailyActivityData.date,
    // Y values are activity counts
    y: dailyActivityData.activityCounts
  };

  // Add chart layout configuration
  const layout = {
    showlegend: true,
    height: 232,
    legend: {
      x: 0,
      y: 1.3,
      orientation: "h"
    },
    margin: {
      r: 40,
      t: 40,
      b: 40,
      l: 40
    },
    yaxis: {
      title: i18n.t("homeResidentActivityLevelTrend-yAxis-label")
    }
  };

  // Get client locale
  const locale = i18n.locale;

  // Render chart
  // coloring activity levels to match the 'traffic lights' theme :-)
  Plotly.newPlot(
    chartName,
    [inactiveTrace, semiActiveTrace, activeTrace],
    layout,
    { locale, displayModeBar: false }
  );
};

export const renderActivitySumsByType = (
  chartName,
  homeResidentsActivitySumsByType,
  activityMetric
) => {
  // Render chart then data is ready
  const data = homeResidentsActivitySumsByType.map(dataset => {
    return {
      type: "bar",
      orientation: "h",
      // Activity type
      name: dataset.key,
      // Activity count
      x: dataset.values.map(item => item[activityMetric]),
      // Resident name
      y: dataset.values.map(item => item.label)
    };
  });

  // Add plot layout configuration
  const layout = {
    autosize: true,
    xaxis: {
      title: i18n.t(
        `homeResidentsActivitySumsByType-chart-xaxisTitle-${activityMetric}`
      ),
      showline: true,
      automargin: true,
      showticklabels: true,
      tickfont: {
        size: 10
      },
      tickwidth: 1,
      ticklen: 4
    },
    yaxis: {
      showline: true,
      automargin: true,
      showticklabels: true,
      tickfont: {
        size: 10
      },
      tickwidth: 1,
      ticklen: 4
    },
    margin: {
      r: 10,
      t: 10,
      l: 10
    },
    bargap: 0.05,
    barmode: "stack",
    showlegend: true,
    legend: {
      traceorder: "normal",
      x: 0,
      y: 5,
      orientation: "h"
    }
  };
  // Render plot
  Plotly.newPlot(chartName, data, layout, {
    displayModeBar: false,
    responsive: true
  });
};

export const renderActivityMetricsChart = (
  chartName,
  activityMetric,
  chartData = []
) => {
  // Chart data
  const data = [
    {
      type: "bar",
      orientation: "h",
      marker: { color: "#8e8e8e" },
      x: chartData.map(item => item.value[activityMetric]),
      y: chartData.map(item => item.key)
    }
  ];

  // Add plot layout configuration
  const layout = {
    autosize: true,
    height: 250,
    xaxis: {
      title: i18n.t(
        `homeActivityCountsByActivityTypeChart-xAxis-${activityMetric}`
      ),
      showgrid: false,
      showline: true,
      automargin: true,
      showticklabels: true,
      tickfont: {
        size: 10
      },
      tickwidth: 1,
      ticklen: 8
    },
    yaxis: {
      title: i18n.t("homeActivityCountsByActivityTypeChart-yAxis-title"),
      showgrid: false,
      showline: true,
      automargin: true,
      showticklabels: true,
      tickfont: {
        size: 10
      },
      tickwidth: 1,
      ticklen: 8
    },
    margin: {
      autoexpand: true,
      r: 10,
      t: 60,
      b: 20,
      l: 80
    },
    bargap: 0.05,
    showlegend: false
  };

  // Get client locale
  const locale = i18n.locale;

  // Render plot
  Plotly.newPlot(chartName, data, layout, {
    locale
  });
};

export const renderFacilitatorChart = (
  chartName,
  activityMetric,
  chartData = []
) => {
  // Chart data
  const data = [
    {
      type: "bar",
      orientation: "h",
      marker: { color: "#8e8e8e" },
      x: chartData.map(item => item.value[activityMetric]),
      y: chartData.map(item => item.key)
    }
  ];

  // Add plot layout configuration
  const layout = {
    autosize: true,
    height: 250,
    xaxis: {
      title: i18n.t(
        `homeActivityCountsByFacilitatorRoleChart-xAxis-${activityMetric}`
      ),
      showgrid: false,
      showline: true,
      automargin: true,
      showticklabels: true,
      tickfont: {
        size: 10
      },
      tickwidth: 1,
      ticklen: 8
    },
    yaxis: {
      title: i18n.t("homeActivityCountsByFacilitatorRoleChart-yAxis-title"),
      showgrid: false,
      showline: true,
      automargin: true,
      showticklabels: true,
      tickfont: {
        size: 10
      },
      tickwidth: 1,
      ticklen: 8
    },
    margin: {
      autoexpand: true,
      r: 10,
      t: 60,
      b: 20,
      l: 80
    },
    bargap: 0.05,
    showlegend: false
  };

  // Get client locale
  const locale = i18n.locale;

  // Render plot
  Plotly.newPlot(chartName, data, layout, {
    locale
  });
};
