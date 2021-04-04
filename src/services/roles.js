import { $axios } from "src/boot/axios";
import { errorNotifier } from "src/utils/notifier";

export const getRolesExceptAdmin = async () => {
  try {
    const { data } = await $axios.post("/methods/getRolesExceptAdmin");
    return data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};
