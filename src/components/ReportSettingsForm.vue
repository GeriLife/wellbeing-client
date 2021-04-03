<template>
  <div>
    <q-btn
      @click="expanded = !expanded"
      size="sm"
      class="text-white bg-primary"
    >
      <q-icon size="xs" class="fa fa-cog" />&nbsp;&nbsp;{{
        $i18n.t("report-chartSettingsButton-text")
      }}
    </q-btn>
    <q-slide-transition v-model="expanded">
      <q-card v-if="expanded" flat class="q-mt-md q-pa-sm bg-grey-4">
        <div class="q-mt-sm">
          <label class="q-mr-md" for="activityMetric">
            {{ $i18n.t("report-activityMetric-label") }}
          </label>
          <q-btn-toggle
            id="activityMetric"
            :value="settings.activityMetric"
            @input="
              $emit('update:settings', { ...settings, activityMetric: $event })
            "
            toggle-color="primary"
            :options="[
              {
                label: $i18n.t('report-activityMetric-activity_minutes'),
                value: 'activity_minutes',
              },
              {
                label: $i18n.t('report-activityMetric-activity_count'),
                value: 'activity_count',
              },
            ]"
          />
        </div>
        <div class="q-mt-md">
          <label class="q-mr-md" for="timePeriod">
            {{ $i18n.t("report-timePeriod-label") }}
          </label>
          <q-btn-toggle
            id="timePeriod"
            :value="settings.timePeriod"
            @input="
              $emit('update:settings', { ...settings, timePeriod: $event })
            "
            toggle-color="primary"
            :options="[
              { label: $i18n.t('report-timePeriod-week'), value: 'week' },
              { label: $i18n.t('report-timePeriod-month'), value: 'month' },
            ]"
          />
        </div>
        <div v-if="showBarMode" class="q-mt-md">
          <label class="q-mr-md" for="barMode">
            {{ $i18n.t("report-barMode-label") }}
          </label>
          <q-btn-toggle
            id="barMode"
            :value="settings.barMode"
            @input="$emit('update:settings', { ...settings, barMode: $event })"
            toggle-color="primary"
            :options="[
              { label: $i18n.t('report-barMode-group'), value: 'group' },
              { label: $i18n.t('report-barMode-stack'), value: 'stack' },
            ]"
          />
        </div>
      </q-card>
    </q-slide-transition>
  </div>
</template>

<script>
export default {
  props: {
    showBarMode: { type: Boolean, default: true },
    settings: {
      type: Object,
      default: () => ({
        barMode: "group",
        timePeriod: "week",
        activityMetric: "activity_minutes",
      }),
    },
  },
  data() {
    return {
      expanded: false,
    };
  },
};
</script>
