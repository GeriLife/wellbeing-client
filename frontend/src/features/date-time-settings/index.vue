<template>
  <q-card class="full-width">
    <q-card-section class="text-h5">
      <q-icon name="fa fa-calendar" />&nbsp;
      {{ $i18n.t("dateTimeSettings-header") }}
    </q-card-section>
    <q-card-section>
      <div class="row">
        <span class="texh-h6">
          {{ $i18n.t("dateTimeSettings-timezone-header") }}
        </span>
        <q-space />
        <q-icon color="primary" name="fa fa-2x fa-globe" />
      </div>
    </q-card-section>

    <q-card-section>
      <div class="row">
        <q-select
          class="col-8"
          v-model="timezone"
          :label="$i18n.t('dateTimeSettings-timezone-helpText')"
          outlines
          :options="timeZones"
        />
        <q-btn
          :label="$i18n.t('dateTimeSettings-timezone-saveButton')"
          @click.prevent="saveTimeZone(timezone)"
          :disabled="!timezone"
          type="submit"
          color="positive"
        />
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import moment from "moment-timezone";
import { getTimezone, saveTimeZone } from "./services/index";

export default {
  data() {
    return {
      timeZones: moment.tz.names(),
      timezone: null,
    };
  },

  async created() {
    this.timezone = await getTimezone();
  },
  methods: {
    saveTimeZone,
  },
};
</script>