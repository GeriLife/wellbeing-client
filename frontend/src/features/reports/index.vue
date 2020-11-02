<template>
  <div class="full-width">
    <div class="q-mb-sm">
      <span class="text-h4"> {{ $i18n.t("report-header") }}</span>
      <report-settings-form class="d-inline" :settings.sync="settings" />
    </div>
    <div class="text-h6">
      {{ $i18n.t("report-activityByType") }}
    </div>
    <span
      >{{ $i18n.t("report-lastUpdatedAt") }}&nbsp;{{
        typeLastUpdatedDate
      }}</span
    >
    <div v-if="!loadingType" id="residentsActivitiesChartByType"></div>

    <div v-else>
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

    <!-- Chart for activity by activity roles -->
    <div class="text-h6">
      {{ $i18n.t("report-activityByRole") }}
    </div>
    <span
      >{{ $i18n.t("report-lastUpdatedAt") }}&nbsp;{{
        roleLastUpdatedDate
      }}</span
    >

    <div v-if="!loadingRole" id="residentsActivitiesChartByRole"></div>
    <div v-else>
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
  </div>
</template>
<script>
import ReportSettingsForm from "src/components/ReportSettingsForm.vue";
import Plotly from "plotly.js/dist/plotly.min.js";
import {
  getActivitiesAggregateReport,
  prepareChartData
} from "./services/chart-services";

export default {
  components: {
    ReportSettingsForm
  },
  data() {
    return {
      loadingRole: false,
      loadingType: false,
      settings: {
        barMode: "stack",
        timePeriod: "week",
        activityMetric: "activity_minutes"
      },
      roleLastUpdatedDate: null,
      typeLastUpdatedDate: null,
      rolesData: [],
      typeData: []
    };
  },
  mounted() {
    this.fetchDataAndRender();
  },

  watch: {
    "settings.timePeriod"() {
      this.fetchDataAndRender();
    },
    "settings.barMode"() {
      this.render(this.typeData, "residentsActivitiesChartByType");
      this.render(this.rolesData, "residentsActivitiesChartByRole");
    },
    "settings.activityMetric"() {
      this.render(this.typeData, "residentsActivitiesChartByType");
      this.render(this.rolesData, "residentsActivitiesChartByRole");
    }
  },

  methods: {
    render(data, type) {
      Plotly.purge(type);
      prepareChartData(
        this.settings.activityMetric,
        this.settings.barMode,
        data,
        type
      );
    },
    async fetchDataAndRender() {
      this.loadingType = true;
      const {
        activityData: typeData,
        lastUpdated: typeLastUpdatedDate
      } = await getActivitiesAggregateReport(this.settings.timePeriod, "type");
      this.loadingType = false;
      this.typeData = typeData;
      this.typeLastUpdatedDate = typeLastUpdatedDate;
      await this.$nextTick();
      this.render(typeData, "residentsActivitiesChartByType");

      this.loadingRole = true;
      const {
        activityData: rolesData,
        lastUpdated: roleLastUpdatedDate
      } = await getActivitiesAggregateReport(
        this.settings.timePeriod,
        "facilitator"
      );
      this.loadingRole = false;
      await this.$nextTick();
      this.rolesData = rolesData;
      this.roleLastUpdatedDate = roleLastUpdatedDate;

      this.render(rolesData, "residentsActivitiesChartByRole");
    }
  }
};
</script>
<style scoped>
.d-inline {
  display: inline;
  margin-left: 5px;
}
</style>
