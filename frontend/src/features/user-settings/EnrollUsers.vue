<template>
  <q-card>
    <q-card-section class="text-h5">
      {{ $i18n.t("usersEnroll-header-text") }}
    </q-card-section>
    <q-card-section>
      {{ $i18n.t("usersEnroll-introduction-text") }}
    </q-card-section>
    <q-card-section>
      <q-form ref="myform">
        <q-input
          v-model="subject"
          outlined
          class="q-my-sm"
          :label="$i18n.t('usersEnrollSchema.subject.label')"
          :rules="[requiredValidation, (v) => maxLength(v.length, 78)]"
        />
        <q-input
          v-model="message"
          outlined
          class="q-my-sm"
          :label="$i18n.t('usersEnrollSchema.message.label')"
          :rules="[requiredValidation]"
        />

        <q-card-section class="bg-grey-3 q-mb-xs">
          {{ $i18n.t("usersEnrollSchema.emailAddresses.label") }}
          <q-icon
            size="sm"
            @click="emails.push('')"
            class="float-right bg-primary text-white cursor-pointer"
            tag="div"
          >
            +</q-icon
          >
        </q-card-section>
        <p>*{{ $i18n.t("enroll-atleast-oneEmail") }}</p>
        <div v-for="(email, index) in emails" class="row" :key="index">
          <div>
            <q-icon
              @click="emails.splice(index, 1)"
              size="md"
              class="bg-primary text-white cursor-pointer q-mt-md"
              tag="div"
            >
              -
            </q-icon>
          </div>
          <div class="col q-ml-md">
            <q-input
              :value="email"
              @input="(v) => setValue(v, index)"
              :rules="[(v) => requiredValidation(v), (v) => validateEmail(v)]"
              :label="$i18n.t('login-email')"
              outlined
            />
          </div>
        </div>

        <q-select
          v-model="group"
          option-value="_id"
          option-label="name"
          multiple
          outlined
          emit-value
          map-options
          :label="$i18n.t('editUserGroups-groupsLabel')"
          use-chips
          :options="groups"
        />
        <q-btn
          class="q-mt-sm text-white bg-primary"
          :disabled="emails.length === 0"
          @click="validateAndSubmit"
          >{{ $i18n.t("usersEnroll-form-submitButton-text") }}</q-btn
        >
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
import Vue from "vue";
import {
  validateEmail,
  requiredValidation,
  maxLength,
} from "src/utils/validations.js";
import { getUserGroups } from "src/features/homes/services/homes-list.js";
import { addUsersAndSendEnrollmentEmails } from "./services/index";

export default {
  data() {
    return {
      validateEmail,
      requiredValidation,
      maxLength,
      subject: "",
      message: "",
      group: null,
      groups: [],
      emails: [],
    };
  },

  async created() {
    this.groups = await getUserGroups();
  },

  methods: {
    setValue(val, index) {
      Vue.set(this.emails, index, val);
    },
    async validateAndSubmit() {
      const result = await this.$refs.myform.validate();
      if (!result) {
        this.$q.notify({
          type: "negative",
          position: "top-right",
          message: this.$i18n.t("formInvalid"),
        });
        return;
      }
      if (
        await addUsersAndSendEnrollmentEmails({
          subject: this.subject,
          message: this.message,
          emailAddresses: this.emails,
          groups: this.group,
        })
      ) {
        this.$emit("refresh-users");
      }
    },
  },
};
</script>