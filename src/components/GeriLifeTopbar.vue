<template>
  <q-toolbar class="bg-grey-4">
    <div class="row" style="width: 100%">
      <q-toolbar-title
        @click="$route.path !== '/' && $router.push({ path: '/' })"
        class="cursor-pointer col-md-2"
      >
        <q-img
          width="30px"
          height="30px"
          src="~assets/gerilife-logo.png"
          alt=""
        />
        <span class="text-grey-7"> GeriLife<sup>®</sup></span>
      </q-toolbar-title>
      <div v-if="!!getCookie('token')" class="col-12 col-md-5">
        <q-btn
          @click="$router.push({ path: '/residents' })"
          class="text-grey-7"
          :size="isSmOrAbove ? 'md' : 'xs'"
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
          :size="isSmOrAbove ? 'md' : 'xs'"
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
          :size="isSmOrAbove ? 'md' : 'xs'"
          icon="fa fa-home"
        >
          <span class="q-ml-sm">{{
            $i18n.t("mainLayoutNavbar-homesLink")
          }}</span>
        </q-btn>
        <q-btn
          @click="$router.push({ path: '/report' })"
          class="text-grey-7"
          flat
          :size="isSmOrAbove ? 'md' : 'xs'"
          icon="fa fa-chart-line"
        >
          <span class="q-ml-sm">{{
            $i18n.t("mainLayoutNavbar-reportLink")
          }}</span>
        </q-btn>
      </div>
      <q-space />
      <div class="col-3 col-md-1">
        <q-select
          outlined
          dense
          fill-input
          bg-color="white"
          map-options
          :value="$i18n.locale"
          @input="changeLanguage"
          :options="languageOptions"
        />
      </div>
      <div class="col-9 col-md-4" v-if="!!getCookie('token')">
        <q-btn
          @click="logoutAndRedirect"
          :size="isSmOrAbove ? 'md' : 'xs'"
          outline
          class="float-right flat text-black bg-white"
        >
          {{ $i18n.t("logout-logoutButton") }}
        </q-btn>

        <q-btn
          @click="$router.push({ path: '/settings' })"
          class="float-right text-grey-7"
          flat
          :size="isSmOrAbove ? 'md' : 'xs'"
          icon="fa fa-cog"
        >
          <span class="q-ml-sm">{{
            $i18n.t("mainLayoutNavbar-settingsLink")
          }}</span>
        </q-btn>

        <q-btn
          @click="openProfile = true"
          class="float-right text-grey-7"
          flat
          :size="isSmOrAbove ? 'md' : 'xs'"
          icon="fa fa-user"
        >
          <span class="q-ml-sm">{{
            $i18n.t("mainLayoutNavbar-profileLink")
          }}</span>
        </q-btn>
      </div>
    </div>
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
  computed: {
    isSmOrAbove() {
      return (
        this.$q.screen.sm ||
        this.$q.screen.md ||
        this.$q.screen.lg ||
        this.$q.screen.xl
      );
    },
  },

  methods: {
    async logoutAndRedirect() {
      if (await logout()) {
        this.$router.go();
        if (!this.$route.path.startsWith("/resident/")) {
          this.$router.push({ path: "/login" });
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
