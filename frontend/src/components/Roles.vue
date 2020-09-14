<template>
  <q-select
    v-bind="$attrs"
    v-on="$listeners"
    filled
    :value="value"
    :label="$i18n.t('activities.facilitatorRoleId.label')"
    :options="options"
    map-options
    fill-input
    option-value="_id"
    option-label="name"
    dropdown-icon="fa fa-chevron-down"
  >
    <template v-slot:selected-item="scope">
      {{ scope.opt.name }}
    </template>
  </q-select>
</template>
<script>
import { getRolesExceptAdmin } from "src/services/roles.js";

export default {
  props: {
    value: { Object }
  },
  data() {
    return {
      options: []
    };
  },
  async created() {
    this.options = await getRolesExceptAdmin();
  }
};
</script>
