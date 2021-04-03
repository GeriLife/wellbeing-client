<template>
  <div>
    <span class="text-h6">
      {{ $i18n.t("residentActivityTypesChart-header") }}
    </span>

    <div :id="typesId"></div>
  </div>
</template>
<script>
import { getCountsByTypeApi } from "../services/resident-services";
import { renderTypesChart } from "../services/chart-services";

export default {
  props: {
    residentId: { type: String, required: true },
  },

  data() {
    return {
      typesId: "activityTypeChartId",
    };
  },

  created() {
    this.getTypes();
  },

  methods: {
    async getTypes() {
      const types = await getCountsByTypeApi(
        this.residentId,
        "activityTypeName"
      );
      renderTypesChart(this.typesId, types);
    },
  },
};
</script>