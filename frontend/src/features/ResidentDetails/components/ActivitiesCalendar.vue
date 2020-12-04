<template>
  <svg class="fill-height full-width" :id="calendarId"></svg>
</template>
<script>
import { getDaywiseActivityDurationApi } from "../services/resident-services";
import { renderCalendarChart } from "../services/chart-services";

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

  methods: {
    async renderCalendar() {
      const data = await getDaywiseActivityDurationApi(this.residentId);
      renderCalendarChart(this.calendarId, data);
    },
  },
};
</script>
<style lang="scss" scoped>
.fill-height {
  height: 100vh;
}
</style>