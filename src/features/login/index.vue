<template>
  <div class="fit">
    <template v-if="!forgotPwd">
      <q-card-section class="row">
        <q-space />
        <div class="col-8 text-h5">{{ $i18n.t("login") }}</div>
        <q-space />
      </q-card-section>
      <q-card-section class="row">
        <q-space />
        <q-form class="col-8" @submit.prevent="login" ref="loginForm">
          <q-input
            v-model="email"
            :rules="[(v) => requiredValidation(v), (v) => validateEmail(v)]"
            :label="$i18n.t('login-email')"
            outlined
          />

          <q-input
            v-model="password"
            type="password"
            :rules="[(v) => requiredValidation(v)]"
            :label="$i18n.t('login-password')"
            outlined
          />

          <div
            class="q-my-xs cursor-pointer text-primary"
            @click="forgotPwd = true"
          >
            {{ $i18n.t("login-forgotPassword") }}
          </div>
          <q-btn type="submit" outline class="full-width flat bg-standard">
            {{ $i18n.t("login-submit") }}
          </q-btn>
        </q-form>
        <q-space />
      </q-card-section>
    </template>
    <template v-else>
      <q-card-section class="row">
        <q-space />
        <div class="col-8 text-h5">{{ $i18n.t("email-reset-title") }}</div>
        <q-space />
      </q-card-section>

      <q-card-section class="row">
        <q-space />
        <q-form class="col-8" ref="forgotPwdForm">
          <q-input
            v-model="toEmail"
            :rules="[(v) => requiredValidation(v), (v) => validateEmail(v)]"
            :label="$i18n.t('login-email')"
            outlined
          />
          <q-btn
            @click="verifyAndSendEmail"
            outline
            class="full-width flat bg-standard"
          >
            {{ $i18n.t("email-reset-submit") }}
          </q-btn>
          <div class="q-my-sm">
            {{ $i18n.t("email-reset-go-back") }}&nbsp;<span
              class="cursor-pointer text-primary"
              @click="
                toEmail = null;
                forgotPwd = false;
              "
              >{{ $i18n.t("login-submit") }}</span
            >
          </div>
        </q-form>
        <q-space />
      </q-card-section>
    </template>
  </div>
</template>
<script>
import { validateEmail, requiredValidation } from "src/utils/validations.js";
import { loginToServer, sendResetEmail } from "src/services/login.js";

export default {
  data() {
    return {
      validateEmail,
      requiredValidation,
      email: null,
      password: null,
      forgotPwd: false,
      toEmail: null,
    };
  },
  methods: {
    async login() {
      const result = await this.$refs.loginForm.validate();

      if (!result) {
        this.$q.notify({
          type: "negative",
          position: "top-right",
          message: this.$i18n.t("formInvalid"),
        });
        return;
      }

      if (await loginToServer(this.email, this.password)) {
        console.log("logged in to server");

        await this.$store.dispatch("user/getUserDetails");
        await this.$store.dispatch("user/getGroupsOfCurrentUser");

        this.$router.push({ path: "/" });
        this.$router.go();
      } else {
        console.log("Could not log in to server.");
      }
    },
    async verifyAndSendEmail() {
      const result = await this.$refs.forgotPwdForm.validate();
      if (!result) {
        this.$q.notify({
          type: "negative",
          position: "top-right",
          message: this.$i18n.t("formInvalid"),
        });
        return;
      }
      const resetResult = await sendResetEmail(this.toEmail);
      this.$refs.forgotPwdForm.reset();

      if (resetResult) {
        this.forgotPwd = false;
        this.toEmail = null;
      }
    },
  },
};
</script>
