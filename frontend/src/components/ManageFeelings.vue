<template>
  <q-card full-width flat>
    <residents v-model="residents" multiple />
  </q-card>
</template>
<script>
import Residents from "./Residents";

export default {
  components: {
    Residents
  },
  data() {
    return {
      residents: []
    };
  }
};
</script>
