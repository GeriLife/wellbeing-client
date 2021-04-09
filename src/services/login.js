import { errorNotifier, successNotifier } from "src/utils/notifier.js";
import { $axios } from "src/boot/axios";
import { i18n } from "src/boot/i18n";

import axiosSub from "axios";
import { getCookie } from "src/services/cookies";

export const loginToServer = async (email, password) => {
  try {
    const { data: cookieData } = await $axios.post("/api/users/login", {
      email,
      password
    });

    console.log(cookieData);
    document.cookie = `token=${cookieData.token}; expires=${cookieData.tokenExpires}`;
    return true;
  } catch (error) {
    errorNotifier(error);
    return false;
  }
};

export const logout = async () => {
  try {
    const { data: result } = await $axios.post("/api/methods/userLogout", {});
    if (result) {
      document.cookie = `token=;`;
      return true;
    }
  } catch (error) {
    errorNotifier(error);
  }
  return false;
};

export const sendResetEmail = async email => {
  try {
    const { data: result } = await $axios.post("/api/methods/sendResetEmail", {
      toEmail: email
    });
    if (result) {
      successNotifier(i18n.t("email-send-successful"));
    }
    return result;
  } catch (error) {
    errorNotifier(error);
  }
  return false;
};

export const checkIfLoggedIn = async () => {
  const axiosInstance = axiosSub.create();

  let result;
  try {
    const { data } = await axiosInstance.post(
      "/api/methods/checkIfLoggedIn?_t=" + new Date().getTime(),
      {},
      {
        headers: { Authorization: "Bearer " + getCookie("token") }
      }
    );
    result = data;
  } catch (error) {
    errorNotifier(error);
    result = false;
  }
  if (!result) {
    document.cookie = `token=;`;
  }
  return result;
};
