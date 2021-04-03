<template>
  <q-dialog
    class="fit"
    v-model="show"
    @hide="$emit('close')"
    @escape-key="$emit('close')"
  >
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h4">
          <q-icon name="fa fa-cubes" class="q-mr-md" />
          {{ $i18n.t("assignManager-header-text") }}
        </div>
      </q-card-section>

      <q-separator />
      <q-card-section>
        <q-form @submit="onSubmit" ref="assignManager" class="q-gutter-md">
          <q-select
            filled
            multiple
            v-model="selectedUsers"
            map-options
            use-chips
            stack-label
            fill-input
            option-value="value"
            option-label="label"
            :rules="[(v) => requiredValidation(v)]"
            :label="$i18n.t('managersSelectWidget-placeholder')"
            :options="managerList"
            dropdown-icon="fa fa-chevron-down"
          />
        </q-form>
      </q-card-section>

      <q-card-section class="row justify-end">
        <div class="q-gutter-md">
          <q-btn
            type="submit"
            @click="onSubmit"
            class="col-2 text-white bg-green"
          >
            {{ $i18n.t("editHome-save") }}
          </q-btn>
          <q-btn class="col-2 bg-red text-white" @click="$emit('close')">
            {{ $i18n.t("editHome-cancel") }}
          </q-btn>
        </div>
      </q-card-section>

      <q-card-section class="row">
        <div class="col-12 q-mb-sm">
          <span class="float-right">
            <q-input
              outlined
              v-model="search"
              debounce="3000"
              :label="$i18n.t('search-text')"
              clearable
              lazy-rules
            />
          </span>
        </div>
        <q-table
          class="col-12 full-width"
          :data="filteredDisplayList"
          :columns="columns"
          row-key="userId"
          :loading="loading"
          :no-data-label="$i18n.t('assignManager-noCurrentManager')"
          :rows-per-page-options="[10, 25, 50, 100]"
        >
          <template v-slot:body-cell-userId="props">
            <q-td :props="props">
              <q-btn
                @click="revoke(props.row.userId)"
                size="sm"
                round
                class="text-white bg-red q-ml-sm"
              >
                <q-icon size="xs" name="fa fa-trash" />
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {
  getCurrentManagers,
  getEligibleManagers,
  assignManager,
  revokeManagerPermission,
} from "./services/group-manager";
import { requiredValidation } from "src/utils/validations.js";

export default {
  props: {
    groupId: { type: String, required: true },
  },
  data() {
    return {
      show: true,
      managerList: this.home ? this.home.name : null,
      selectedUsers: [],
      displayList: [],
      search: "",
      loading: false,
      columns: [
        {
          name: "address",
          align: "left",
          field: "address",
          sortable: true,
          key: "address",
          label: this.$i18n.t("manager-tableLabels-name"),
        },
        {
          name: "userId",
          field: "userId",
          key: "userId",
          label: this.$i18n.t("manager-tableLabels-revoke"),
        },
      ],
    };
  },

  async created() {
    await this.getManagerList();
  },

  computed: {
    filteredDisplayList() {
      if (!this.search) {
        return this.displayList;
      }
      return this.displayList.filter(
        (v) => v.address.indexOf(this.search) > -1
      );
    },
  },

  methods: {
    requiredValidation,
    async revoke(userId) {
      const resposeStatus = await revokeManagerPermission(this.groupId, userId);
      if (resposeStatus) {
        this.getManagerList();
      }
    },
    async getManagerList() {
      this.loading = true;
      const users = await getCurrentManagers(this.groupId);
      this.displayList = users;

      this.managerList = await getEligibleManagers(users.map((v) => v.userId));
      this.loading = false;
    },

    async onSubmit($ev) {
      const result = await this.$refs.assignManager.validate();
      if (!result) return;
      const apiResponse = await assignManager({
        groupId: this.groupId,
        users: this.selectedUsers.map((v) => v.value),
      });
      if (apiResponse) {
        this.selectedUsers = [];
        this.$refs.assignManager.reset($ev);
        this.getManagerList();
      }
    },
  },
};
</script>
