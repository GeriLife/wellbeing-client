<template>
  <div v-show="hasFeelings" class="row">
    <div class="text-h6">
      {{ $i18n.t("residentFeelings-header") }}
    </div>

    <div class="col-12" :id="feelingId"></div>
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
      this.feelings = await getFeelingsPercentagesByResidentIdApi(
        this.residentId
      );
      renderFeelingsChart(this.feelingId, this.feelings);
    },
  },
};
</script>