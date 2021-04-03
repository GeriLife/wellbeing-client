<template>
  <div class="full-width">
    <q-card class="q-pa-md row q-gutter-sm" flat>
      <q-card-section
        v-for="(menuItem, index) in menuList"
        :key="index"
        @click="$router.push(menuItem.path)"
        class="col-12 col-sm-2 cursor-pointer text-center text-white bg-primary"
      >
        <q-icon :name="menuItem.icon" /><br />
        <span class="ellipsis" :title="menuItem.label">
          {{ menuItem.label }}
        </span>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { get } from "src/utils/admin-menu.js";

export default {
  data() {
    return {
      menuList: get(),
    };
  },
};
</script>
