<template>
  <q-select
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
    outlined
    map-options
    :use-chips="multiple === true"
    input-debounce="450"
    :label="$i18n.t('residencies.homeId.label')"
    :options="options"
    @filter="filterFn"
    dropdown-icon="fa fa-chevron-down"
    :multiple="multiple"
    behavior="menu"
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
          <q-item-label caption
            >{{ $i18n.t("homes.groupId.label") }}:
            {{ scope.opt.group }}</q-item-label
          >
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
<script>
import { getHomeSelectOptionsWithGroups } from "src/services/homes";

export default {
  props: {
    value: [String, Object],
    multiple: { type: Boolean, default: false }
  },
  data() {
    return {
      options: [],
      original: []
    };
  },
  async created() {
    this.original = await getHomeSelectOptionsWithGroups();
    this.options = this.original;
  },

  methods: {
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.options = this.original;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.options = this.original.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    }
  }
};
</script>
