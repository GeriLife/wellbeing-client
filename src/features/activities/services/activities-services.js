import { $axios } from "src/boot/axios";
import { errorNotifier, successNotifier } from "src/utils/notifier.js";
import { i18n } from "src/boot/i18n";

export const getActivities = async ({
  currentPage,
  rowsPerPage = 10,
  activityTypeId = null,
  residentId = null,
  sortBy = "activityDate",
  descending = true
}) => {
  try {
    const { data } = await $axios.post(
      "/api/methods/allUserVisibleActivities-paginated",
      {
        currentPage,
        rowsPerPage,
        activityTypeId,
        residentId,
        sortBy,
        descending
      }
    );
    return data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const deleteActivity = async id => {
  try {
    await $axios.post("/api/methods/removeActivity", {
      id
    });
    successNotifier(i18n.t("activityForm-delete-success"));
    return true;
  } catch (error) {
    errorNotifier(error);
    return false;
  }
};
