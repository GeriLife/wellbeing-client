<template>
  <q-select
    v-bind="$attrs"
    v-on="$listeners"
    filled
    :value="value"
    map-options
    fill-input
    option-value="_id"
    option-label="name"
    :label="$i18n.t('activities.activityTypeId.label')"
    :options="options"
    dropdown-icon="fa fa-chevron-down"
  >
    <template v-slot:selected-item="scope">
      {{ scope.opt.name }}
    </template>
  </q-select>
</template>
<script>
import { getAllActivityTypes } from "src/services/activities.js";

export default {
  props: {
    value: { Object },
  },
  data() {
    return {
      options: [],
    };
  },
  async created() {
    this.options = await getAllActivityTypes();
  },
};
</script>
