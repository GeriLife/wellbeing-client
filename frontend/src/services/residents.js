import { $axios } from "src/boot/axios";
import { getCookie } from "./cookies";
import { Notify } from "quasar";

export const getResidentsList = async () => {
  try {
    const { data } = await $axios.post(
      `/methods/userVisibleResidentNamesGroupedtByHomes?_t=${new Date().getTime()}`,
      {},
      {
        headers: { Authorization: "Bearer " + getCookie("token") }
      }
    );
    return data.flatMap(r =>
      r.options.map(subOpt => ({
        home: r.optgroup,
        label: subOpt.label,
        value: subOpt.value
      }))
    );
  } catch (error) {
    console.log(error);
    Notify.create({
      type: "negative",
      position: "top-right",
      message: error
    });
    return [];
  }
};
