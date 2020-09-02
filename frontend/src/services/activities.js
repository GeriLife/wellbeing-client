import { $axios } from "src/boot/axios";
import { getCookie } from "./cookies";
import { Notify } from "quasar";
import { errorNotifier } from "src/utils/notifier.js";
import { i18n } from "src/boot/i18n";

export const getAllActivityTypes = async () => {
  try {
    const { data } = await $axios.post(
      `/methods/getAllActivityTypes?_t=${new Date().getTime()}`,
      {},
      {
        headers: { Authorization: "Bearer " + getCookie("token") }
      }
    );
    return data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const saveActivity = async payload => {
  try {
    await $axios.post(
      `/methods/saveActivity?_t=${new Date().getTime()}`,
      payload,
      {
        headers: { Authorization: "Bearer " + getCookie("token") }
      }
    );
    Notify.create({
      position: "top-right",
      type: "positive",
      message: i18n.t("activityForm-add-success")
    });
    return true;
  } catch (error) {
    errorNotifier(error);
    return false;
  }
};
