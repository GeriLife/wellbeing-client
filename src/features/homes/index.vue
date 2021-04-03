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
    <home-group
      v-for="homeGroup in homes"
      :key="homeGroup._id"
      :group="homeGroup"
      class="q-mt-md"
      @edit-clicked="openForEdit"
    />
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
    };
  },

  async created() {
    this.homes = await getUserGroups();
  },

  methods: {
    async close(isGroupChanged) {
      if (isGroupChanged === true) {
        this.homes = await getUserGroups();
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
