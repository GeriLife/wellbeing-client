<template>
  <div class="q-ma-sm fit">
    <q-card flat bordered>
      <q-card-section horizontal class="q-pa-sm bg-grey-4">
        <div>{{ $i18n.t("front-quickAddPanel-title") }}</div>
      </q-card-section>

      <q-separator />
      <div class="row">
        <div class="col-1 q-mx-sm q-my-lg">
          <q-card class="text-white pointer bg-green q-pa-lg">
            <div class="q-ml-md"><q-icon name="fa fa-heartbeat" /></div>
            <div>{{ $i18n.t("front-quickAddPanel-activityButton") }}</div>
          </q-card>
        </div>
        <div class="col-1 q-mx-sm q-my-lg">
          <q-card
            @click="openFeelingsDialog"
            class="text-white pointer bg-green q-pa-lg"
          >
            <div class="q-ml-md"><q-icon name="fa fa-stethoscope" /></div>
            <div>{{ $i18n.t("front-quickAddPanel-feelingButton") }}</div>
          </q-card>
        </div>
      </div>
    </q-card>

    <q-card class="q-mt-xl" flat bordered>
      <q-card-section horizontal class="q-pa-sm bg-grey-4">
        <div>{{ $i18n.t("front-quickNavigationPanel-title") }}</div>
      </q-card-section>

      <q-separator />
      <div class="row">
        <div class="col-1 q-mx-sm q-my-lg">
          <q-card
            @click="$router.push({ path: '/residents' })"
            class="pointer text-white bg-primary q-pa-lg"
          >
            <div class="q-ml-md"><q-icon name="fa fa-users" /></div>
            <div>
              {{ $i18n.t("front-quickNavigationPanel-residentsButton") }}
            </div>
          </q-card>
        </div>
        <div class="col-1 q-mx-sm q-my-lg">
          <q-card
            @click="$router.push({ path: '/homes' })"
            class="pointer text-white bg-primary q-pa-lg"
          >
            <div class="q-ml-md"><q-icon name="fa fa-home" /></div>
            <div>{{ $i18n.t("front-quickNavigationPanel-homesButton") }}</div>
          </q-card>
        </div>
        <div class="col-1 q-mx-sm q-my-lg">
          <q-card
            @click="$router.push({ path: '/activities' })"
            class="pointer text-white bg-primary q-pa-lg"
          >
            <div class="q-ml-md"><q-icon name="fa fa-heartbeat" /></div>
            <div>
              {{ $i18n.t("front-quickNavigationPanel-activitiesButton") }}
            </div>
          </q-card>
        </div>
      </div>
    </q-card>
    <q-dialog v-model="openDialog">
      <q-card class="sizing">
        <q-card-section horizontal>
          <manage-feelings
            @feeling-result="v => (v === true ? (openDialog = false) : '')"
            v-if="isFeelings"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import ManageFeelings from "src/components/ManageFeelings";

export default {
  components: {
    ManageFeelings
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

<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
.sizing {
  min-width: 500px;
  min-height: 500px;
}
</style>
