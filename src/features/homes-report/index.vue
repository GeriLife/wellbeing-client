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
    </q-card-section>
  </q-card>
</template>
<script>
import { getMonthlyAggregatedHomeResidentActivities } from "./services/list-services";
import { getHomeDetailsApi } from "src/services/homes.js";
import ReportSettingsForm from "src/components/ReportSettingsForm.vue";
import { renderChart } from "./services/generate-report-service";

export default {
  components: {
    ReportSettingsForm
  },
  data() {
    return {
      home: null,
      settings: {
        barMode: "stack",
        timePeriod: "month",
        activityMetric: "activity_minutes"
      },
      activityData: null,
      chartName: "homeResidentsActivitiesChart"
    };
  },
  async created() {
    this.home = await getHomeDetailsApi(this.$route.params.id);
    await this.getData();
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
    }
  },

  methods: {
    renderChart() {
      renderChart(
        this.chartName,
        this.activityData,
        this.settings.activityMetric,
        this.settings.barMode
      );
    },
    async getData() {
      this.activityData = await getMonthlyAggregatedHomeResidentActivities(
        this.$route.params.id,
        this.settings.timePeriod
      );
    }
  }
};
</script>
