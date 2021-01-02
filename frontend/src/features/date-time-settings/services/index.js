import { $axios } from "src/boot/axios";
import { errorNotifier, successNotifier } from "src/utils/notifier.js";
import { i18n } from "src/boot/i18n";

export const getTimezone = async () => {
  try {
    const response = await $axios.post("/methods/getTimezone");
    return response.data.value;
  } catch (error) {
    errorNotifier(error);
    return null;
  }
};

export const saveTimeZone = async tz => {
  try {
    await $axios.post("/methods/createOrEditTimezoneSettingsApi", { selectedTimezone: tz });
    successNotifier(i18n.t("tz-create-successful"));
    return true;
  } catch (e) {
    errorNotifier(e);
    return false;
  }
};
