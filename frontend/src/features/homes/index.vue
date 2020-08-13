<template>
  <div>Hi you're in homes</div>
</template>
<script>
export default {
  created() {
    this.getHomes();
  },

  methods: {
    async getHomes() {
      try {
        const homes = await this.$axios.post(
          `/methods/getHomeSelectOptionsWithGroups?_t=${new Date().getTime()}`,
          {},
          {
            headers: { Authorization: "Bearer " + this._getCookie("token") }
          }
        );
        console.log(homes);
      } catch (e) {
        console.error(e);
      }
    },
    _getCookie(cname) {
      const cookies = document.cookie.split("; ");
      const cookie = cookies.find(cookie => cookie.indexOf(cname) === 0);
      return cookie ? cookie.substring(cname.length + 1) : null;
    }
  }
};
</script>
