<template>
  <q-card class="full-width">
    <q-card-section class="text-h5">
      <q-icon name="fa fa-database" />&nbsp;
      {{ $i18n.t("dataSettings-header") }}
    </q-card-section>
    <q-card-section>
      <q-card class="q-pa-sm">
        <div class="row">
          <span class="texh-h6">
            {{ $i18n.t("dataSettings-rawData-header") }}
          </span>
          <q-space />
          <q-icon color="primary" name="fa fa-2x fa-database" />
        </div>
        <q-separator class="q-mb-md" />
        <p>
          {{ $i18n.t("dataSettings-rawData-helpText") }}
        </p>
        <div class="row">
          <q-btn
            class="text-white bg-positive"
            @click="exportFile('JSON')"
            :disabled="fetchingData"
          >
            <q-icon name="fa fa-exclamation-triangle" />&nbsp;
            {{ $i18n.t("dataSettings-rawData-exportRawDataButton") }}
          </q-btn>

          <q-btn
            class="bg-primary text-white q-ml-sm"
            @click="exportFile('XLSX')"
            :disabled="fetchingData"
          >
            <q-icon name="fa fa-exclamation-triangle" />&nbsp;
            {{ $i18n.t("dataSettings-rawData-exportXlsButton") }}
          </q-btn>
        </div>
      </q-card>
    </q-card-section>

    <q-card-section>
      <q-card class="q-pa-sm">
        <div class="row">
          <span class="texh-h6">
            {{ $i18n.t("dataSettings-rawData-import-header") }}
          </span>
        </div>
        <q-separator class="q-mb-md" />
        <p>
          {{ $i18n.t("dataSettings-rawData-import-helpText") }}
        </p>
        <q-form ref="myForm" class="fit">
          <div class="q-pb-lg row">
            <q-file
              v-model="inputFile"
              :label="$i18n.t('dataSettings-clickToBrowse')"
              accept="application/json"
              style="max-width: 300px"
              outlined
              clearable
              @clear="summary = null"
              :rules="[requiredValidation, validateJson]"
              class="q-mr-xs q-pa-none"
              type="file"
            />

            <q-btn
              :disabled="importDisabled"
              @click="validateAndSubmit"
              class="text-white bg-primary"
            >
              {{ $i18n.t("dataSettings-importDataBtn") }}
            </q-btn>

            <q-btn
              v-if="!!summary"
              @click="showSummary = true"
              class="q-ml-sm text-white bg-primary"
            >
              {{ $i18n.t("importSummary-showRes") }}
            </q-btn>
          </div>
        </q-form>

        <import-summary
          :summary="summary"
          v-if="showSummary"
          @close="showSummary = false"
        />
      </q-card>
    </q-card-section>
  </q-card>
</template>
<script>
import moment from "moment-timezone";
import { exportData, JSONFileImport } from "./services/index";
import { requiredValidation } from "src/utils/validations.js";
import ImportSummary from "./ImportSummary";

export default {
  components: {
    ImportSummary,
  },

  data() {
    return {
      fetchingData: false,
      inputFile: null,
      summary: null,
      showSummary: false,
      requiredValidation,
    };
  },

  computed: {
    importDisabled() {
      return !this.inputFile;
    },
  },

  methods: {
    async exportFile(type) {
      this.fetchingData = true;
      await exportData(type);
      this.fetchingData = false;
    },
    validateJson(file) {
      if (file.type !== "application/json") {
        return this.$i18n.t("dataSettings-invalid-json");
      }
      return true;
    },
    async validateAndSubmit() {
      const result = await this.$refs.myForm.validate();
      if (!result) return;
      const that = this;
      let reader = new FileReader();
      reader.onload = async function () {
        that.summary = await JSONFileImport(reader.result);
      };
      reader.readAsText(this.inputFile);
    },
  },
};
</script>
