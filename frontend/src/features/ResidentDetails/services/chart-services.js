import * as d3 from "d3";
import Plotly from "plotly.js/dist/plotly.min.js";
import { i18n } from "src/boot/i18n";

export const renderFeelingsChart = (id, chartData) => {
  // Render chart with current feeling percentages
  const data = [
    {
      type: "bar",
      orientation: "h",
      marker: { color: "#b6b6fc" },
      x: chartData.map(item => d3.format(".0%")(item.value)),
      y: chartData.map(item => item.localizedFeeling)
    }
  ];

  // Add plot layout configuration
  const layout = {
    autosize: true,
    height: 300,
    title: i18n.t("residentFeelings-chart-title"),
    xaxis: {
      showgrid: false,
      showline: true,
      automargin: true,
      showticklabels: true,
      tickfont: {
        size: 10
      },
      tickwidth: 0.5,
      ticklen: 10
    },
    yaxis: {
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
    bargap: 0.3,
    showlegend: false
  };

  // Get client locale
  const locale = i18n.locale;
  Plotly.newPlot(id, data, layout, { locale });
};

export const renderTrendsChart = (trendChartId, trends = {}, settings = {}) => {
  const { barMode, activityMetric } = settings;
  // Get translation strings
  const activityTrendTitle = i18n.t("residentActivityTrendChart-title");

  // Chart data consists of multiple traces
  const data = trends.map(activityCategoryData =>
    // Create a trace for each activity type
    ({
      type: "bar",
      name: activityCategoryData.key,
      // X values are activity dates
      x: activityCategoryData.values.map(
        activityCategoryDay => new Date(activityCategoryDay.key)
      ),
      y: activityCategoryData.values.map(
        activityCategoryDay => activityCategoryDay.value[activityMetric]
      )
    })
  );

  // Add plot layout configuration
  const layout = {
    title: activityTrendTitle,
    xaxis: {
      title: i18n.t("reportPageActivitiesChart-xaxis-title")
    },
    yaxis: {
      title: i18n.t(`reportPageActivitiesChart-yaxis-${activityMetric}`)
    },
    barmode: barMode
  };

  // Get client locale
  const locale = i18n.locale;

  // Render plot
  Plotly.newPlot(trendChartId, data, layout, { locale });
};

export const renderTypesChart = (id, activityTypeCounts = []) => {
  const data = [
    {
      type: "bar",
      y: activityTypeCounts.map(r => r.key.substr(0, 6)),
      x: activityTypeCounts.map(r => r.value),
      text: activityTypeCounts.map(r => `${r.key}`),
      marker: {
        color: "#9ac0db"
      },
      orientation: "h"
    }
  ];

  const layout = {
    xaxis: {
      title: i18n.t("residentActivityTypesChart-xAxis-title")
    },
    yaxis: {
      title: i18n.t("residentActivityTypesChart-yAxis-title")
    }
  };

  const locale = i18n.locale;

  Plotly.newPlot(id, data, layout, {
    locale,
    responsive: true
  });
};

export const renderFacilitatorTypesChart = (id, facilitatorRoleCounts = []) => {
  const data = [
    {
      type: "bar",
      y: facilitatorRoleCounts.map(r => r.key.substr(0, 6)),
      x: facilitatorRoleCounts.map(r => r.value),
      text: facilitatorRoleCounts.map(r => `${r.key}`),
      marker: {
        color: "#9ac0db"
      },
      orientation: "h"
    }
  ];

  const layout = {
    xaxis: {
      title: i18n.t("residentFacilitatorRolesChart-xAxis-title")
    },
    yaxis: {
      title: i18n.t("residentFacilitatorRolesChart-yAxis-title")
    }
  };

  const locale = i18n.locale;

  Plotly.newPlot(id, data, layout, {
    locale,
    responsive: true
  });
};

export const renderCalendarChart= (id, summedActivities)=>{
  //ToDo:: implement calendar chart
}