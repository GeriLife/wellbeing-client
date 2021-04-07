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
    return {};
  }
};

export const getHomeSelectOptionsWithGroups = async () => {
  try {
    const { data } = await $axios.post(
      "/methods/getHomeSelectOptionsWithGroups"
    );
    return (data || []).flatMap(r =>
      r.options.map(subOpt => ({
        group: r.optgroup,
        label: subOpt.label,
        value: subOpt.value
      }))
    );
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};
