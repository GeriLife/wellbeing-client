import { $axios } from "src/boot/axios";
import { i18n } from "src/boot/i18n";
import { errorNotifier, successNotifier } from "src/utils/notifier.js";

export const addFeeling = async data => {
  try {
    await $axios.post("/api/methods/addFeeling", data);
    successNotifier(i18n.t("newFeeling-success"));
    return true;
  } catch (error) {
    errorNotifier(error);
    return false;
  }
};
