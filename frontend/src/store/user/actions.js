import { errorNotifier } from "src/utils/notifier.js";
import { $axios } from "src/boot/axios";

export async function getUserDetails({ commit }) {
  try {
    const { data } = await $axios.post("/methods/getUserDetails");
    commit("setUserDetails", data);
  } catch (error) {
    errorNotifier(error);
  }
}
