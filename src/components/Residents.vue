<template>
  <hierarchy-dropdown
    :label="$i18n.t('activityForm-residentSelect-placeholder')"
    :model="value"
    @update:model="(v) => $emit('input', v)"
    :multiple="multiple"
    v-bind="$attrs"
    v-on="$listeners"
    :string-options="options"
  />
</template>
<script>
import { getResidentsList } from "src/services/residents";

import HierarchyDropdown from "./HierarchyDropdown";

export default {
  props: {
    value: { type: [Object, String, Array], default: null },
    multiple: { type: Boolean, default: false },
  },

  components: {
    HierarchyDropdown,
  },

  data() {
    return {
      options: [],
    };
  },

  async created() {
    this.options = await getResidentsList();
  },
};
</script>
