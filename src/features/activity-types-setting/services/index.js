import { $axios } from "src/boot/axios";
import { errorNotifier, successNotifier } from "src/utils/notifier.js";
import { i18n } from "src/boot/i18n";

export const getAllActivityTypeIdsApi = async () => {
  try {
    const response = await $axios.post("/methods/getAllActivityTypeIdsApi");
    return response.data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const addActivityType = async formData => {
  try {
    await $axios.post("/methods/addActivityType", formData);
    successNotifier(i18n.t("activityType-create-successful"));
    return true;
  } catch (e) {
    errorNotifier(e);
    return false;
  }
};

export const removeActivityType = async formData => {
  try {
    await $axios.post("/methods/removeActivityTypeApi", formData);
    successNotifier(i18n.t("activityType-delete-successful"));
    return true;
  } catch (e) {
    errorNotifier(e);
    return false;
  }
};
