<template>
  <div>
    <q-toolbar class="bg-grey-4">
      <q-toolbar-title class="cursor-pointer max-width">
        <router-link class="no-text-decor" :to="{ path: '/' }">
          <q-img
            width="30px"
            height="30px"
            src="~assets/gerilife-logo.png"
            alt=""
          />
          <span class="text-grey-7"> GeriLife<sup>®</sup></span>
        </router-link>
      </q-toolbar-title>
      <div v-if="!!getCookie('token')">
        <router-link
          v-for="(menuItem, index) in menu"
          :key="index"
          :to="{ path: menuItem.route }"
          mode="history"
          class="no-text-decor gt-sm"
        >
          <q-btn class="text-grey-7" size="md" flat :icon="menuItem.icon">
            <span class="q-ml-sm">{{ menuItem.title }}</span>
          </q-btn>
        </router-link>
      </div>
      <q-space />
      <q-btn
        @click="openProfile = true"
        class="text-grey-7"
        flat
        icon="fa fa-user"
      >
        <span class="q-ml-sm">{{
          this.$i18n.t("mainLayoutNavbar-profileLink")
        }}</span>
      </q-btn>
      <div class="max-width">
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
        v-if="!!getCookie('token')"
        class="lt-md"
        flat
        @click="drawerRight = !drawerRight"
        round
        dense
        icon="menu"
      />
      <change-password v-if="openProfile" @close="openProfile = false" />
    </q-toolbar>
    <q-drawer
      v-if="!!getCookie('token')"
      side="right"
      v-model="drawerRight"
      :width="200"
      bordered
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menu">
            <router-link
              :to="{ path: menuItem.route }"
              mode="history"
              class="no-text-decor"
              :key="index"
            >
              <q-item
                :class="{
                  'text-black': selected !== menuItem.title,
                  'text-white': selected === menuItem.title,
                }"
                clickable
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
            </router-link>
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
      ],
    };
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
      this.$router.go();
    },
  },
};
</script>
<style lang="scss" scoped>
.no-text-decor {
  text-decoration: none;
}

.max-width {
  max-width: 6.5em;
}
@media (max-width: $breakpoint-sm-max) {
  .max-width {
    max-width: 8em;
  }
}
</style>