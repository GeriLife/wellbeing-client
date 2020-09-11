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

export default {
  name: "MainLayout",
  components: { GeriLifeTopbar },
  data() {
    return {};
  }
};
</script>
