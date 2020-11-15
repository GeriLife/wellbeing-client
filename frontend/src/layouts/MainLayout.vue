<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <geri-life-topbar />
    </q-header>

    <q-page-container>
      <q-page class="flex q-mt-sm">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import GeriLifeTopbar from "components/GeriLifeTopbar.vue";
import { getCookie } from "src/services/cookies";

export default {
  name: "MainLayout",
  components: { GeriLifeTopbar },
  async created() {
    if (!!getCookie("token")) {
      await this.$store.dispatch("user/getUserDetails");
      await this.$store.dispatch("user/getGroupsOfCurrentUser");
    }
  },
};
</script>
