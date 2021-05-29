<template>
  <div>
    <span class="text-h6">
      {{ $i18n.t("residentFacilitatorRolesChart-header") }}
    </span>

    <div :id="rolesId"></div>
  </div>
</template>
<script>
import { getCountsByTypeApi } from "../services/resident-services";
import { renderFacilitatorTypesChart } from "../services/chart-services";

export default {
  props: {
    residentId: { type: String, required: true },
  },

  data() {
    return {
      rolesId: "facilitatorRolesChart",
    };
  },

  created() {
    this.getTypes();
  },

  methods: {
    async getTypes() {
      const types = await getCountsByTypeApi(
        this.residentId,
        "facilitatorRoleName"
      );
      renderFacilitatorTypesChart(this.rolesId, types);
    },
  },
};
</script>