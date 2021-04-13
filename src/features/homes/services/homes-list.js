import { $axios } from "src/boot/axios";
import { errorNotifier, successNotifier } from "src/utils/notifier.js";
import { i18n } from "src/boot/i18n";

export const getUserGroups = async () => {
  try {
    const { data } = await $axios.post("/api/methods/currentUserGroups");
    return data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const getHomesWithActivityLevel = async groupId => {
  try {
    const { data } = await $axios.post("/api/methods/getHomesWithActivityLevel", {
      groupId
    });
    return data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const addOrUpdateAGroup = async groupDetails => {
  try {
    let payload = groupDetails;
    if (groupDetails._id) {
      payload = { _id: groupDetails._id, modifier: { $set: groupDetails } };
      delete payload.modifier._id;
    }
    await $axios.post("/api/methods/addOrUpdateAGroup", payload);

    successNotifier(
      i18n.t(`groupModal-${groupDetails._id ? "update" : "create"}-successful`)
    );
    return true;
  } catch (error) {
    errorNotifier(error);
    return false;
  }
};

export const addOrUpdateHome = async homeDetails => {
  try {
    let payload = homeDetails;
    if (homeDetails._id) {
      payload = { _id: homeDetails._id, modifier: { $set: homeDetails } };
      delete payload.modifier.$set._id;
      delete payload.modifier.$set.groupId;
    }
    await $axios.post("/api/methods/addOrUpdateHome", payload);

    successNotifier(
      i18n.t(`homeModal-${homeDetails._id ? "update" : "create"}-successful`)
    );
    return true;
  } catch (error) {
    errorNotifier(error);
    return false;
  }
};
