<template>
  <q-dialog @hide="closeDialog" @escape-key="closeDialog" v-model="openDialog">
    <q-card class="q-pa-lg">
      <q-card-section class="text-h6" horizontal>
        {{ $i18n.t("activityTypesSettings-addActivityTypeButton") }}
      </q-card-section>
      <q-card-section horizontal>
        <q-form class="fit" ref="myForm">
          <q-input
            :label="$i18n.t('activityTypes.name.label')"
            v-model="activityName"
            :rules="[requiredValidation]"
          />
          <div>
            <q-btn
              :label="$i18n.t('residentForm-save')"
              @click.prevent="validateAndSubmit"
              type="submit"
              color="primary"
            />

            <q-btn
              class="q-ml-sm"
              :label="$i18n.t('newRole-cancelButton')"
              @click.prevent="closeDialog"
              outline
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { requiredValidation } from "src/utils/validations.js";
import { addActivityType } from "./services/index";

export default {
  data() {
    return {
      openDialog: true,
      requiredValidation,
      activityName: "",
    };
  },

  methods: {
    async validateAndSubmit() {
      const result = await this.$refs.myForm.validate();
      if (!result) {
        this.$q.notify({
          type: "negative",
          position: "top-right",
          message: this.$i18n.t("formInvalid"),
        });
        return;
      }
      if (await addActivityType({ name: this.activityName })) {
        this.$emit("close", true);
      } else {
        this.$emit("close");
      }
    },
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>