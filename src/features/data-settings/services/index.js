import { $axios } from "src/boot/axios";
import { errorNotifier, successNotifier } from "src/utils/notifier.js";
import { i18n } from "src/boot/i18n";
import fs from "file-saver";
import xlsUtils from "./exportAsXls.js";

const exportJson = data => {
  // Convert export data to string
  const dataString = JSON.stringify(data);

  // Create binary object from data string
  const exportBlob = new Blob([dataString], {
    type: "application/json;charset=utf-8"
  });

  // Trigger save as prompt
  fs.saveAs(exportBlob, "GeriLife-export.json");
};

const exportXls = data => {
  const xlsData = xlsUtils.convertToXls(data);
  const exportBlob = new Blob([xlsData], {
    type: "application/octet-stream"
  });
  fs.saveAs(exportBlob, "GeriLife-export.xlsx");
};

export const exportData = async type => {
  try {
    const response = await $axios.post("/methods/exportAllData");

    if (type === "JSON") {
      exportJson(response.data);
    } else {
      exportXls(response.data);
    }
    return true;
  } catch (error) {
    errorNotifier(error);
  }
  return false;
};

export const JSONFileImport = async data => {
  try {
    const response = await $axios.post("/methods/JSONFileImportApi", {
      fileData: data
    });

    const importSummary = response.data;
    if ("error" in importSummary) {
      errorNotifier({
        response: { data: new Error(importSummary.error.message) }
      });
      return null;
    }
    return importSummary;
  } catch (error) {
    errorNotifier(error);
  }
  return null;
};
