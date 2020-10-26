import { $axios } from "src/boot/axios";
import { errorNotifier } from "src/utils/notifier.js";

export const getHomeDetailsApi = async homeId => {
  try {
    const response = await $axios.post("/methods/getHomeDetailsApi", {
      homeId
    });
    return response.data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};
