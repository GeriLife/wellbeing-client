<template>
  <q-select
    v-bind="$attrs"
    v-on="$listeners"
    filled
    :value="value"
    use-input
    input-debounce="0"
    label="Residents"
    :options="options"
    @filter="filterFn"
    style="width: 250px"
    behavior="menu"
  />
</template>
<script>
import { getResidentsList } from "src/services/residents";

export default {
  props: {
    value: { type: Number, default: null }
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
      debugger;
      if (val === "") {
        update(() => {
          this.options = this.original;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.options = this.original.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    }
  }
};
</script>
