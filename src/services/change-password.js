import { $axios } from "src/boot/axios";
import { i18n } from "src/boot/i18n";
import { errorNotifier, successNotifier } from "src/utils/notifier.js";

export const changePassword = async obj => {
  try {
    await $axios.post("/methods/changeAccPassword", obj);
    successNotifier(i18n.t("changePassword-success"));
    return true;
  } catch (error) {
    errorNotifier(error);
    return false;
  }
};
