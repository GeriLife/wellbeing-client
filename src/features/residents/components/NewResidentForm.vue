<template>
  <q-form ref="new-resident-form">
    <q-input
      outlined
      class="q-mt-sm"
      :rules="[(v) => requiredValidation(v)]"
      :label="$i18n.t('residents.firstName.label')"
      v-model="firstName"
    />
    <q-input
      outlined
      maxlength="1"
      class="q-mt-sm"
      :rules="[(v) => requiredValidation(v)]"
      :label="$i18n.t('residents.lastInitial.label')"
      v-model="lastInitial"
    />
    <homes
      class="q-mt-sm"
      v-model="homeId"
      :multiple="false"
      :rules="[(v) => requiredValidation(v)]"
    />

    <q-input
      outlined
      class="q-mt-sm"
      v-model="moveIn"
      :label="$i18n.t('residencies.moveIn.label')"
      type="date"
      mask="date"
      :rules="[(v) => requiredValidation(v), (v) => maxDate(v, currentDate)]"
    />
    <div class="float-right">
      <q-btn @click="validateAndSubmit" color="primary">
        {{ $i18n.t("addResidencyForm-save") }}
      </q-btn>
      <q-btn outline class="q-ml-sm text-black" @click="$emit('close')">
        {{ $i18n.t("addResidencyForm-cancel") }}
      </q-btn>
    </div>
  </q-form>
</template>
<script>
import { date } from "quasar";
import { requiredValidation, maxDate } from "src/utils/validations.js";
import Homes from "src/components/Homes.vue";
import { addNewResidentAndResidency } from "../services/residency-services";

export default {
  components: {
    Homes,
  },

  data() {
    return {
      homeId: null,
      firstName: "",
      lastInitial: "",
      requiredValidation,
      maxDate,
      moveIn: date.formatDate(new Date(), "YYYY-MM-DD"),
    };
  },

  computed: {
    currentDate() {
      return date.formatDate(new Date(), "YYYY-MM-DD");
    },
  },

  methods: {
    async validateAndSubmit() {
      const result = await this.$refs["new-resident-form"].validate();
      if (!result) {
        this.$q.notify({
          type: "negative",
          position: "top-right",
          message: this.$i18n.t("formInvalid"),
        });
        return;
      }

      if (
        await addNewResidentAndResidency({
          firstName: this.firstName,
          lastInitial: this.lastInitial,
          moveIn: `${date.formatDate(this.moveIn, "YYYY-MM-DDTHH:mm:ss.SSS")}Z`,
          homeId: this.homeId.value,
        })
      ) {
        this.$emit("close-and-exit");
      }
    },
  },
};
</script>
