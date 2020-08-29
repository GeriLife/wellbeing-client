<template>
  <q-toolbar class="bg-grey-4">
    <q-toolbar-title
      @click="$router.push({ path: '/' })"
      class="pointer q-mr-md"
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

    <q-space />
  </q-toolbar>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.bar-grey {
  background-color: #e7e7e7;
}
.pointer {
  cursor: pointer;
}
</style>
