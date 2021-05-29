<template>
  <div v-show="hasFeelings" class="row">
    <div class="text-h6">
      {{ $i18n.t("residentFeelings-header") }}
    </div>

    <div class="col-12" :id="feelingId"></div>
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
  </div>
</template>
<script>
import { getFeelingsPercentagesByResidentIdApi } from "../services/resident-services";
import { renderFeelingsChart } from "../services/chart-services";
export default {
  props: {
    residentId: { type: String, required: true },
  },

  data() {
    return {
      feelingId: "residentFeelingsChart",
      feelings: [],
      loading: false,
    };
  },

  created() {
    this.getFeelings();
  },

  computed: {
    hasFeelings() {
      return this.feelings && this.feelings.length > 0;
    },
  },

  methods: {
    async getFeelings() {
      this.loading = true;
      this.feelings = await getFeelingsPercentagesByResidentIdApi(
        this.residentId
      );
      this.loading = false;
      renderFeelingsChart(this.feelingId, this.feelings);
    },
  },
};
</script>