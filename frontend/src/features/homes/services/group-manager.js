import { $axios } from "src/boot/axios";
import { Notify } from "quasar";
import { errorNotifier } from "src/utils/notifier.js";
import { i18n } from "src/boot/i18n";

export const getCurrentManagers = async groupId => {
  try {
    const response = await $axios.post("/methods/getCurrentManagersApi", {
      groupId
    });
    return response.data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const getEligibleManagers = async currentManagers => {
  try {
    const response = await $axios.post("/methods/getEligibleManagerListApi", {
      idsToFilter: currentManagers
    });
    return response.data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const assignManager = async ({ groupId, users }) => {
  try {
    await $axios.post("/methods/assignManager", {
      groupId,
      users
    });
    Notify.create({
      position: "top-right",
      type: "positive",
      message: i18n.t("managerAssign-create-successful")
    });
    return true;
  } catch (error) {
    errorNotifier(error);
    return false;
  }
};

export const revokeManagerPermission = async (groupId, userId) => {
  try {
    const { data: resp } = await $axios.post(
      "/methods/revokeManagerPermission",
      {
        groupId,
        userId
      }
    );
    if (resp === 0) {
      Notify.create({
        position: "top-right",
        type: "negative",
        message: i18n.t("couldNotRevokeAccess")
      });
      return false;
    }
    Notify.create({
      position: "top-right",
      type: "positive",
      message: i18n.t("manager-revoke-success")
    });
    return true;
  } catch (error) {
    errorNotifier(error);
    return false;
  }
};
