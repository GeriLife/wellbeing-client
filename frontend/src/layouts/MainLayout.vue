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
  async created() {
    const { data: cookieData } = await this.$axios.post("/users/login", {
      email: "mehtashailee21@gmail.com",
      password: "123456"
    });
    console.log(cookieData);
    document.cookie = `token=${cookieData.token}; expires=${cookieData.tokenExpires}`;

    await this.$store.dispatch("user/getUserDetails");
  }
};
</script>
