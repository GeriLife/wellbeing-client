import Plotly from "plotly.js/dist/plotly.min.js";
import { i18n } from "src/boot/i18n";
import { $axios } from "src/boot/axios";
import { errorNotifier } from "src/utils/notifier.js";

const transformChartData = (activityCategoryData, activityMetric) => {
  // Create a trace for each activity type
  return {
    type: "bar",
    name: activityCategoryData.key,
    // X values are activity dates
    x: activityCategoryData.values.map(activityCategoryDay => {
      return new Date(activityCategoryDay.key);
    }),
    // Y values are (currently) activity minutes
    y: activityCategoryData.values.map(activityCategoryDay => {
      return activityCategoryDay.value[activityMetric];
    })
  };
};

export const prepareChartData = (
  activityMetric,
  barMode,
  activityData,
  chartName
) => {
  // Chart data consists of multiple traces
  const data = activityData.map(activityCategoryData =>
    transformChartData(activityCategoryData, activityMetric)
  );
  // Add plot layout configuration
  const layout = {
    title: i18n.t("reportPageActivitiesChart-title"),
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
  Plotly.newPlot(chartName, data, layout, { locale });
};

export const getActivitiesAggregateReport = async (timePeriod, aggregateBy) => {
  try {
    const response = await $axios.post(
      "/api/methods/getActivitiesAggregateReportApi",
      {
        timePeriod,
        aggregateBy
      }
    );
    return response.data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};
