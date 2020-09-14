<template>
  <div class="q-ma-sm fit">
    <q-card flat bordered>
      <q-card-section horizontal class="q-pa-sm bg-grey-4">
        <div>{{ $i18n.t("front-quickAddPanel-title") }}</div>
      </q-card-section>

      <q-separator />
      <div class="row">
        <div class="q-gutter-xs q-ma-md">
          <q-btn
            @click="() => (openDialog = true)"
            class="text-center text-white bg-green q-px-sm q-py-lg"
          >
            <q-icon name="fa fa-heartbeat" /><br />
            <div
              class="ellipsis q-ml-sm"
              :title="$i18n.t('front-quickAddPanel-activityButton')"
            >
              {{ $i18n.t("front-quickAddPanel-activityButton") }}
            </div>
          </q-btn>
        </div>
        <div class="q-gutter-xs q-ma-md">
          <q-btn
            @click="openFeelingsDialog"
            class="text-center text-white bg-green q-px-sm q-py-lg"
          >
            <q-icon name="fa fa-stethoscope" /><br />
            <div
              class="ellipsis q-ml-sm"
              :title="$i18n.t('front-quickAddPanel-feelingButton')"
            >
              {{ $i18n.t("front-quickAddPanel-feelingButton") }}
            </div>
          </q-btn>
        </div>
      </div>
    </q-card>

    <q-card class="q-mt-xl" flat bordered>
      <q-card-section horizontal class="q-pa-sm bg-grey-4">
        <div>{{ $i18n.t("front-quickNavigationPanel-title") }}</div>
      </q-card-section>

      <q-separator />
      <div class="row">
        <div class="q-gutter-xs q-ma-md">
          <q-btn
            @click="$router.push({ path: '/residents' })"
            class="text-center text-white bg-primary q-px-sm q-py-lg"
          >
            <q-icon name="fa fa-users" />
            <div
              class="ellipsis q-ml-sm"
              :title="$i18n.t('front-quickNavigationPanel-residentsButton')"
            >
              {{ $i18n.t("front-quickNavigationPanel-residentsButton") }}
            </div>
          </q-btn>
        </div>
        <div class="q-gutter-xs q-ma-md">
          <q-btn
            @click="$router.push({ path: '/homes' })"
            class="text-center text-white bg-primary q-px-sm q-py-lg"
          >
            <q-icon name="fa fa-home" />
            <div
              class="ellipsis q-ml-sm"
              :title="$i18n.t('front-quickNavigationPanel-homesButton')"
            >
              {{ $i18n.t("front-quickNavigationPanel-homesButton") }}
            </div>
          </q-btn>
        </div>
        <div class="q-gutter-xs q-ma-md">
          <q-btn
            @click="$router.push({ path: '/activities' })"
            class="text-center text-white bg-primary q-px-sm q-py-lg"
          >
            <q-icon name="fa fa-heartbeat" />
            <div
              class="ellipsis q-ml-sm"
              :title="$i18n.t('front-quickNavigationPanel-activitiesButton')"
            >
              {{ $i18n.t("front-quickNavigationPanel-activitiesButton") }}
            </div>
          </q-btn>
        </div>
      </div>
    </q-card>
    <q-dialog
      @hide="closeDialog"
      @escape-key="closeDialog"
      v-model="openDialog"
    >
      <q-card class="fit">
        <q-card-section horizontal>
          <manage-feelings
            @feeling-result="v => (v === true ? closeDialog() : '')"
            v-if="isFeelings"
          />
          <manage-activity
            v-else
            @activity-result="v => (v === true ? closeDialog() : '')"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import ManageFeelings from "src/components/ManageFeelings";
import ManageActivity from "src/components/ManageActivity";

export default {
  components: {
    ManageFeelings,
    ManageActivity
  },

  data() {
    return {
      openDialog: false,
      isFeelings: false
    };
  },

  methods: {
    openFeelingsDialog() {
      this.openDialog = true;
      this.isFeelings = true;
    },

    closeDialog() {
      this.openDialog = false;
      this.isFeelings = false;
    }
  }
};
</script>
