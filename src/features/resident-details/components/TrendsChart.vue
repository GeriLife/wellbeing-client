<template>
  <div class="row">
    <div class="col-12">
      <report-settings-form class="d-inline" :settings.sync="settings" />
    </div>
    <div class="col-12" :id="trendChartId"></div>
  </div>
</template>
<script>
import { getResidentAggregatedActivitiesApi } from "../services/resident-services";
import { renderTrendsChart } from "../services/chart-services";
import ReportSettingsForm from "src/components/ReportSettingsForm.vue";

export default {
  props: {
    residentId: { type: String, required: true },
  },

  components: {
    ReportSettingsForm,
  },

  data() {
    return {
      trendChartId: "activityTrendChart",
      trends: null,
      settings: {
        barMode: "stack",
        timePeriod: "week",
        activityMetric: "activity_minutes",
      },
    };
  },

  created() {
    this.getActivityTrends();
  },

  methods: {
    async getActivityTrends() {
      this.trends = await getResidentAggregatedActivitiesApi(
        this.residentId,
        this.settings.timePeriod
      );
      renderTrendsChart(this.trendChartId, this.trends, this.settings);
    },
  },

  watch: {
    settings: {
      deep: true,
      handler(nv, ov) {
        if (nv.timePeriod !== ov.timePeriod) {
          this.getActivityTrends();
        } else {
          renderTrendsChart(this.trendChartId, this.trends, this.settings);
        }
      },
    },
  },
};
</script>