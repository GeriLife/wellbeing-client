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

export const renderCalendarChart = (id, colorClass, summedActivities) => {
  const width = 960;
  const height = 400;
  const cellSize = 15;

  const no_months_in_a_row = Math.floor(width / (cellSize * 5 + 50));
  const shift_up = cellSize * 3;

  const day = d3.timeFormat("%w"); // day of the week
  const week = d3.timeFormat("%U"); // week number of the year
  const month = d3.timeFormat("%m"); // month number
  const year = d3.timeFormat("%Y");
  const percent = d3.format(".1%");
  const format = d3.timeFormat("%Y-%m-%d");

  const minYear = d3.min(
    summedActivities.map(r => new Date(r.timestamp).getFullYear())
  );
  const maxYear = d3.max(
    summedActivities.map(r => new Date(r.timestamp).getFullYear())
  );

  d3.selectAll(`.${colorClass}`).remove();

  const svg = d3
    .select(`#${id}`)
    .data(d3.range(minYear - 1, maxYear + 1))
    .enter()
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", `${colorClass}`)
    .append("g");

  const rect = svg
    .selectAll(".day")
    .data(d => d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
    .enter()
    .append("rect")
    .attr("class", "day")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("x", d => {
      const month_padding =
        1.2 * cellSize * 7 * ((month(d) - 1) % no_months_in_a_row);
      return day(d) * cellSize + month_padding;
    })
    .attr("y", d => {
      const week_diff = week(d) - week(new Date(year(d), month(d) - 1, 1));
      const row_level = Math.ceil(month(d) / no_months_in_a_row);
      return (
        week_diff * cellSize +
        row_level * cellSize * 8 -
        cellSize / 2 -
        shift_up
      );
    })
    .datum(format);

  svg
    .selectAll(".month-title")
    .data(function(d) {
      return d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1));
    })
    .enter()
    .append("text")
    .text(monthTitle)
    .attr("x", d => {
      const month_padding =
        1.2 * cellSize * 7 * ((month(d) - 1) % no_months_in_a_row);
      return month_padding;
    })
    .attr("y", d => {
      var week_diff = week(d) - week(new Date(year(d), month(d) - 1, 1));
      var row_level = Math.ceil(month(d) / no_months_in_a_row);
      return (
        week_diff * cellSize + row_level * cellSize * 8 - cellSize - shift_up
      );
    })
    .attr("class", "month-title")
    .attr("d", monthTitle);

  svg
    .selectAll(".year-title")
    .data(d => d3.timeYears(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
    .enter()
    .append("text")
    .text(yearTitle)
    .attr("x", function(d, i) {
      return width / 2 - 100;
    })
    .attr("y", function(d, i) {
      return cellSize * 5.5 - shift_up;
    })
    .attr("class", "year-title")
    .attr("d", yearTitle);

  const activities = Array.from(
    d3.groups(summedActivities, obj => format(obj.timestamp)),
    ([key, value]) => ({ key, value })
  );

  const data = activities.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.key]: curr.value.reduce((ac, c) => ac + c.duration, 0)
    }),
    {}
  );
  const allDurations = Object.values(data);
  const color = d3
    .scaleQuantize()
    .domain([d3.min(allDurations), d3.max(allDurations)])
    .range(
      d3.range(11).map(function(d) {
        return "q" + d + "-11";
      })
    );

  rect
    .filter(d => {
      return d in data;
    })
    .attr("class", function(d) {
      return "day " + color(data[d]);
    })
    .append("title")
    .text(function(d) {
      return d + ": " + percent(data[d]);
    });

  function monthTitle(t0) {
    return t0.toLocaleString("en-us", { month: "long" });
  }
  function yearTitle(t0) {
    return t0.toString().split(" ")[3];
  }
};
