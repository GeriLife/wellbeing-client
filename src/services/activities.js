import { $axios } from "src/boot/axios";
import { errorNotifier, successNotifier } from "src/utils/notifier.js";
import { i18n } from "src/boot/i18n";

export const getAllActivityTypes = async () => {
  try {
    const { data } = await $axios.post("/methods/getAllActivityTypes", {});
    return data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const saveActivity = async dataToSave => {
  try {
    const id = dataToSave._id;
    let payload = { ...dataToSave };
    delete payload._id;

    if (!!id) {
      payload = {
        _id: id,
        modifier: {
          $set: payload
        }
      };
    }
    await $axios.post("/methods/saveActivity", payload);
    successNotifier(i18n.t("activityForm-add-success"));
    return true;
  } catch (error) {
    errorNotifier(error);
    return false;
  }
};

export const getActivityData = async id => {
  try {
    return await $axios.post("/methods/getActivityById", { id });
  } catch (error) {
    errorNotifier(error);
    return {};
  }
};
