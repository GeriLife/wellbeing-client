<template>
  <div class="full-width">
    <feeling-chart :resident-id="residentId" />

    <template v-if="activities">
      <trends-chart :resident-id="residentId" />
      <div class="row">
        <div class="col-sm-6 col-12">
          <types-chart :resident-id="residentId" />
        </div>
        <div class="col-sm-6 col-12">
          <roles-chart :resident-id="residentId" />
        </div>
      </div>
      <div class="row">
        <q-tabs
          v-model="tab"
          align="left"
          dense
          class="col-12 bg-grey-3"
          narrow-indicator
        >
          <q-tab
            :label="$i18n.t('residentActivities-tabs-calendar')"
            name="calendar"
          />

          <q-tab
            :label="$i18n.t('residentActivities-tabs-table')"
            name="table"
          />
        </q-tabs>
        <div class="col-12">
          <activities-calendar
            v-if="tab === 'calendar'"
            :resident-id="residentId"
          />
          <activities-table v-if="tab === 'table'" :activities="activities" />
        </div>
      </div>
    </template>
    <div v-else-if="loading" class="center-aligned">
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
    <div v-else>
      {{ $i18n.t("resident-noRecordedActivities-text") }}
    </div>
  </div>
</template>
  
<script>
import FeelingChart from "./FeelingChart.vue";
import RolesChart from "./RolesChart.vue";
import TrendsChart from "./TrendsChart.vue";
import TypesChart from "./TypesChart.vue";
import { getResidentActvitiesWithActivityAndFaciltatorNameApi } from "../services/resident-services";
import ActivitiesTable from "./ActivitiesTable.vue";
import ActivitiesCalendar from "./ActivitiesCalendar.vue";

export default {
  props: {
    residentId: { type: String, required: true },
  },

  data() {
    return {
      tab: "calendar",
      activities: null,
      loading: false,
    };
  },

  components: {
    FeelingChart,
    TrendsChart,
    RolesChart,
    TypesChart,
    ActivitiesTable,
    ActivitiesCalendar,
  },

  created() {
    this.getCalendar();
  },

  methods: {
    async getCalendar() {
      this.loading = true;
      this.activities = await getResidentActvitiesWithActivityAndFaciltatorNameApi();
      this.loading = false;
    },
  },
};
</script>