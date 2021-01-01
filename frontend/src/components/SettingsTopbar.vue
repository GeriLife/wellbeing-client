<template>
  <div class="bg-white">
    <q-toolbar class="bg-grey-4">
      <q-btn
        @click="$emit('menu-toggled')"
        class="gerilife-blue"
        flat
        round
        dense
        icon="menu"
      />
      <q-toolbar-title
        @click="$route.path !== '/' && $router.push({ path: '/' })"
        class="cursor-pointer q-mr-md"
        shrink
      >
        <q-img
          width="30px"
          height="30px"
          src="~assets/gerilife-logo.png"
          alt=""
        />
        <span class="text-grey-7"> GeriLife<sup>®</sup></span>
      </q-toolbar-title>

      <q-space />
      <template v-if="!!getCookie('token')">
        <q-btn
          @click="$router.push({ path: '/settings' })"
          :disabled="$route.path === '/settings'"
          class="text-grey-7"
          size="md"
          flat
          icon="fa fa-cog"
        >
          <span class="q-ml-sm">{{
            $i18n.t("mainLayoutNavbar-settingsLink")
          }}</span>
        </q-btn>
        <q-btn
          @click="logoutAndRedirect"
          outline
          class="flat text-black bg-white"
        >
          {{ $i18n.t("logout-logoutButton") }}
        </q-btn>
      </template>
    </q-toolbar>
  </div>
</template>

<script>
import { logout } from "src/services/login.js";
import { getCookie } from "src/services/cookies";

export default {
  methods: {
    getCookie,
    async logoutAndRedirect() {
      if (await logout()) {
        window.location.reload();
        if (!this.$route.path.startsWith("/resident/")) {
          window.location.href = "/#/login";
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.gerilife-blue {
  color: $gerilife-blue;
}
</style>