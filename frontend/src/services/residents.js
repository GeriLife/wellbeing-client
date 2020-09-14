import { $axios } from "src/boot/axios";
import { errorNotifier } from "src/utils/notifier.js";

export const getResidentsList = async () => {
  try {
    const { data } = await $axios.post(
      "/methods/userVisibleResidentNamesGroupedtByHomes"
    );
    return data.flatMap(r =>
      r.options.map(subOpt => ({
        home: r.optgroup,
        label: subOpt.label,
        value: subOpt.value
      }))
    );
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};
