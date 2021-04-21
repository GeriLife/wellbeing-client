<template>
  <div class="fit q-pa-lg">
    <div class="text-h5">
      <q-icon name="fa fa-home" />&nbsp;
      {{ $i18n.t("homes-header") }}

      <q-btn
        @click="showAddGroup = true"
        class="bg-primary text-white float-right"
      >
        <q-icon name="fa fa-cubes" />&nbsp;{{
          $i18n.t("homes-header-addNewButton-group")
        }}</q-btn
      >
    </div>
    <q-separator class="q-mt-sm" />
    <div v-if="!loading">
      <home-group
        v-for="homeGroup in homes"
        :key="homeGroup._id"
        :group="homeGroup"
        class="q-mt-md"
        @edit-clicked="openForEdit"
      />
    </div>
    <div v-else class="center-aligned">
      <q-circular-progress
        :value="61"
        indeterminate
        size="50px"
        :thickness="0.22"
        color="primary"
        track-color="grey-3"
        class="q-ma-md"
      />
    </div>
    <add-group v-if="showAddGroup" :group="selectedGroup" @close="close" />
  </div>
</template>
<script>
import { getUserGroups } from "./services/homes-list";
import HomeGroup from "./home-group";
import AddGroup from "./add-group";

export default {
  components: {
    HomeGroup,
    AddGroup,
  },

  data() {
    return {
      homes: null,
      showAddGroup: false,
      selectedGroup: null,
      loading: false,
    };
  },

  async created() {
    this.loading = true;
    this.homes = await getUserGroups();
    this.loading = false;
  },

  methods: {
    async close(isGroupChanged) {
      if (isGroupChanged === true) {
        this.loading = true;
        this.homes = await getUserGroups();
        this.loading = false;
      }
      this.selectedGroup = null;
      this.showAddGroup = false;
    },

    openForEdit(group) {
      this.selectedGroup = group;
      this.showAddGroup = true;
    },
  },
};
</script>