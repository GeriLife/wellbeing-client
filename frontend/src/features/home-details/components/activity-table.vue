<template>
  <div>
    <div class="text-h5">
      {{ $i18n.t("activities-pageHeader") }}
    </div>
    <div>
      <q-table
        class="q-mt-md"
        :data="tableData"
        :columns="headers"
        :loading="loading"
        :rows-per-page-options="[10, 25, 50, 100]"
      >
        <template v-slot:body-cell-activityDate="props">
          <q-td :props="props">
            {{ humanizeDate(props.row.activityDate) }}
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>
<script>
import { getHomeActivities } from "../services/detail-services";
import humanize from "humanize-duration";

export default {
  props: {
    homeId: { type: String, required: true }
  },

  data() {
    return {
      loading: false,
      tableData: [],
      headers: [
        {
          name: "residents",
          align: "left",
          field: "residents",
          sortable: true,
          label: this.$i18n.t("activities.residentIds.label")
        },
        {
          name: "type",
          align: "left",
          field: "type",
          sortable: true,
          label: this.$i18n.t("activities.activityTypeId.label")
        },
        {
          name: "duration",
          align: "left",
          field: "duration",
          sortable: true,
          label: this.$i18n.t("activities.duration.label")
        },
        {
          name: "activityDate",
          align: "left",
          field: "activityDate",
          sortable: true,
          label: this.$i18n.t("activities.activityDate.label")
        }
      ]
    };
  },
  async created() {
    this.loading = true;
    this.tableData = await getHomeActivities(this.homeId);
    this.loading = false;
  },
  methods: {
    humanizeDate(activityDate) {
      return (
        humanize(new Date().getTime() - new Date(activityDate).getTime(), {
          largest: 1
        }) + " ago"
      );
    }
  }
};
</script>
