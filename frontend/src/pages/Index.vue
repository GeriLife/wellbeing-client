<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg" />
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",

  async created() {
    const { data: cookieData } = await this.$axios.post("/users/login", {
      email: "mehtashailee21@gmail.com",
      password: "123456"
    });
    console.log(cookieData);
    document.cookie = `token=${cookieData.token}; expires=${cookieData.tokenExpires}`;
  }
};
</script>
