<template>
  <q-dialog @hide="closeDialog" @escape-key="closeDialog" v-model="openDialog">
    <q-card>
      <q-card-section>
        <span class="text-h5">
          <q-icon name="fa fa-user" />&nbsp;
          {{ $i18n.t("deleteUser-header") }}
        </span>
      </q-card-section>
      <q-card-section>
        {{ $i18n.t("deleteUser-confirmationText") }}

        <div>
          <q-btn @click="deleteUser" class="text-white bg-positive">
            {{ $i18n.t("deleteUser-confirmButton") }}
          </q-btn>
          <q-btn @click="closeDialog" class="q-ml-sm text-white bg-negative">
            {{ $i18n.t("deleteUser-cancelButton") }}
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { deleteUser } from "./services/index";

export default {
  props: {
    user: {
      required: true,
      type: Object,
    },
  },

  data() {
    return {
      openDialog: true,
    };
  },

  methods: {
    async deleteUser() {
      if (await deleteUser(this.user)) {
        this.$emit("close", true);
      }
    },

    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>