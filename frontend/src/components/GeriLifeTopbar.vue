<template>
  <q-toolbar class="bg-grey-4">
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

    <template v-if="!!getCookie('token')">
      <q-btn
        @click="$router.push({ path: '/residents' })"
        class="text-grey-7"
        size="md"
        flat
        icon="fa fa-users"
      >
        <span class="q-ml-sm">{{
          $i18n.t("mainLayoutNavbar-residentsLink")
        }}</span>
      </q-btn>
      <q-btn
        @click="$router.push({ path: '/activities' })"
        class="text-grey-7"
        flat
        size="md"
        icon="fa fa-heartbeat"
      >
        <span class="q-ml-sm">{{
          $i18n.t("mainLayoutNavbar-activitesLink")
        }}</span>
      </q-btn>
      <q-btn
        @click="$router.push({ path: '/homes' })"
        class="text-grey-7"
        flat
        size="md"
        icon="fa fa-home"
      >
        <span class="q-ml-sm">{{ $i18n.t("mainLayoutNavbar-homesLink") }}</span>
      </q-btn>
      <q-btn
        @click="$router.push({ path: '/report' })"
        class="text-grey-7"
        flat
        size="md"
        icon="fa fa-chart-line"
      >
        <span class="q-ml-sm">{{
          $i18n.t("mainLayoutNavbar-reportLink")
        }}</span>
      </q-btn>
    </template>
    <q-space />
    <q-select
      outlined
      dense
      fill-input
      class="q-mr-sm"
      bg-color="white"
      map-options
      :value="$i18n.locale"
      @input="changeLanguage"
      :options="languageOptions"
    />
    <template v-if="!!getCookie('token')">
      <q-btn
        @click="openProfile = true"
        class="text-grey-7"
        flat
        size="md"
        icon="fa fa-user"
      >
        <span class="q-ml-sm">{{
          $i18n.t("mainLayoutNavbar-profileLink")
        }}</span>
      </q-btn>

      <q-btn
        @click="$router.push({ path: '/settings' })"
        class="text-grey-7"
        flat
        size="md"
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

    <change-password v-if="openProfile" @close="openProfile = false" />
  </q-toolbar>
</template>

<script>
import { logout } from "src/services/login.js";
import { getCookie } from "src/services/cookies";
import ChangePassword from "./ChangePassword.vue";

export default {
  components: {
    ChangePassword,
  },

  data() {
    return {
      getCookie,
      openProfile: false,
      languageOptions: [
        { label: "English", value: "en" },
        { label: "Suomi", value: "fi" },
      ],
    };
  },

  methods: {
    async logoutAndRedirect() {
      if (await logout()) {
        window.location.reload();
        if (!this.$route.path.startsWith("/resident/")) {
          window.location.href = "/#/login";
        }
      }
    },

    changeLanguage(selected) {
      this.$i18n.locale = selected.value;
      localStorage.setItem("locale", selected.value);
    },
  },
};
</script>
