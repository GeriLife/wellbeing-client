<template>
  <q-select
    v-bind="$attrs"
    :value="model"
    :options="options"
    :clearable="!disabled"
    use-input
    :use-chips="multiple === true"
    :multiple="multiple"
    :disabled="disabled"
    class="q-my-sm"
    dropdown-icon="fa fa-chevron-down"
    outlined
    @filter="filterFn"
    @remove="
      (v) => (!disabled && multiple ? $emit('update:model', remove(v)) : '')
    "
    @clear="$emit('update:model', [])"
    option-value="value"
    option-label="label"
  >
    <template v-slot:option="scope">
      <q-item
        class="text-weight-bold fit-this q-py-xs"
        :label="scope.opt.optgroup"
      >
        <q-item-section>{{ scope.opt.optgroup }}</q-item-section>
      </q-item>
      <template v-for="child in scope.opt.children">
        <q-item
          :key="child.value"
          clickable
          v-ripple
          :disabled="disabled || isActive(child)"
          @click="
            !disabled && !isActive(child)
              ? $emit('update:model', multiple ? [...model, child] : child)
              : ''
          "
          :class="{
            'fit-this q-py-xs': true,
            'bg-light-blue-1': isActive(child),
          }"
        >
          <q-item-section>
            <q-item-label v-html="child.label" class="q-ml-md"></q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </template>
  </q-select>
</template>
<script>
export default {
  props: {
    stringOptions: { required: true, type: Array },
    model: { default: null, type: [Array, Object, String] },
    multiple: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },

  data() {
    return {
      options: [],
    };
  },

  created() {
    this.options = this.stringOptions;
  },

  methods: {
    isActive(child) {
      if (!this.model || this.model.length === 0) {
        return false;
      }
      return this.multiple
        ? this.model.map((v) => v.value).includes(child.value)
        : this.model.value === child.value;
    },
    remove({ value }) {
      return this.model.filter((v) => v.value !== value.value);
    },

    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.options = this.stringOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        const findChild = (item) => item.label.toLowerCase().includes(needle);
        const find = (item) => {
          const filteredChildren = item.children.filter(findChild);
          const filteredTitle = item.optgroup.toLowerCase().includes(needle);
          if (filteredTitle && filteredChildren.length === 0) {
            return item;
          }
          if (filteredTitle || filteredChildren.length > 0) {
            return { optgroup: item.optgroup, children: filteredChildren };
          }
        };
        this.options = this.stringOptions.map(find).filter((item) => !!item);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
/* As options slot cannot be added in the input element, controlling CSS of 
   this slot becomes difficult hence adding this workaround until there is a better solution.
 */
.fit-this {
  max-width: 509px !important;
}
</style>