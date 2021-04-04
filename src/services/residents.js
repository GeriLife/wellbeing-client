import { $axios } from "src/boot/axios";
import { errorNotifier } from "src/utils/notifier.js";

export const getResidentsList = async () => {
  try {
    const { data } = await $axios.post(
      "/api/methods/userVisibleResidentNamesGroupedtByHomes"
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

export const getResidentsWithoutActiveResidencies = async currentResidency => {
  try {
    const { data } = await $axios.post(
      "/api/methods/getResidentsWithoutActiveResidencies",
      {
        currentResidency
      }
    );
    return data.map(r => ({
      label: `${r.firstName}${r.lastInitial ? " " + r.lastInitial : ""}`,
      value: r._id
    }));
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const getResidentDetailsApi = async residentId => {
  try {
    const { data } = await $axios.post("/api/methods/getResidentDetailsApi", {
      residentId
    });
    return data;
  } catch (error) {
    errorNotifier(error);
    return null;
  }
};
