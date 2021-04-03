<template>
  <q-dialog v-model="show" @hide="$emit('close')" @escape-key="$emit('close')">
    <q-card flat class="q-py-sm full-width">
      <q-card-section class="text-h5">
        <span v-if="!residency">
          {{ $i18n.t("addResidencyModal-header") }}
        </span>
        <span v-else>
          {{ $i18n.t("editResidencyModal-header") }}
        </span>
        <q-separator />
      </q-card-section>
      <q-card-section v-if="!residency">
        <q-option-group :options="options" type="radio" v-model="type" />
      </q-card-section>
      <q-card-section>
        <edit-resident-form
          v-if="residency || type === 'edit'"
          :residency="residency"
          @close-and-exit="v => $emit('close-and-exit', v)"
          @close="v => $emit('close', v)"
        />
        <new-resident-form
          v-else
          @close="v => $emit('close', v)"
          @close-and-exit="v => $emit('close-and-exit', v)"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import EditResidentForm from "./EditResidentForm";
import NewResidentForm from "./NewResidentForm";

export default {
  components: {
    EditResidentForm,
    NewResidentForm
  },

  props: {
    residency: { type: Object, default: null }
  },

  data() {
    return {
      type: "new",
      show: true,
      options: [
        {
          label: this.$i18n.t("addResidencyForm-newOrExisting-new"),
          value: "new"
        },
        {
          label: this.$i18n.t("addResidencyForm-newOrExisting-existing"),
          value: "edit"
        }
      ]
    };
  }
};
</script>
