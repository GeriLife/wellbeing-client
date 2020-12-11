<template>
  <q-card flat bordered>
    <q-card-section class="bg-grey-4">
      <q-icon name="fa fa-lg fa-users"></q-icon>&nbsp;
      {{ $i18n.t("home-residentsPanel-heading") }}
    </q-card-section>
    <q-card-section>
      <table class="full-width">
        <caption>
          {{
            $i18n.t("homeResidents-tableCaption")
          }}
        </caption>
        <thead>
          <tr class="q-my-md">
            <th id="empty-space-start" colspan="3"></th>
            <th id="past-week" colspan="7">
              {{ $i18n.t("homeResidents-tableHeader-pastWeek") }}
            </th>
          </tr>

          <tr>
            <th id="r-name">
              <q-icon name="fa fa-lg fa-user" />&nbsp;
              {{ $i18n.t("homeResidents-tableHeader-residentName") }}
            </th>
            <th id="day-count">
              <i class="fa fa-lg fa-heartbeat"></i>
              {{ $i18n.t("homeResidents-tableHeader-activeDaysCount") }}
            </th>
            <th id="level">
              <q-icon class="fa fa-lg fa-heartbeat" />
              {{ $i18n.t("homeResidents-tableHeader-activityLevel") }}
            </th>

            <th
              :id="`weekday-${index}`"
              v-for="(day, index) in pastSevenDays"
              :key="index"
            >
              {{ abbreviatedWeekday(day) }}
            </th>
          </tr>
        </thead>
        <tbody class="full-width">
          <template v-if="residents.length > 0">
            <tr
              v-for="(resident, resident_index) in residents"
              :key="resident._id"
              class="row-class"
            >
              <td>
                {{ resident.firstName }} {{ resident.lastInitial }}
                <span class="q-ml-sm">
                  <q-icon
                    name="fa fa-eye"
                    class="cursor-pointer"
                    @click="$router.push(`/resident/${resident._id}`)"
                  />
                </span>
              </td>
              <td class="activity-count">
                {{ activeDayscount(resident_index) }}
              </td>
              <td :class="activityLabelClass(resident, resident_index)">
                {{ activityLabelText(resident, resident_index) }}
              </td>
              <template v-if="recentActiveDays[resident_index]">
                <td
                  v-for="(day, index) in recentActiveDays[resident_index]
                    .recentActiveDays"
                  :key="index"
                >
                  <em
                    v-if="day.residentWasActive"
                    class="q-ml-md fa fa-check"
                  ></em>
                </td>
              </template>
            </tr>
          </template>

          <tr v-else>
            <th id="empty-space-start" colspan="3"></th>
            <td colspan="3" v-if="loadingResidents">
              {{ $i18n.t("homeResidents-loadingMessage") }}
            </td>
            <td colspan="3" v-else>
              {{ $i18n.t("homeResidents-noResidents") }}
            </td>
            <th id="empty-space-end" colspan="4"></th>
          </tr>
        </tbody>
      </table>
    </q-card-section>
  </q-card>
</template>
<script>
import moment from "moment";
import "moment/locale/fi";
import * as d3 from "d3";
import {
  getHomeCurrentAndActiveResidents,
  getSelectedResidentsRecentActiveDaysAndCount,
} from "../services/detail-services";

export default {
  props: {
    homeId: { type: String, required: true },
  },

  data() {
    return {
      residents: [],
      recentActiveDays: [],
      loadingResidents: false,
    };
  },

  async created() {
    this.loadingResidents = true;
    this.residents = await getHomeCurrentAndActiveResidents(this.homeId);
    this.recentActiveDays = await getSelectedResidentsRecentActiveDaysAndCount(
      this.residents.map((r) => r._id)
    );
    this.loadingResidents = false;
  },

  computed: {
    pastSevenDays() {
      // Get date seven days ago
      const sevenDaysAgo = moment().subtract(7, "days").toDate();

      // Get array of past seven days including today
      return d3.utcDay.range(sevenDaysAgo, new Date());
    },
  },
  methods: {
    //TODO: add redirection to resident detail page

    abbreviatedWeekday(date) {
      // Get user language
      const locale = this.$i18n.locale;

      // Set locale based on user browser language
      moment.locale(locale);

      // Format the date to display abbreviated weekday in user language
      return moment(date).format("dd");
    },

    activeDayscount(resident_index) {
      return this.recentActiveDays[resident_index]
        ? this.recentActiveDays[resident_index].activeDaysCount
        : 0;
    },

    activityLabelText(resident, resident_index) {
      // Check if resident is on hiatus
      if (resident.onHiatus) {
        // Get localized text for 'on hiatus' status
        return this.$i18n.t("homeResident-activityLabelText-onHiatus");
      }

      // Get activity level translations
      const active = this.$i18n.t("residentActivityLevel-active");
      const semiActive = this.$i18n.t("residentActivityLevel-semiActive");
      const inactive = this.$i18n.t("residentActivityLevel-inactive");

      const recentActiveDaysCount = this.activeDayscount(resident_index);
      // Case for returning Bootstrap class based on activity level
      if (recentActiveDaysCount >= 5) {
        return active;
      } else if (recentActiveDaysCount > 0 && recentActiveDaysCount < 5) {
        return semiActive;
      } else if (recentActiveDaysCount === 0) {
        return inactive;
      }
      return "";
    },

    activityLabelClass(resident, resident_index) {
      if (resident.onHiatus) {
        return "info";
      }

      // Get resident activity count
      const recentActiveDaysCount = this.activeDayscount(resident_index);

      // Case for returning Bootstrap class based on activity level
      if (recentActiveDaysCount >= 5) {
        return "success";
      } else if (recentActiveDaysCount > 0 && recentActiveDaysCount < 5) {
        return "warning";
      } else if (recentActiveDaysCount === 0) {
        return "danger";
      }
      return "";
    },
  },
};
</script>
<style lang="scss" scoped>
table {
  border-collapse: collapse;
}
th,
td {
  border-bottom: 1px solid $grey-4;
  padding-top: 8px;
  padding-bottom: 8px;
}
tbody > tr:nth-of-type(odd) {
  background-color: $rowGreyBg;
}

.info {
  background-color: $info;
}
.warning {
  background-color: $warning;
}
.success {
  background-color: $positive;
}

.danger {
  background-color: $negative;
}
.stretch {
  width: 100%;
}
</style>
