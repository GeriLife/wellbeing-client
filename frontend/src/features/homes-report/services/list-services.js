import { $axios } from "src/boot/axios";
import { errorNotifier } from "src/utils/notifier.js";

export const getMonthlyAggregatedHomeResidentActivities = async (
  homeId,
  timePeriod
) => {
  try {
    const response = await $axios.post(
      "/methods/getMonthlyAggregatedHomeResidentActivitiesApi",
      {
        homeId,
        timePeriod
      }
    );
    return response.data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};
