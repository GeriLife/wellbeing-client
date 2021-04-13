import { $axios } from "src/boot/axios";
import { errorNotifier, successNotifier } from "src/utils/notifier.js";
import { i18n } from "src/boot/i18n";

export const getResidentsWithHomeAndResidentDetailsApi = async includeDeparted => {
  try {
    const { data } = await $axios.post(
      "/api/methods/getResidentsWithHomeAndResidentDetailsApi",
      {
        includeDeparted
      }
    );
    return data ? data.residencies : [];
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const addNewResidentAndResidency = async document => {
  try {
    await $axios.post("/api/methods/addNewResidentAndResidencyApi", {
      document
    });
    successNotifier(i18n.t("residency-create-successful"));
    return true;
  } catch (error) {
    errorNotifier(error);
    return false;
  }
};

export const addNewResidencyWithExistingResident = async document => {
  try {
    await $axios.post("/api/methods/addNewResidencyWithExistingResident", document);
    successNotifier(i18n.t("residency-create-successful"));
    return true;
  } catch (error) {
    errorNotifier(error);
    return false;
  }
};

export const editResidency = async document => {
  try {
    await $axios.post("/api/methods/editResidency", document);
    successNotifier(i18n.t("residency-update-successful"));
    return true;
  } catch (error) {
    errorNotifier(error);
    return false;
  }
};
