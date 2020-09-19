import { $axios } from "src/boot/axios";
import { Notify } from "quasar";
import { errorNotifier } from "src/utils/notifier.js";
import { i18n } from "src/boot/i18n";

export const getUserGroups = async () => {
  try {
    const { data } = await $axios.post("/methods/currentUserGroups");
    return data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const getHomesWithActivityLevel = async groupId => {
  try {
    const { data } = await $axios.post("/methods/getHomesWithActivityLevel", {
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
    await $axios.post("/methods/addOrUpdateAGroup", payload);

    Notify.create({
      position: "top-right",
      type: "positive",
      message: i18n.t(
        `groupModal-${groupDetails._id ? "update" : "create"}-successful`
      )
    });
    return true;
  } catch (error) {
    errorNotifier(error);
    return false;
  }
};
