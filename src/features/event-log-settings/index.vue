<template>
  <q-card class="full-width">
    <q-card-section class="text-black">
      <q-icon size="md" name="fa fa-th-list" />&nbsp;
      <span class="text-h5">
        {{ $i18n.t("userEventLog-header") }}
      </span>
    </q-card-section>
    <q-card-section>
      <q-table
        :pagination.sync="pagination"
        class="q-mt-md"
        :data="eventLogs"
        :columns="headers"
        :rows-per-page-options="[10, 25, 50, 100]"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import { getUserEventLogs } from "./services/index";

export default {
  data() {
    return {
      pagination: {},
      eventLogs: [],
      headers: [
        {
          name: "eventDate",
          align: "left",
          field: "eventDate",
          sortable: true,
          label: this.$i18n.t("userEventLog.eventDate"),
        },
        {
          name: "userId",
          align: "left",
          field: "userId",
          sortable: true,
          label: this.$i18n.t("userEventLog.userId"),
        },
        {
          name: "action",
          align: "left",
          field: "action",
          sortable: true,
          label: this.$i18n.t("userEventLog.action"),
        },
        {
          name: "entityType",
          align: "left",
          field: "entityType",
          sortable: true,
          label: this.$i18n.t("userEventLog.entityType"),
        },
        {
          name: "entityId",
          align: "left",
          field: "entityId",
          sortable: true,
          label: this.$i18n.t("userEventLog.entityId"),
        },
      ],
    };
  },

  created() {
    this.init();
  },

  methods: {
    async init() {
      this.eventLogs = await getUserEventLogs();
    },
  },
};
</script>