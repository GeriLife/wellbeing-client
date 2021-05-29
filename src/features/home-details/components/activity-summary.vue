<template>
  <div class="q-mt-sm">
    <div>
      <report-settings-form
        class="d-inline"
        :settings.sync="settings"
        :show-bar-mode="false"
      />
    </div>
    <div class="row justify-evenly">
      <div class="col-12">
        <div :id="residentActivitiesSummary" />
      </div>
      <div class="col-5">
        <div :id="homeActivityCountsByActivityTypeChart" />
      </div>
      <div class="col-5">
        <div :id="homeActivityCountsByFacilitatorRoleChart" />
      </div>
    </div>
  </div>
</template>
<script>
import {
  getHomeResidentsActivitySumsByType,
  getHomeActivityTypeMetrics,
  getHomeActivitiesFacilitatorRoleMetrics,
} from "../services/detail-services";
import {
  renderActivitySumsByType,
  renderActivityMetricsChart,
  renderFacilitatorChart,
} from "../services/chart-services";
import ReportSettingsForm from "src/components/ReportSettingsForm.vue";

export default {
  components: {
    ReportSettingsForm,
  },
  props: {
    homeId: { type: String, required: true },
  },
  data() {
    return {
      activitySumsByType: [],
      period: "week",
      settings: {
        timePeriod: "week",
        activityMetric: "activity_minutes",
      },
      activityMetricsData: [],
      rolesData: [],
      residentActivitiesSummary: "residentActivitiesSummary",
      homeActivityCountsByActivityTypeChart:
        "homeActivityCountsByActivityTypeChart",
      homeActivityCountsByFacilitatorRoleChart:
        "homeActivityCountsByFacilitatorRoleChart",
    };
  },

  computed: {
    activityPeriod() {
      return this.settings.timePeriod === "week" ? "7" : "30";
    },
    activityMetric() {
      return this.settings.activityMetric === "activity_minutes"
        ? "minutes"
        : "count";
    },
  },

  async mounted() {
    await this.$nextTick();
    await this.getActivityData();
  },

  methods: {
    async getActivityData() {
      this.activitySumsByType = await getHomeResidentsActivitySumsByType(
        this.homeId,
        this.activityPeriod
      );
      renderActivitySumsByType(
        this.residentActivitiesSummary,
        this.activitySumsByType,
        this.activityMetric
      );

      this.activityMetricsData = await getHomeActivityTypeMetrics(
        this.homeId,
        this.activityPeriod
      );
      renderActivityMetricsChart(
        this.homeActivityCountsByActivityTypeChart,
        this.activityMetric,
        this.activityMetricsData
      );

      this.rolesData = await getHomeActivitiesFacilitatorRoleMetrics(
        this.homeId,
        this.activityPeriod
      );
      renderFacilitatorChart(
        this.homeActivityCountsByFacilitatorRoleChart,
        this.activityMetric,
        this.rolesData
      );
    },
  },

  watch: {
    activityPeriod() {
      this.getActivityData();
    },
    activityMetric() {
      this.getActivityData();
    },
  },
};
</script>
<style scoped>
.d-inline {
  display: inline;
  margin-left: 5px;
}
</style>
