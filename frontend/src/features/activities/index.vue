<template>
  <div class="fit q-ma-md">
    <div class="text-h5">
      <q-icon name="fa fa-heartbeat" />&nbsp;
      {{ $i18n.t("activities-pageHeader") }}

      <q-btn
        @click="openDialog = true"
        class="bg-primary text-white float-right"
        >{{ $i18n.t("activities-addActivityButton") }}</q-btn
      >
    </div>
    <q-separator class="q-mt-sm" />
    <q-card class="q-mt-md">
      <q-card-section class="bg-grey-4">
        {{ $i18n.t("activities-filterActivities-heading") }}
        <q-btn
          @click="clearFilters"
          :disabled="!areFiltersActive"
          size="sm"
          class="bg-primary text-white float-right"
        >
          <q-icon name="fa fa-times" />
          {{ $i18n.t("activities-filterActivities-clearFiltersText") }}</q-btn
        >
      </q-card-section>
      <q-card-section class="row q-gutter-sm">
        <residents
          class="col-5"
          v-model="resident"
          @input="val => getData({ pagination: { ...pagination, page: 1 } })"
          :multiple="false"
        />
        <activity-types
          class="col-5"
          v-model="activityType"
          @input="val => getData({ pagination: { ...pagination, page: 1 } })"
        />
      </q-card-section>
    </q-card>
    <q-table
      :pagination.sync="pagination"
      class="q-mt-md"
      :data="data"
      :columns="headers"
      row-key="name"
      @request="getData"
      :loading="loading"
      :rows-per-page-options="[10, 25, 50, 100]"
    >
      <template v-slot:body-cell-_id="props">
        <q-td :props="props">
          <q-btn
            v-if="dateFallsInLastWeek(props.row.originalActivityDate)"
            size="sm"
            @click="selectAndOpen(props.row, 'edit')"
            class="text-black"
          >
            <q-icon size="xs" color="black" name="edit"></q-icon>
            &nbsp;{{ $i18n.t("editActivityButton-text") }}
          </q-btn>

          <q-btn
            @click="selectAndOpen(props.row, 'delete')"
            size="sm"
            class="text-white bg-red  q-ml-sm"
          >
            <q-icon size="xs" name="fa fa-trash" />&nbsp;{{
              $i18n.t("deleteActivityButton-text")
            }}
          </q-btn>
        </q-td>
      </template>
    </q-table>

    <q-dialog
      @hide="closeDialog"
      @escape-key="closeDialog"
      v-model="openDialog"
    >
      <q-card class="fit">
        <q-card-section horizontal>
          <manage-activity
            v-if="openDialog"
            :resident-id="selectedRecord"
            @activity-result="closeAndRefreshContent"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog
      @hide="closeDialog"
      @escape-key="closeDialog"
      v-model="openDeleteDialog"
    >
      <q-card class="q-pa-lg full-width">
        <q-card-section class="text-h5 q-mb-xs" horizontal>
          <q-icon class="q-mr-xs" name="fa fa-user" />
          {{ $i18n.t("deleteActivityConfirmation-header") }}
        </q-card-section>
        <q-separator />
        <q-card-section class="q-mt-md" horizontal
          >{{ $i18n.t("deleteActivityConfirmation-message") }}
        </q-card-section>

        <q-card-section class="float-right" horizontal>
          <q-btn @click="deleteAndClose" class="bg-red text-white">
            {{ $i18n.t("deleteActivityConfirmation-delete") }}
          </q-btn>
          <q-btn @click="closeDialog" class="q-ml-sm">
            {{ $i18n.t("deleteActivityConfirmation-cancel") }}
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { getActivities, deleteActivity } from "./services/activities-services";
import humanize from "humanize-duration";
import Residents from "src/components/Residents";
import ActivityTypes from "src/components/ActivityTypes";
import ManageActivity from "src/components/ManageActivity";
import { date } from "quasar";

export default {
  components: {
    Residents,
    ActivityTypes,
    ManageActivity
  },
  data() {
    return {
      data: [],
      loading: false,
      resident: null,
      activityType: null,
      openDialog: false,
      pagination: {
        sortBy: "activityDate",
        descending: true,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 1
      },
      columns: [
        {
          name: "residents",
          align: "left",
          field: "residents",
          label: this.$i18n.t("activities.residentIds.label")
        },
        {
          name: "type",
          align: "left",
          field: "type",
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
      ],
      selectedRecord: null,
      openDeleteDialog: false
    };
  },

  computed: {
    headers() {
      /* Allow edit, delete actions only if user is admin */
      if (this.$store.getters["user/isUserAdmin"]) {
        return [...this.columns, { name: "_id", field: "_id", label: "" }];
      }
      return this.columns;
    },
    residentId() {
      return this.resident ? this.resident.value : null;
    },
    activityTypeId() {
      return this.activityType ? this.activityType._id : null;
    },

    areFiltersActive() {
      return !!this.activityTypeId || !!this.residentId;
    }
  },

  created() {
    this.getData({ pagination: this.pagination });
  },

  methods: {
    /* Method called by q-table, filter component when pagination
       params like pageNo, #recordsperpage, sort order, filters etc are changed */
    async getData({ pagination }) {
      this.pagination = pagination;
      const { page, rowsPerPage, sortBy, descending } = pagination;
      this.loading = true;

      /* Api call to get activities, paginated API. */
      const { count, rows } = await getActivities({
        currentPage: page,
        rowsPerPage,
        sortBy,
        descending,
        residentId: this.residentId,
        activityTypeId: this.activityTypeId
      });

      this.data = rows.map(r => ({
        ...r,
        /* Formatting date as required by the q-date component */
        originalActivityDate: r.activityDate,
        activityDate:
          humanize(new Date().getTime() - new Date(r.activityDate).getTime(), {
            largest: 1
          }) + " ago"
      }));
      this.pagination.rowsNumber = count;
      this.loading = false;
    },

    clearFilters() {
      this.resident = null;
      this.activityType = null;
      this.getData({ pagination: { ...this.pagination, page: 1 } });
    },

    closeAndRefreshContent(resultSuccess) {
      if (resultSuccess) {
        this.selectedRecord = null;
        this.openDialog = false;
        this.openDeleteDialog = false;
        this.closeDialog();
        this.getData({ pagination: this.pagination });
      }
    },

    /* For each row, check if the activity was done within the last seven days.
    Used to decide whether to show edit button. */
    dateFallsInLastWeek(v) {
      return (
        new Date(v).getTime() <= new Date().getTime() &&
        new Date(v).getTime() >=
          new Date(date.subtractFromDate(new Date(), { days: 7 })).getTime()
      );
    },

    /* when clicked on a record action, seleted the record and open appropriate dialog */
    selectAndOpen(record, action) {
      this.selectedRecord = record._id;
      if (action === "edit") {
        this.openDialog = true;
      } else {
        this.openDeleteDialog = true;
      }
    },

    /* Dismiss dialog */
    closeDialog() {
      this.selectedRecord = null;
      this.openDialog = false;
      this.openDeleteDialog = false;
    },

    /* Close delete dialog, and call api to delete activity */
    async deleteAndClose() {
      await deleteActivity(this.selectedRecord);
      this.closeAndRefreshContent(true);
    }
  }
};
</script>
