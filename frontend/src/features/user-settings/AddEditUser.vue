<template>
  <q-dialog @hide="closeDialog" @escape-key="closeDialog" v-model="openDialog">
    <q-card>
      <q-card-section class="text-h5">
        <q-icon name="fa fa-user" />&nbsp;
        <span v-if="isEdit">
          {{ $i18n.t("editUser-header") }}
        </span>
        <span v-else>
          {{ $i18n.t("newUser-header") }}
        </span>
      </q-card-section>
      <q-card-section>
        <q-form ref="myForm">
          <q-input
            autocomplete="off"
            :label="$i18n.t('users.email.label')"
            v-model="user.email"
            :rules="[requiredValidation, validateEmail]"
          />
          <q-input
            autocomplete="off"
            v-if="!isEdit"
            v-model="user.password"
            :label="$i18n.t('users.password.label')"
            :rules="[requiredValidation, (v) => minLength(v.length, 5)]"
            type="password"
          />

          <template v-if="showIsAdminCheckBox">
            <q-checkbox
              v-model="user.isAdmin"
              :label="$i18n.t('users.isAdmin.label')"
            />

            <q-input
              filled
              v-model="user.deactivateOn"
              :label="$i18n.t('users-deactivateOn-label')"
              mask="datetime"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="user.deactivateOn"
                      :options="
                        (date) =>
                          new Date(date).getTime() >=
                          new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            new Date().getDate(),
                            0,
                            0,
                            0,
                            0
                          ).getTime()
                      "
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          :label="$i18n.t('modal-close')"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </template>
          <q-card-section>
            <q-btn @click="validateAndSubmit" class="bg-positive text-white">
              <span v-if="isEdit">
                {{ $i18n.t("editUser-saveButton") }}
              </span>
              <span v-else>
                {{ $i18n.t("newUser-saveButton") }}
              </span>
            </q-btn>
            <q-btn @click="closeDialog" class="q-ml-sm bg-negative text-white">
              <span v-if="isEdit">
                {{ $i18n.t("editUser-cancelButton") }}
              </span>
              <span v-else>
                {{ $i18n.t("newUser-cancelButton") }}
              </span>
            </q-btn>
          </q-card-section>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import {
  validateEmail,
  requiredValidation,
  minLength,
} from "src/utils/validations.js";
import {
  editUserFormSubmit,
  addUser,
  updateAdministratorRights,
} from "./services";

export default {
  props: {
    currentUser: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      openDialog: true,
      user: this.getUser(this.currentUser),
    };
  },

  computed: {
    isEdit() {
      return !!this.user && !!this.user._id;
    },

    userIsAdmin() {
      return this.$store.getters["user/isUserAdmin"];
    },
    showIsAdminCheckBox() {
      if (!this.isEdit) {
        return true;
      }
      const currentUserEmail = this.$store.getters["user/user"].details
        .emails[0].address;

      return !(currentUserEmail === this.user.email && this.userIsAdmin);
    },
  },

  methods: {
    validateEmail,
    requiredValidation,
    minLength,
    closeDialog() {
      this.$emit("close");
    },
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
      let apiResponse;
      if (this.isEdit) {
        delete this.user.password;
        apiResponse = editUserFormSubmit;
      } else {
        apiResponse = addUser;
      }
      const userID = await apiResponse(this.user);
      if (userID) {
        await updateAdministratorRights(this.user, userID);
        this.$emit("close", true);
      }
    },

    getUser(current) {
      return {
        _id: current && current._id ? current._id : null,
        email: current && current.emails ? current.emails[0].address : "",
        password: "",
        isAdmin: current && current.isAdmin ? current.isAdmin : false,
        deactivateOn:
          current && current.deactivateOn ? current.deactivateOn : null,
      };
    },
  },
};
</script>