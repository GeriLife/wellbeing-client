import { errorNotifier } from "src/utils/notifier.js";
import { $axios } from "src/boot/axios";
import { Notify } from "quasar";
import { i18n } from "src/boot/i18n";

export const loginToServer = async (email, password) => {
  try {
    const { data: cookieData } = await $axios.post("/users/login", {
      email,
      password
    });
    document.cookie = `token=${cookieData.token}; expires=${cookieData.tokenExpires}`;
    return true;
  } catch (error) {
    errorNotifier(error);
    return false;
  }
};

export const logout = async () => {
  try {
    const { data: result } = await $axios.post("/methods/userLogout", {});
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
    const { data: result } = await $axios.post("/methods/sendResetEmail", {
      toEmail: email
    });
    if (result) {
      Notify.create({
        type: "positive",
        position: "top-right",
        message: i18n.t("email-send-successful")
      });
    }
    return result;
  } catch (error) {
    errorNotifier(error);
  }
  return false;
};
