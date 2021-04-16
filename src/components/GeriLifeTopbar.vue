<template>
  <div>
    <q-toolbar class="bg-grey-4">
      <div class="row no-wrap" style="width: 100%">
        <q-toolbar-title
          @click="$route.path !== '/' && $router.push({ path: '/' })"
          class="cursor-pointer col-auto"
        >
          <q-img
            width="30px"
            height="30px"
            src="~assets/gerilife-logo.png"
            alt=""
          />
          <span class="text-grey-7"> GeriLife<sup>®</sup></span>
        </q-toolbar-title>
        <div class="col-8">
          <div v-if="!!getCookie('token') && isMdOrAbove">
            <q-btn
              v-for="(menuItem, index) in menu"
              :key="index"
              class="text-grey-7"
              flat
              :icon="menuItem.icon"
              @click="clicked(menuItem, index)"
            >
              <span class="q-ml-sm">{{ menuItem.title }}</span>
            </q-btn>
          </div>
        </div>
      </div>
      <div style="max-width: 150px">
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

      <q-btn
        v-if="!!getCookie('token')"
        @click="logoutAndRedirect"
        outline
        class="q-ml-xs flat text-black bg-white"
      >
        {{ $i18n.t("logout-logoutButton") }}
      </q-btn>
      <q-btn
        v-if="!!getCookie('token') && !isMdOrAbove"
        flat
        @click="drawerRight = !drawerRight"
        round
        dense
        icon="menu"
      />
      <change-password v-if="openProfile" @close="openProfile = false" />
    </q-toolbar>
    <q-drawer
      v-if="!!getCookie('token') && !isMdOrAbove"
      side="right"
      v-model="drawerRight"
      :width="200"
      bordered
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menu">
            <q-item
              :class="{
                'text-black': selected !== menuItem.title,
                'text-white': selected === menuItem.title,
              }"
              :key="index"
              clickable
              @click="clicked(menuItem, index)"
              active-class="bg-primary"
              :active="menuItem.title === selected"
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.title }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
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
      drawerRight: false,
      selected: null,
      openProfile: false,
      languageOptions: [
        { label: "English", value: "en" },
        { label: "Suomi", value: "fi" },
      ],
      menu: [
        {
          icon: "fa fa-users",
          title: this.$i18n.t("mainLayoutNavbar-residentsLink"),
          route: "/residents",
        },
        {
          icon: "fa fa-heartbeat",
          title: this.$i18n.t("mainLayoutNavbar-activitesLink"),
          route: "/activities",
        },
        {
          icon: "fa fa-home",
          title: this.$i18n.t("mainLayoutNavbar-homesLink"),
          route: "/homes",
        },
        {
          icon: "fa fa-chart-line",
          title: this.$i18n.t("mainLayoutNavbar-reportLink"),
          route: "/report",
        },
        {
          icon: "fa fa-cog",
          title: this.$i18n.t("mainLayoutNavbar-settingsLink"),
          route: "/settings",
        },
        {
          icon: "fa fa-user",
          title: this.$i18n.t("mainLayoutNavbar-profileLink"),
          isProfileLink: true,
        },
      ],
    };
  },
  computed: {
    isMdOrAbove() {
      return this.$q.screen.md || this.$q.screen.lg || this.$q.screen.xl;
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

    clicked(menuItem) {
      this.selected = menuItem.title;
      if (menuItem.isProfileLink) {
        this.openProfile = true;
      } else {
        this.$router.push({ path: menuItem.route });
      }
    },

    changeLanguage(selected) {
      this.$i18n.locale = selected.value;
      localStorage.setItem("locale", selected.value);

      this.$router.go();
    },
  },
};
</script>
