<template>
  <q-dialog
    class="fit"
    v-model="show"
    @hide="$emit('close')"
    @escape-key="$emit('close')"
  >
    <q-card class="q-pa-xs">
      <q-card-section>
        <span class="text-h5">{{ $i18n.t("importSummary-title") }}</span>
      </q-card-section>
      <q-card-section>
        <table aria-label="Summary of import">
          <tr>
            <th id="1">
              {{ $i18n.t("importSummary-collectionNameHeader") }}
            </th>
            <th id="2">
              {{ $i18n.t("importSummary-summaryHeader") }}
            </th>
            <th id="3">
              {{ $i18n.t("importSummary-dbMessageHeader") }}
            </th>
          </tr>
          <tr v-for="(row, index) in summary" :key="index">
            <td>{{ row.collectionName }}</td>
            <template v-if="row.error">
              <td>{{ row.error.message }}</td>
              <td>{{ row.error.data }}</td>
            </template>
            <template v-else>
              <td>{{ row.message }}</td>
              <td>{{ row.data }}</td>
            </template>
          </tr>
        </table>
      </q-card-section>
      <q-card-section>
        <q-btn
          @click="$emit('close')"
          outline
          class="q-mb-sm float-right text-black"
        >
          {{ $i18n.t("modal-close") }}
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  props: {
    summary: { required: true, type: Array },
  },
  data() {
    return {
      show: true,
    };
  },
};
</script>
<style lang="scss" scoped>
tr:nth-child(even) {
  background-color: $rowGreyBg;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
}

td,
th {
  border: 1px solid #ddd;
  padding: 8px;
}
</style>