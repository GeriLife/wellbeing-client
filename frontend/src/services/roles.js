import { $axios } from "src/boot/axios";
import { getCookie } from "./cookies";
import { errorNotifier } from "src/utils/notifier";

export const getRolesExceptAdmin = async () => {
  try {
    const { data } = await $axios.post(
      `/methods/getRolesExceptAdmin?_t=${new Date().getTime()}`,
      {},
      {
        headers: { Authorization: "Bearer " + getCookie("token") }
      }
    );
    return data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};
