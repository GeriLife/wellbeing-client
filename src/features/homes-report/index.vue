<template>
  <q-card class="full-width">
    <q-card-section>
      <div class="row" v-if="home">
        <span class="text-h5">
          <em class="q-ml-sm fa fa-home"></em>&nbsp; {{ home.name }}&nbsp;</span
        >
      </div>
    </q-card-section>

    <q-card-section>
      <report-settings-form class="q-ml-sm" :settings.sync="settings" />

      <div :id="chartName" />
      <div :id="roleChartName" />
    </q-card-section>
    <div v-if="loading" class="center-aligned">
      <q-circular-progress
        :value="61"
        indeterminate
        size="50px"
        :thickness="0.22"
        color="primary"
        track-color="grey-3"
        class="q-ma-md"
      />
    </div>
  </q-card>
</template>
<script>
import {
  getMonthlyAggregatedHomeResidentActivities,
  getMonthlyAggregatedActivitiesByRoles,
} from "./services/list-services";
import { getHomeDetailsApi } from "src/services/homes.js";
import ReportSettingsForm from "src/components/ReportSettingsForm.vue";
import {
  renderChart,
  renderRolesChart,
} from "./services/generate-report-service";

export default {
  components: {
    ReportSettingsForm,
  },
  data() {
    return {
      home: null,
      loading: false,
      settings: {
        barMode: "stack",
        timePeriod: "month",
        activityMetric: "activity_minutes",
      },
      activityData: null,
      chartName: "homeResidentsActivitiesChart",
      roleChartName: "homeResidentsActivitiesByRolesChart",
    };
  },
  async created() {
    this.loading = true;
    this.home = await getHomeDetailsApi(this.$route.params.id);
    await this.getData();
    this.loading = false;

    this.renderChart();
  },

  watch: {
    async "settings.timePeriod"() {
      await this.getData();
      this.renderChart();
    },
    "settings.activityMetric"() {
      this.renderChart();
    },
    "settings.barMode"() {
      this.renderChart();
    },
  },

  methods: {
    renderChart() {
      renderChart(
        this.chartName,
        this.activityData,
        this.settings.activityMetric,
        this.settings.barMode
      );

      renderRolesChart(
        this.roleChartName,
        this.activityRoleData,
        this.settings.activityMetric,
        this.settings.barMode
      );
    },
    async getData() {
      this.loading = true;
      this.activityData = await getMonthlyAggregatedHomeResidentActivities(
        this.$route.params.id,
        this.settings.timePeriod
      );
      this.activityRoleData = await getMonthlyAggregatedActivitiesByRoles(
        this.$route.params.id,
        this.settings.timePeriod
      );
      this.loading = false;
    },
  },
};
</script>
