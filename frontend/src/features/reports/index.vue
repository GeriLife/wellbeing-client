<template>
  <q-card class="q-px-sm full-width">
    <q-card-section class="q-mb-sm">
      <div>
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
    </q-card-section>
    <div v-if="!loading" id="residentsActivitiesChartByType"></div>

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
    <q-card-section>
      <div class="text-h6">
        {{ $i18n.t("report-activityByRole") }}
      </div>
      <span
        >{{ $i18n.t("report-lastUpdatedAt") }}&nbsp;{{
          roleLastUpdatedDate
        }}</span
      >
    </q-card-section>
    <div v-if="!loading" id="residentsActivitiesChartByRole"></div>
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
  </q-card>
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
      loading: false,
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
      this.render();
    },
    "settings.activityMetric"() {
      this.render();
    }
  },

  methods: {
    render() {
      Plotly.purge("residentsActivitiesChartByType");
      prepareChartData(
        this.settings.activityMetric,
        this.settings.barMode,
        this.typeData,
        "residentsActivitiesChartByType"
      );

      Plotly.purge("residentsActivitiesChartByRole");
      prepareChartData(
        this.settings.activityMetric,
        this.settings.barMode,
        this.rolesData,
        "residentsActivitiesChartByRole"
      );
    },

    async getTypeChartData() {
      const {
        activityData: typeData,
        lastUpdated: typeLastUpdatedDate
      } = await getActivitiesAggregateReport(this.settings.timePeriod, "type");
      this.typeData = typeData;
      this.typeLastUpdatedDate = typeLastUpdatedDate;
    },

    async getRoleChartData() {
      const {
        activityData: rolesData,
        lastUpdated: roleLastUpdatedDate
      } = await getActivitiesAggregateReport(
        this.settings.timePeriod,
        "facilitator"
      );
      this.rolesData = rolesData;
      this.roleLastUpdatedDate = roleLastUpdatedDate;
    },

    async fetchDataAndRender() {
      this.loading = true;
      await Promise.all([this.getTypeChartData(), this.getRoleChartData()]);
      this.loading = false;
      /* Required as we need to wait for chart div to exist */
      await this.$nextTick();

      this.render();
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
