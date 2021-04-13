import { $axios } from "src/boot/axios";
import { errorNotifier, successNotifier } from "src/utils/notifier.js";
import { i18n } from "src/boot/i18n";

export const getRolesExceptAdmin = async () => {
  try {
    const response = await $axios.post("/api/methods/getRolesExceptAdmin");
    return response.data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const addRole = async formData => {
  try {
    await $axios.post("/api/methods/addRole", formData);
    successNotifier(i18n.t("roles-create-successful"));
    return true;
  } catch (e) {
    errorNotifier(e);
    return false;
  }
};