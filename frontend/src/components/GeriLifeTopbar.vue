<template>
  <q-toolbar class="text-primary bg-grey-4">
    <q-toolbar-title class="q-mr-md" shrink>
      <q-img
        width="30px"
        height="30px"
        src="~assets/gerilife-logo.png"
        alt=""
      />
      GeriLife<sup>®</sup>
    </q-toolbar-title>

    <q-btn
      @click="$router.push({ path: '/residents' })"
      dense
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
      dense
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
      dense
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
