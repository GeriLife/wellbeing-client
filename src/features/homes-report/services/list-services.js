import { $axios } from "src/boot/axios";
import { errorNotifier } from "src/utils/notifier.js";

export const getMonthlyAggregatedHomeResidentActivities = async (
  homeId,
  timePeriod
) => {
  try {
    const response = await $axios.post(
      "/api/methods/getMonthlyAggregatedHomeResidentActivitiesApi",
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

export const getMonthlyAggregatedActivitiesByRoles = async (
  homeId,
  timePeriod
) => {
  try {
    const response = await $axios.post(
      "/api/methods/getMonthlyAggregatedActivitiesByRoles",
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