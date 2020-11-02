import Plotly from "plotly.js/dist/plotly.min.js";
import { i18n } from "src/boot/i18n";

export const renderChart = (
  chartName,
  activityData,
  activityMetric = "activity_minutes",
  barMode = "group"
) => {
  // Chart data consists of multiple traces
  const data = activityData.map(activityCategoryData => ({
    type: "bar",
    name: activityCategoryData.key,
    // X values are activity dates
    x: activityCategoryData.values.map(activityCategoryDay => {
      return new Date(activityCategoryDay.key);
    }),
    // Y values toggle between activity counts and minutes
    y: activityCategoryData.values.map(activityCategoryDay => {
      return activityCategoryDay.value[activityMetric];
    })
  }));

  // Add plot layout configuration
  const layout = {
    title: i18n.t("homeResidentsActivitiesChart-title"),
    xaxis: {
      title: i18n.t("reportPageActivitiesChart-xaxis-title")
    },
    yaxis: {
      title: i18n.t(`homeResidentsActivitiesChart-yaxis-${activityMetric}`)
    },
    barmode: barMode
  };

  // Render plot
  Plotly.newPlot(chartName, data, layout, {
    locale: i18n.locale
  });
};
