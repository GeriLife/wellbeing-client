<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <settings-topbar @menu-toggled="showFullMenu = !showFullMenu" />
    </q-header>
    <q-drawer
      show-if-above
      side="left"
      v-model="showBar"
      :width="250"
      :mini="!showFullMenu"
      bordered
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item class="text-black">
            <q-item-section>
              {{ $i18n.t("settingsLayoutSidebar-header") }}</q-item-section
            >
          </q-item>
          <template v-for="(menuItem, index) in menuList">
            <q-item
              :class="{
                'text-black': selected !== menuItem.label,
                'text-white': selected === menuItem.label,
              }"
              :key="index"
              clickable
              @click="
                selected = menuItem.label;
                $router.push(menuItem.path);
              "
              active-class="bg-primary"
              :active="menuItem.label === selected"
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <q-page class="flex q-mt-sm">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import SettingsTopbar from "components/SettingsTopbar.vue";
import { getCookie } from "src/services/cookies";
import { get } from "src/utils/admin-menu.js";

export default {
  name: "MainLayout",
  components: { SettingsTopbar },
  data() {
    return {
      showFullMenu: true,
      showBar: true,
      selected: null,
      menuList: get(),
    };
  },
  async created() {
    if (!!getCookie("token")) {
      await this.$store.dispatch("user/getUserDetails");
      await this.$store.dispatch("user/getGroupsOfCurrentUser");
    }
  },
};
</script>
