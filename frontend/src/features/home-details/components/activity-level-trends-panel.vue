<template>
  <q-card flat bordered>
    <q-card-section class="bg-grey-4">
      <q-icon name="fa fa-lg fa-users"></q-icon>&nbsp;
      {{ $i18n.t("home-activityLevelTrendsPanel-heading") }}
    </q-card-section>
    <q-card-section>
      <p>
        {{ $i18n.t("homeResidentActivityLevelTrend-chartTitle") }}
      </p>
      <div id="level-trend-home"></div>
    </q-card-section>
  </q-card>
</template>
<script>
import {
  getHomeActivityCountTrendApi,
  renderActivityChart
} from "../services/detail-services";

export default {
  props: {
    homeId: { type: String, required: true }
  },

  data() {
    return {
      activityData: {}
    };
  },

  async created() {
    this.activityData = await getHomeActivityCountTrendApi(this.homeId);
    renderActivityChart(this.activityData);
  }
};
</script>
