<template>
  <q-form ref="new-resident-form">
    <p v-if="endClicked">
      {{ $i18n.t("residencies.previousEndTime") }} {{ this.moveIn }}
    </p>

    <q-select
      :disabled="!!residency"
      v-model="residentId"
      outlined
      fill-input
      :label="$i18n.t('activityForm-residentSelect-placeholder')"
      emit-value
      map-options
      v-if="!residency || overideList"
      :rules="[(val) => requiredValidation(val)]"
      :multiple="false"
      :options="!residency ? residentList : overideList"
      dropdown-icon="fa fa-chevron-down"
    />

    <homes
      :disabled="!!residency && !endClicked"
      class="q-mt-sm"
      v-model="homeId"
      :rules="[(val) => requiredValidation(val)]"
      :multiple="false"
    />

    <q-input
      outlined
      stack-label
      class="q-mt-sm"
      v-model="moveIn"
      :label="$i18n.t('residencies.moveIn.label')"
      type="date"
      mask="date"
      :rules="[(v) => requiredValidation(v), (v) => maxDate(v, currentDate)]"
    />

    <q-input
      outlined
      class="q-mt-sm"
      clearable
      v-model="moveOut"
      stack-label
      :label="$i18n.t('residencies.moveOut.label')"
      type="date"
      fill-mask
      mask="date"
      :rules="[(v) => !v || !moveIn || minDate(v, moveIn)]"
    />

    <div class="float-right">
      <q-btn @click="validateAndSubmit" color="primary">
        {{ $i18n.t("addResidencyForm-save") }}
      </q-btn>
      <q-btn outline class="q-ml-sm text-black" @click="$emit('close')">
        {{ $i18n.t("addResidencyForm-cancel") }}
      </q-btn>
      <template v-if="residency && residencyId && !residency.moveOut">
        <q-btn
          v-if="!endClicked"
          outline
          class="q-ml-sm text-white bg-warning"
          @click="createNewWithCurrentResident"
        >
          {{ $i18n.t("residencies.endResidency") }}
          <q-tooltip
            anchor="top left"
            max-width="20rem"
            :content-style="{ fontSize: '1em' }"
            content-class="bg-primary"
            >{{ $i18n.t("residencies.note") }}</q-tooltip
          >
        </q-btn>

        <q-btn
          v-else-if="endClicked"
          outline
          @click="undo"
          class="q-ml-sm text-white bg-warning"
        >
          {{ $i18n.t("addResidencyForm-undo") }}
        </q-btn>
      </template>
    </div>
  </q-form>
</template>
<script>
import { date } from "quasar";
import { requiredValidation, minDate, maxDate } from "src/utils/validations.js";
import {
  getResidentDetailsApi,
  getResidentsWithoutActiveResidencies,
} from "src/services/residents.js";
import Homes from "src/components/Homes.vue";
import {
  addNewResidencyWithExistingResident,
  editResidency,
} from "../services/residency-services";

export default {
  components: {
    Homes,
  },

  props: {
    residency: { type: Object, default: null },
  },

  data() {
    return {
      homeId: this.residency ? this.residency.homeId : null,
      residentId: this.residency ? this.residency.residentId : null,
      residencyId: this.residency ? this.residency._id : null,
      moveOut: date.formatDate(
        this.residency ? this.residency.moveOut : null,
        "YYYY-MM-DD"
      ),
      requiredValidation,
      minDate,
      maxDate,
      moveIn: date.formatDate(
        this.residency ? this.residency.moveIn : new Date(),
        "YYYY-MM-DD"
      ),
      endClicked: false,
      overideList: null,
      residentList: [],
    };
  },

  computed: {
    currentDate() {
      return date.formatDate(new Date(), "YYYY-MM-DD");
    },
  },

  async created() {
    if (this.residency) {
      const resident = await getResidentDetailsApi(this.residency.residentId);
      this.overideList = resident
        ? [
            {
              label: `${resident.firstName}${
                resident.lastInitial ? " " + resident.lastInitial : ""
              }`,
              value: resident._id,
            },
          ]
        : null;
    }

    this.residentList = await getResidentsWithoutActiveResidencies(
      this.residency
    );
  },

  methods: {
    async validateAndSubmit() {
      const result = await this.$refs["new-resident-form"].validate();
      if (
        !result ||
        (this.residency &&
          (this.residency.residentId !== this.residentId ||
            (!this.endClicked && this.residency.homeId !== this.homeId)))
      ) {
        this.$q.notify({
          type: "negative",
          position: "top-right",
          message: this.$i18n.t("formInvalid"),
        });
        return;
      }
      await this.saveOrUpdate();
    },

    async saveOrUpdate() {
      const action =
        !this.residency || this.endClicked
          ? async () =>
              await addNewResidencyWithExistingResident({
                residentId: this.residentId.value || this.residentId,
                moveIn: `${date.formatDate(
                  this.moveIn,
                  "YYYY-MM-DDTHH:mm:ss.SSS"
                )}Z`,
                moveOut: this.moveOut
                  ? `${date.formatDate(
                      this.moveOut,
                      "YYYY-MM-DDTHH:mm:ss.SSS"
                    )}Z`
                  : undefined,
                homeId: this.homeId.value || this.homeId,
              })
          : async () =>
              await editResidency({
                _id: this.residency._id,
                modifier: {
                  $set: {
                    moveIn: `${date.formatDate(
                      this.moveIn,
                      "YYYY-MM-DDTHH:mm:ss.SSS"
                    )}Z`,

                    moveOut: this.moveOut
                      ? `${date.formatDate(
                          this.moveOut,
                          "YYYY-MM-DDTHH:mm:ss.SSS"
                        )}Z`
                      : undefined,
                    homeId: this.endClicked
                      ? this.homeId.value || this.homeId
                      : undefined,
                  },
                },
              });

      if (await action()) {
        this.$emit("close-and-exit");
      }
    },

    async createNewWithCurrentResident() {
      this.endClicked = true;
      const newMoveIn = `${date.formatDate(
        new Date(this.moveIn).getTime() > new Date().getTime()
          ? this.moveIn
          : new Date(),
        "YYYY-MM-DDTHH:mm:ss.SSS"
      )}Z`;
      const saveResult = await editResidency({
        _id: this.residency._id,
        modifier: {
          $set: {
            moveOut: newMoveIn,
          },
        },
      });

      if (saveResult) {
        this.moveIn = date.formatDate(newMoveIn, "YYYY-MM-DD");
        this.moveOut = date.formatDate(null, "YYYY-MM-DD");
      }
    },
    async undo() {
      if (
        await editResidency({
          _id: this.residencyId,
          modifier: { $unset: { moveOut: true } },
        })
      ) {
        this.endClicked = false;
        this.moveOut = date.formatDate(null, "YYYY-MM-DD");
      }
    },
  },
};
</script>
