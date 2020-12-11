<template>
  <div class="fit" :id="calendarId"></div>
</template>
<script>
import { getDaywiseActivityDurationApi } from "../services/resident-services";
import { renderCalendarChart } from "../services/chart-services";
import * as d3 from "d3";

export default {
  props: { residentId: { type: String, required: true } },

  data() {
    return {
      calendarId: "activity-calendar-container",
    };
  },

  created() {
    this.renderCalendar();
  },

  beforeDestroy() {
    d3.selectAll(".RdYlGn").remove();
  },

  methods: {
    async renderCalendar() {
      const data = await getDaywiseActivityDurationApi(this.residentId);
      renderCalendarChart(this.calendarId, "RdYlGn", data);
    },
  },
};
</script>

<style lang="scss">
.RdYlGn {
  padding-left: 5em;
}

.day {
  fill: $heatmap-bg;
  stroke: $heatmap-stroke;
}

.month {
  fill: none;
  stroke: $heatmap-bg;
  stroke-width: 4px;
}
.year-title {
  font-size: 1.5em;
}

/* color ranges */
.RdYlGn .q0-11 {
  fill: $heatmap-r0;
}
.RdYlGn .q1-11 {
  fill: $heatmap-r1;
}
.RdYlGn .q2-11 {
  fill: $heatmap-r2;
}
.RdYlGn .q3-11 {
  fill: $heatmap-r3;
}
.RdYlGn .q4-11 {
  fill: $heatmap-r4;
}
.RdYlGn .q5-11 {
  fill: $heatmap-r5;
}
.RdYlGn .q6-11 {
  fill: $heatmap-r6;
}
.RdYlGn .q7-11 {
  fill: $heatmap-r7;
}
.RdYlGn .q8-11 {
  fill: $heatmap-r8;
}
.RdYlGn .q9-11 {
  fill: $heatmap-r9;
}
</style>