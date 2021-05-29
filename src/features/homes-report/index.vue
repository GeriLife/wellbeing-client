<template>
  <q-card class="full-width">
    <q-card-section>
      <div class="row" v-if="home">
        <span class="text-h4">
          <em class="q-ml-sm fa fa-home"></em>&nbsp; {{ home.name }}&nbsp;</span
        >
        <span class="text-h6 text-grey-6"
          >({{ $i18n.t("homeReport-header") }})</span
        >
      </div>
    </q-card-section>

    <q-card-section>
      <report-settings-form class="q-ml-sm" :settings.sync="settings" />
      
      <div :id="chartName" />
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
import { getMonthlyAggregatedHomeResidentActivities } from "./services/list-services";
import { getHomeDetailsApi } from "src/services/homes.js";
import ReportSettingsForm from "src/components/ReportSettingsForm.vue";
import { renderChart } from "./services/generate-report-service";

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
    },
    async getData() {
      this.loading = true;
      this.activityData = await getMonthlyAggregatedHomeResidentActivities(
        this.$route.params.id,
        this.settings.timePeriod
      );
      this.loading = false;
    },
  },
};
</script>
