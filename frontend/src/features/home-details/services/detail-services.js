import { $axios } from "src/boot/axios";
import { errorNotifier } from "src/utils/notifier.js";

export const getHomeCurrentAndActiveResidents = async homeId => {
  try {
    const response = await $axios.post(
      "/methods/getHomeCurrentAndActiveResidentsApi",
      {
        homeId
      }
    );
    return response.data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const getSelectedResidentsRecentActiveDaysAndCount = async residentIds => {
  try {
    const response = await $axios.post(
      "/methods/getSelectedResidentsRecentActiveDaysAndCount",
      {
        residentIds
      }
    );
    return response.data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const getHomeActivityCountTrendApi = async homeId => {
  try {
    const response = await $axios.post(
      "/methods/getHomeActivityCountTrendApi",
      {
        homeId
      }
    );
    return response.data;
  } catch (error) {
    errorNotifier(error);
    return {};
  }
};

export const getHomeResidentsActivitySumsByType = async (homeId, period) => {
  try {
    const response = await $axios.post(
      "/methods/getHomeResidentsActivitySumsByType",
      {
        homeId,
        period
      }
    );
    return response.data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const getHomeActivityTypeMetrics = async (homeId, period) => {
  try {
    const response = await $axios.post("/methods/getHomeActivityTypeMetrics", {
      homeId,
      period
    });
    return response.data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const getHomeActivitiesFacilitatorRoleMetrics = async (
  homeId,
  period
) => {
  try {
    const response = await $axios.post(
      "/methods/getHomeActivitiesFacilitatorRoleMetrics",
      {
        homeId,
        period
      }
    );
    return response.data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const getHomeActivities = async homeId => {
  try {
    const response = await $axios.post("/methods/getHomeActivitiesAPI", {
      homeId
    });
    return response.data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};
