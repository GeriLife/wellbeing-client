<template>
  <q-card class="full-width" flat>
    <q-card-section class="row">
      <template v-if="resident">
        <p class="q-mt-sm">{{ resident.firstName }}</p>
        &nbsp;
        <p class="q-mt-sm" v-if="isLoggedIn">
          {{ resident.lastInitial }}
        </p>
        <q-chip v-if="resident.onHiatus" color="info" text-color="white">
          {{ $i18n.t("resident-onHiatus") }}
        </q-chip>

        <q-btn
          v-if="canEdit && isLoggedIn"
          @click="showEditResident = true"
          outline
          class="q-ml-md q-mb-sm text-black bg-white"
        >
          {{ $i18n.t("resident-editButton") }}
        </q-btn>
      </template>
      <div class="col-md-9 col-12">
        <q-btn
          @click="openDialog = true"
          class="q-ml-md float-right"
          v-if="this.$store.getters['user/isUserAdmin']"
          color="positive"
        >
          <q-icon name="fa fa-heartbeat" />
          {{ $i18n.t("resident-addActivity-buttonText") }}
        </q-btn>

        <q-btn
          v-if="isLoggedIn && canEdit"
          @click="
            openDialog = true;
            isFeelings = true;
          "
          class="float-right"
          color="positive"
        >
          <q-icon name="fa fa-stethoscope" />
          {{ $i18n.t("resident-addFeeling-buttonText") }}
        </q-btn>
      </div>
      <q-separator />
    </q-card-section>
    <q-card-section v-if="!loading">
      <div class="text-h6">
        {{ $i18n.t("residentActivities-header") }}
      </div>
      <activity-charts :resident-id="$route.params.id" />
    </q-card-section>
    <div v-else class="center-aligned">
      <q-circular-progress
        :value="61"
        indeterminate
        size="50px"
        :thickness="0.22"
        color="primary"
        track-color="grey-3"
        class="q-ma-md"
      />
    </div>
    <q-dialog
      @hide="closeDialog"
      @escape-key="closeDialog"
      v-model="openDialog"
    >
      <q-card class="fit">
        <q-card-section horizontal>
          <manage-feelings
            @feeling-result="(v) => (v === true ? closeDialog() : '')"
            v-if="isFeelings"
          />
          <manage-activity
            v-else
            @activity-result="(v) => (v === true ? closeDialog() : '')"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <update-resident
      v-if="showEditResident && resident"
      :resident="resident"
      @close="closeAndReload"
    />
  </q-card>
</template>
<script>
import { getResidentDetailsApi } from "src/services/residents.js";
import { isResidentManagedByCurrentUserApi } from "./services/resident-services";
import { getCookie } from "src/services/cookies";

import ManageFeelings from "src/components/ManageFeelings";
import ManageActivity from "src/components/ManageActivity";
import UpdateResident from "./components/UpdateResident.vue";
import ActivityCharts from "./components/ActivityCharts";

export default {
  components: {
    ManageFeelings,
    ManageActivity,
    UpdateResident,
    ActivityCharts,
  },
  data() {
    return {
      resident: null,
      canEdit: false,
      loading: false,
      isLoggedIn: getCookie("token"),
      openDialog: false,
      isFeelings: false,
      showEditResident: false,
    };
  },

  created() {
    this.reload();
  },

  methods: {
    openFeelingsDialog() {
      this.openDialog = true;
      this.isFeelings = true;
    },

    async closeDialog() {
      this.openDialog = false;
      this.isFeelings = false;
      await this.reload();
    },

    async closeAndReload(v) {
      this.showEditResident = false;
      if (v) {
        await this.reload();
      }
    },

    async reload() {
      this.loading = true;
      this.resident = await getResidentDetailsApi(this.$route.params.id);
      this.canEdit = await isResidentManagedByCurrentUserApi(
        this.$route.params.id
      );
      this.loading = false;
    },
  },
};
</script>
