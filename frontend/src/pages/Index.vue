<template>
  <front-page />
</template>

<script>
import FrontPage from "src/features/front-page/index.vue";

export default {
  name: "PageIndex",
  components: { FrontPage },
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
