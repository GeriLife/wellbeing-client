import { $axios } from "src/boot/axios";
import { getCookie } from "./cookies";

export const getResidentsList = async () => {
  try {
    const { data } = await $axios.post(
      `/methods/userVisibleResidentNamesGroupedtByHomes?_t=${new Date().getTime()}`,
      {},
      {
        headers: { Authorization: "Bearer " + getCookie("token") }
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
