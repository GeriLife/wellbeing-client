<template>
  <q-dialog @hide="closeDialog" @escape-key="closeDialog" v-model="model">
    <q-card class="full-width q-pa-sm">
      <q-card-section class="text-h6" horizontal>{{
        $i18n.t("change-password")
      }}</q-card-section>
      <q-card-section horizontal>
        <q-form class="fit" ref="myForm">
          <q-input
            v-model="currentPassword"
            type="password"
            :rules="[(v) => requiredValidation(v)]"
            :label="$i18n.t('change-password-current')"
            outlined
          />

          <q-input
            v-model="newPassword"
            type="password"
            :rules="[
              (v) => requiredValidation(v),
              (v) => minLength(v.length, 6),
            ]"
            :label="$i18n.t('change-password-new')"
            outlined
          />

          <q-input
            v-model="repeatPassword"
            type="password"
            :rules="[
              (v) => requiredValidation(v),
              (v) => v === newPassword || $i18n.t('password-no-match'),
            ]"
            :label="$i18n.t('change-password-repeat')"
            outlined
          />

          <q-btn
            label="Submit"
            @click.prevent="validateAndSubmit"
            type="submit"
            color="primary"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { changePassword } from "src/services/change-password.js";
import { requiredValidation, minLength } from "src/utils/validations.js";
import crypto from "crypto-js";

export default {
  data() {
    return {
      requiredValidation,
      minLength,
      model: true,
      currentPassword: "",
      newPassword: "",
      repeatPassword: "",
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

      if (
        await changePassword({
          currentPassword: crypto.AES.encrypt(
            this.currentPassword,
            process.env.secret
          ).toString(),
          newPassword: crypto.AES.encrypt(
            this.newPassword,
            process.env.secret
          ).toString(),
        })
      ) {
        this.closeDialog();
        window.location.reload();
      }
    },
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>