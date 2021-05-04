<template>
  <hierarchy-dropdown
    v-bind="$attrs"
    v-on="$listeners"
    emit-value
    map-options
    :label="$i18n.t('residencies.homeId.label')"
    :model="mappedValue"
    @update:model="(v) => $emit('input', v)"
    :multiple="multiple"
    :disabled="disabled"
    behavior="menu"
    :string-options="options"
  />
</template>
<script>
import { getHomeSelectOptionsWithGroups } from "src/services/homes";
import HierarchyDropdown from "./HierarchyDropdown";

export default {
  props: {
    value: [String, Object],
    multiple: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  components: {
    HierarchyDropdown,
  },
  data() {
    return {
      options: [],
    };
  },

  computed: {
    mappedValue() {
      if (!this.value || typeof this.value !== "string") {
        return this.value;
      }
      return this.options
        .flatMap((v) => v.children)
        .find((v) => v.value === this.value);
    },
  },

  async created() {
    this.options = await getHomeSelectOptionsWithGroups();
  },
};
</script>
