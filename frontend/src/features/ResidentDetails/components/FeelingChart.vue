<template>
  <div class="row">
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
    };
  },

  created() {
    this.getFeelings();
  },

  methods: {
    async getFeelings() {
      const feelings = await getFeelingsPercentagesByResidentIdApi(
        this.residentId
      );
      renderFeelingsChart(this.feelingId, feelings);
    },
  },
};
</script>