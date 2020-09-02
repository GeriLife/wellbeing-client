import { $axios } from "src/boot/axios";
import { getCookie } from "./cookies";
import { Notify } from "quasar";
import { i18n } from "src/boot/i18n";
import { errorNotifier } from "src/utils/notifier.js";

export const addFeeling = async data => {
  try {
    await $axios.post(`/methods/addFeeling?_t=${new Date().getTime()}`, data, {
      headers: { Authorization: "Bearer " + getCookie("token") }
    });
    Notify.create({
      type: "positive",
      position: "top-right",
      message: i18n.t("newFeeling-success")
    });
    return true;
  } catch (error) {
    errorNotifier(error);
    return false;
  }
};
