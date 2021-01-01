<template>
  <q-card class="full-width">
    <q-card-section class="text-black">
      <q-icon size="md" name="fa fa-heartbeat" />&nbsp;
      <span class="text-h5">
        {{ $i18n.t("activityTypesSettings-header") }}
      </span>
      <q-btn color="primary" class="float-right" @click="openDialog = true">
        {{ $i18n.t("activityTypesSettings-addActivityTypeButton") }}
      </q-btn>
    </q-card-section>
    <q-card-section>
      <q-table
        :pagination.sync="pagination"
        class="q-mt-md"
        :data="activityTypeList"
        :columns="columns"
        :rows-per-page-options="[10, 25, 50, 100]"
      >
        <template v-slot:body-cell-_id="props">
          <q-td :props="props">
            <q-btn
              v-if="props.row.activityCount === 0"
              @click="
                selected = props.row;
                openDeleteDialog = true;
              "
              size="sm"
              class="bg-red text-white"
              icon="fa fa-trash"
            />
          </q-td>
        </template>
      </q-table>
    </q-card-section>

    <q-card-section>
      <p class="text-black">
        * {{ $i18n.t("activityTypesSettings-activityTypeTable-helpText") }}
      </p>
    </q-card-section>
    <add-new v-if="openDialog" @close="close" />

    <q-dialog
      @hide="closeDeleteDialog"
      @escape-key="closeDeleteDialog"
      v-model="openDeleteDialog"
    >
      <q-card class="q-pa-lg full-width">
        <q-card-section class="text-h5 q-mb-xs" horizontal>
          <q-icon class="q-mr-xs" name="fa fa-user" />
          {{ $i18n.t("deleteActivityTypeConfirmation-header") }}
        </q-card-section>
        <q-separator />
        <q-card-section class="q-mt-md" horizontal
          >{{ $i18n.t("deleteActivityTypeConfirmation-message") }}
        </q-card-section>

        <q-card-section class="float-right" horizontal>
          <q-btn @click="deleteAndClose" class="bg-red text-white">
            {{ $i18n.t("deleteActivityTypeConfirmation-delete") }}
          </q-btn>
          <q-btn @click="closeDeleteDialog" class="q-ml-sm">
            {{ $i18n.t("deleteActivityTypeConfirmation-cancel") }}
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import { getAllActivityTypeIdsApi, removeActivityType } from "./services/index";
import AddNew from "./AddNew";

export default {
  components: {
    AddNew,
  },
  data() {
    return {
      pagination: {},
      openDeleteDialog: false,
      openDialog: false,
      activityTypeList: [],
      selected: null,
      headers: [
        {
          name: "name",
          align: "left",
          field: "name",
          label: this.$i18n.t("residentActivityTypesChart-header"),
        },
      ],
    };
  },

  created() {
    this.init();
  },

  computed: {
    columns() {
      if (this.activityTypeList.some((x) => x.activityCount === 0)) {
        return [
          ...this.headers,
          {
            name: "_id",
            align: "left",
            field: "_id",
            label: this.$i18n.t("usersSettingsTable-tableHeaders-actions"),
          },
        ];
      }
      return this.headers;
    },
  },

  methods: {
    close(reload) {
      this.openDialog = false;
      if (reload) {
        this.init();
      }
    },

    async deleteAndClose() {
      await removeActivityType({ activityTypeId: this.selected._id });
      this.closeDeleteDialog();
      this.init();
    },

    closeDeleteDialog() {
      this.selected = null;
      this.openDeleteDialog = false;
    },

    async init() {
      this.activityTypeList = await getAllActivityTypeIdsApi();
    },
  },
};
</script>