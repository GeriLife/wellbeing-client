<template>
  <q-dialog
    @hide="$emit('close')"
    @escape-key="$emit('close')"
    v-model="openDialog"
  >
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h5">
          {{ $i18n.t("residentForm-header-edit") }}
        </div>
        <q-separator />
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="firstName"
          :disable="!userIsAdmin"
          outlined
          :label="$i18n.t('residents.firstName.label')"
        />

        <q-input
          v-model="lastInitial"
          :disable="!userIsAdmin"
          outlined
          class="q-mt-sm"
          :label="$i18n.t('residents.lastInitial.label')"
        />
        <q-checkbox
          v-model="onHiatus"
          :label="$i18n.t('residents.onHiatus.label')"
        />

        <p class="text-grey-7">
          {{ $i18n.t("residentForm-onHiatus-helpText") }}
        </p>

        <q-btn @click="update" color="positive">
          {{ $i18n.t("residentForm-save") }}
        </q-btn>
        <q-btn @click="$emit('close')" color="negative" class="q-ml-sm">
          {{ $i18n.t("residentForm-cancel") }}
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { updateResidentInfo } from "../services/resident-services";

export default {
  props: {
    resident: { type: Object, required: true },
  },

  data() {
    return {
      openDialog: true,
      firstName: this.resident.firstName,
      lastInitial: this.resident.lastInitial,
      onHiatus: this.resident.onHiatus,
    };
  },

  computed: {
    userIsAdmin() {
      return this.$store.getters["user/isUserAdmin"];
    },
  },

  methods: {
    async update() {
      await updateResidentInfo({
        _id: this.resident._id,
        firstName: this.firstName,
        lastInitial: this.lastInitial,
        onHiatus: this.onHiatus,
      });
      this.$emit("close", true);
    },
  },
};
</script>