<template>
  <q-select
    v-bind="$attrs"
    v-on="$listeners"
    filled
    :value="value"
    :use-chips="multiple === true"
    use-input
    input-debounce="0"
    :label="$i18n.t('activityForm-residentSelect-placeholder')"
    :options="options"
    @filter="filterFn"
    :multiple="multiple"
    dropdown-icon="fa fa-chevron-down"
    behavior="menu"
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
        <q-item-section>
          <q-item-label v-html="scope.opt.label"></q-item-label>
          <q-item-label caption
            >{{ $i18n.t("newResidentAndResidencySchema-homeId-label") }}:
            {{ scope.opt.home }}</q-item-label
          >
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
<script>
import { getResidentsList } from "src/services/residents";

export default {
  props: {
    value: [Object, Array],
    multiple: { type: Boolean, default: false }
  },
  data() {
    return {
      options: [],
      original: []
    };
  },
  async created() {
    this.original = await getResidentsList();
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
