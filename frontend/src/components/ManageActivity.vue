<template>
  <q-card class="full-width" flat>
    <q-card-section>
      <q-icon name="fa fa-heartbeat" />
      {{ $i18n.t("activityFormModal-header") }}
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-form ref="myForm">
        <residents
          v-model="residents"
          :rules="[
            val =>
              (!!val && val.length > 0) ||
              this.$i18n.t('newFeeling-residentRequired')
          ]"
          multiple
        />
        <activity-types
          :rules="[
            val => (!!val && !!val._id) || this.$i18n.t('fieldRequired')
          ]"
          v-model="activityType"
        />
        <roles
          v-model="role"
          :rules="[
            val => (!!val && !!val._id) || this.$i18n.t('fieldRequired')
          ]"
        />
        <div>
          <q-input
            filled
            v-model="date"
            :label="$i18n.t('activities.activityDate.label')"
            mask="date"
            :rules="[
              v => !!v || this.$i18n.t('fieldRequired'),
              v =>
                dateFallsInLastWeek(v) ||
                $i18n.t('activity-manage-dateSelectionRange')
            ]"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="date">
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
        </div>

        <q-input
          filled
          type="number"
          v-model="duration"
          :label="$i18n.t('activities.duration.label')"
          lazy-rules
          :rules="[
            v => !!v || this.$i18n.t('fieldRequired'),
            val =>
              (val > 0 && val < 1441) || $i18n.t('activity-manage-timeMaxValue')
          ]"
        />
        <div>
          <q-btn
            label="Submit"
            @click.prevent="validateAndSubmit"
            type="submit"
            color="primary"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
import Residents from "./Residents";
import ActivityTypes from "./ActivityTypes";
import Roles from "./Roles";
import { saveActivity } from "src/services/activities.js";
import { date } from "quasar";

export default {
  components: {
    Residents,
    ActivityTypes,
    Roles
  },
  data() {
    return {
      residents: [],
      activityType: null,
      role: null,
      date: date.formatDate(new Date(), "YYYY/MM/DD"),
      duration: 0
    };
  },
  methods: {
    async validateAndSubmit() {
      const result = await this.$refs.myForm.validate();
      if (!result) {
        this.$q.notify({
          type: "negative",
          position: "top-right",
          message: this.$i18n.t("formInvalid")
        });
        return;
      }

      const payload = {
        activityTypeId: this.activityType._id,
        activityDate: new Date(this.date).toUTCString(),
        facilitatorRoleId: this.role._id,
        duration: this.duration,
        residentIds: this.residents.map(r => r.value)
      };
      const saveResult = await saveActivity(payload);
      this.$emit("activity-result", saveResult);
    },

    dateFallsInLastWeek(v) {
      return (
        new Date(v).getTime() <= new Date().getTime() &&
        new Date(v).getTime() >=
          new Date(date.subtractFromDate(new Date(), { days: 7 })).getTime()
      );
    }
  }
};
</script>
