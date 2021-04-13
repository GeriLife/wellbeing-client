import { $axios } from "src/boot/axios";
import { errorNotifier } from "src/utils/notifier.js";

export const getUserEventLogs = async () => {
  try {
    const response = await $axios.post("/api/methods/getUserEventLogs");
    return response.data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};