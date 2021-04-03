<template>
  <q-card class="full-width">
    <q-card-section class="text-black">
      <q-icon size="md" name="fa fa-user-md" />&nbsp;
      <span class="text-h5">
        {{ $i18n.t("rolesSettings-heading") }}
      </span>
      <q-btn color="primary" class="float-right" @click="openDialog = true">
        {{ $i18n.t("rolesSettings-addRoleButton") }}
      </q-btn>
    </q-card-section>
    <q-card-section>
      <q-table
        :pagination.sync="pagination"
        class="q-mt-md"
        :data="rolesList"
        :columns="headers"
        :rows-per-page-options="[10, 25, 50, 100]"
      />
    </q-card-section>

    <add-new v-if="openDialog" @close="close" />
  </q-card>
</template>

<script>
import { getRolesExceptAdmin } from "./services/index";
import AddNew from "./AddNew.vue";

export default {
  components: {
    AddNew,
  },
  data() {
    return {
      pagination: {},
      openDialog: false,
      rolesList: [],
      headers: [
        {
          name: "name",
          align: "left",
          field: "name",
          label: this.$i18n.t("residentFacilitatorRolesChart-header"),
        },
      ],
    };
  },

  created() {
    this.init();
  },

  methods: {
    close(reload) {
      this.openDialog = false;
      if (reload) {
        this.init();
      }
    },

    async init() {
      this.rolesList = await getRolesExceptAdmin();
    },
  },
};
</script>