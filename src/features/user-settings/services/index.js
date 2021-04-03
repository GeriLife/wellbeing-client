import { $axios } from "src/boot/axios";
import { errorNotifier, successNotifier } from "src/utils/notifier.js";
import { i18n } from "src/boot/i18n";

export const getUserList = async () => {
  try {
    const { data } = await $axios.post("/methods/getUserListApi");
    return data.map(r => ({
      ...r,
      Email: r.emails[0].address,
      isActive: r.isActive ? "Yes" : "No"
    }));
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const getSingleUserGroupIdsApi = async (userId, allGroups = []) => {
  try {
    const { data } = await $axios.post("/methods/getSingleUserGroupIdsApi", {
      userId
    });
    return data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const addSingleUserPermissionsApi = async (userId, groupIds) => {
  try {
    await $axios.post("/methods/addSingleUserPermissionsApi", {
      userId,
      groupIds
    });
    successNotifier(i18n.t("userAssignGroup-successful"));

    return true;
  } catch (error) {
    errorNotifier(error);
    return false;
  }
};

export const deleteUser = async user => {
  try {
    await $axios.post("/methods/deleteUser", user);
    successNotifier(i18n.t("user-remove-successful"));

    return true;
  } catch (error) {
    errorNotifier(error);
    return false;
  }
};

export const editUserFormSubmit = async user => {
  try {
    await $axios.post("/methods/editUserFormSubmit", user);

    return user._id;
  } catch (error) {
    errorNotifier(error);
    return null;
  }
};

export const addUser = async user => {
  try {
    const { data } = await $axios.post("/methods/addUser", user);

    return data;
  } catch (error) {
    errorNotifier(error);
    return null;
  }
};

export const updateAdministratorRights = async (user, userId) => {
  try {
    await $axios.post(
      `/methods/${
        user.isAdmin ? "addUserToAdminRoleApi" : "removeUserFromAdminRoleApi"
      }`,
      { userId }
    );
    return true;
  } catch (e) {
    errorNotifier(error);
    return false;
  }
};

export const addUsersAndSendEnrollmentEmails = async doc => {
  try {
    await $axios.post("/methods/addUsersAndSendEnrollmentEmails", doc);
    successNotifier(i18n.t("enroll-user-successful"));

    return true;
  } catch (error) {
    errorNotifier(error);
    return false;
  }
};
