<template>
  <q-select
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
    outlined
    :use-chips="multiple === true"
    input-debounce="450"
    :label="$i18n.t('activityForm-residentSelect-placeholder')"
    map-options
    :options="residentOptions"
    @filter="filterFn"
    :multiple="multiple"
    dropdown-icon="fa fa-chevron-down"
    behavior="menu"
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
        <q-item-section>
          <q-item-label>
            {{ scope.opt.label }}
          </q-item-label>
          <q-item-label v-if="!inactiveOnly" caption>
            {{ $i18n.t("newResidentAndResidencySchema-homeId-label") }}:
            {{ scope.opt.home }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
<script>
import {
  getResidentsList,
  getResidentsWithoutActiveResidencies
} from "src/services/residents";

export default {
  props: {
    value: [Object, String, Array],
    multiple: { type: Boolean, default: false },
    inactiveOnly: { type: Boolean, default: false },
    residency: { type: String, default: null },
    itemsOverideList: { type: Array, default: null }
  },
  data() {
    return {
      options: [],
      original: []
    };
  },

  computed: {
    residentOptions() {
      return this.itemsOverideList || this.options;
    }
  },

  async created() {
    if (this.itemsOverideList) {
      this.original = this.options = this.itemsOverideList;
      return;
    }
    if (this.inactiveOnly) {
      this.original = await getResidentsWithoutActiveResidencies(
        this.residency
      );
    } else {
      this.original = await getResidentsList();
    }
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
