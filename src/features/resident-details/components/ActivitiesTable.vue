<template>
  <div>
    <div>
      {{ $i18n.t("residentActivityTable-filterPanel-header") }}
    </div>
    <q-input :label="$i18n.t('activityTypesLabel')" v-model="filter" outlined />
    <q-table
      :pagination.sync="pagination"
      class="q-mt-md"
      :data="filteredActivities"
      :columns="columns"
      :rows-per-page-options="[10, 25, 50, 100]"
    >
      <template v-slot:body-cell-activityDate="props">
        <q-td :props="props">
          {{ showRelativeDate(props.row.activityDate) }}
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script>
import humanize from "humanize-duration";

export default {
  props: {
    activities: { type: Array, required: true },
  },
  data() {
    return {
      pagination: {},
      filter: "",
      columns: [
        {
          name: "activityType",
          field: "activityType",
          label: this.$i18n.t("residentActivityTable-activityTypeLabel"),
          align: "left",
          sortable: true,
        },
        {
          field: "duration",
          name: "duration",
          label: this.$i18n.t("residentActivityTable-durationLabel"),
          align: "left",
          sortable: true,
        },
        {
          name: "activityDate",
          field: "activityDate",
          label: this.$i18n.t("residentActivityTable-activityDateLabel"),
          align: "left",
          sortable: true,
        },
      ],
    };
  },

  computed: {
    filteredActivities() {
      return this.activities.filter(
        (activity) =>
          !this.filter ||
          activity.activityType
            .toLocaleLowerCase()
            .indexOf(this.filter.toLocaleLowerCase()) > -1 ||
          activity.duration === parseInt(this.filter)
      );
    },
  },

  methods: {
    showRelativeDate(date) {
      return (
        humanize(new Date().getTime() - new Date(date).getTime(), {
          largest: 1,
        }) + " ago"
      );
    },
  },
};
</script>