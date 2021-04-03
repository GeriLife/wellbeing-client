<template>
  <q-card class="fit">
    <q-card-section class="text-h5">
      <q-icon name="fa fa-users" />&nbsp;
      {{ $i18n.t("usersSettings-header") }}

      <q-btn @click="showUser = true" class="float-right text-white bg-primary">
        {{ $i18n.t("usersSettings-addUserButton") }}
      </q-btn>
    </q-card-section>

    <q-card-section>
      <q-table
        :pagination.sync="pagination"
        :data="userList"
        :columns="headers"
        :loading="loading"
        :rows-per-page-options="[10, 25, 50, 100]"
      >
        <template v-slot:body-cell-password="props">
          <q-td :props="props">
            <q-icon
              v-if="props.row.services && props.row.services.password"
              name="fa fa-check fa-2x"
              class="text-positive"
            />

            <q-icon v-else name="fa fa-times fa-2x" class="text-negative" />
          </q-td>
        </template>

        <template v-slot:body-cell-_id="props">
          <q-td :props="props">
            <q-btn
              @click="
                selectedUser = props.row;
                showUser = true;
              "
              class="bg-warning text-white"
            >
              <q-icon size="xs" name="fas fa-pen-square" />&nbsp;
              {{ $i18n.t("usersSettingsTableActions-editButtonText") }}
            </q-btn>
            <q-btn
              @click="
                selectedUser = props.row._id;
                showGroups = true;
              "
              class="q-ml-xs bg-primary text-white"
            >
              <q-icon size="xs" name="fa fa-cubes" />&nbsp;

              {{ $i18n.t("groups-header") }}
            </q-btn>
            <q-btn
              v-if="userCanDeleteAccount(props.row)"
              @click="
                selectedUser = props.row;
                showDelete = true;
              "
              class="q-ml-xs bg-negative text-white"
            >
              <q-icon size="xs" name="fa fa-trash" />&nbsp;
              {{ $i18n.t("usersSettingsTableActions-deleteButtonText") }}
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
    <q-card-section>
      <enroll-users @refresh-users="init" />
    </q-card-section>
    <groups
      v-if="showGroups"
      :user-id="selectedUser"
      @close="
        selectedUser = null;
        showGroups = false;
      "
    />
    <delete-user
      v-if="showDelete"
      :user="selectedUser"
      @close="closeAndReload"
    />
    <add-edit-user
      v-if="showUser"
      :current-user="selectedUser"
      @close="closeAndReload"
    />
  </q-card>
</template>
<script>
import { getUserList } from "./services/index";
import Groups from "./Groups.vue";
import DeleteUser from "./DeleteUser.vue";
import AddEditUser from "./AddEditUser.vue";
import EnrollUsers from "./EnrollUsers.vue";

export default {
  components: {
    Groups,
    DeleteUser,
    AddEditUser,
    EnrollUsers,
  },

  data() {
    return {
      userList: [],
      showUser: false,
      loading: false,
      showGroups: false,
      showDelete: false,
      pagination: {},
      selectedUser: null,
      headers: [
        {
          name: "Email",
          align: "left",
          field: "Email",
          label: this.$i18n.t("usersSettingsTable-tableHeaders-email"),
        },
        {
          name: "isActive",
          align: "left",
          field: "isActive",
          label: this.$i18n.t("usersSettingsTable-tableHeaders-isActive"),
        },

        {
          name: "password",
          align: "left",
          field: "password",
          label: this.$i18n.t("usersSettingsTable-tableHeaders-passwordActive"),
        },

        {
          name: "roles",
          align: "left",
          field: "roles",
          label: this.$i18n.t("usersSettingsTable-tableHeaders-roles"),
        },

        {
          name: "_id",
          align: "left",
          field: "_id",
          label: this.$i18n.t("usersSettingsTable-tableHeaders-actions"),
        },
      ],
    };
  },

  created() {
    this.init();
  },

  methods: {
    async init() {
      this.loading = true;
      this.userList = await getUserList();
      this.loading = false;
    },

    userCanDeleteAccount(obj) {
      return this.$store.getters["user/user"].details._id !== obj._id;
    },

    closeAndReload(reload) {
      this.selectedUser = null;
      this.showDelete = false;
      this.showUser = false;

      if (reload) {
        this.init();
      }
    },
  },
};
</script>