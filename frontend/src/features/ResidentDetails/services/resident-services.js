import { $axios } from "src/boot/axios";
import { errorNotifier, successNotifier } from "src/utils/notifier.js";
import { i18n } from "src/boot/i18n";

export const isResidentManagedByCurrentUserApi = async residentId => {
  try {
    const { data } = await $axios.post(
      "/methods/isResidentManagedByCurrentUserApi",
      {
        residentId
      }
    );
    return data;
  } catch (error) {
    errorNotifier(error);
    return false;
  }
};

export const updateResidentInfo = async document => {
  try {
    const _id = document._id;
    const modifier = { $set: { ...document } };
    delete modifier.$set._id;

    await $axios.post("/methods/updateResidentInfo", {
      _id,
      modifier
    });
    successNotifier(i18n.t("resident-update-successful"));
    return true;
  } catch (error) {
    errorNotifier(error);
    return false;
  }
};

export const getFeelingsPercentagesByResidentIdApi = async residentId => {
  try {
    const { data } = await $axios.post(
      "/methods/getFeelingsPercentagesByResidentIdApi",
      {
        residentId
      }
    );
    return data
      .map(datum => {
        // Get feeling
        const feeling = datum.key;

        // Get localization string for feeling
        const feelingL10n = i18n.t(
          `residentFeelings-chart-feelingName-${feeling}`
        );

        // Update feeling with localized name
        datum.localizedFeeling = feelingL10n;

        return datum;
      })
      .sort(
        (a, b) =>
          // Sort from high to low
          b.value - a.value
      );
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const getResidentAggregatedActivitiesApi = async (
  residentId,
  timePeriod
) => {
  try {
    const { data } = await $axios.post(
      "/methods/getResidentAggregatedActivitiesApi",
      {
        residentId,
        timePeriod
      }
    );
    return data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const getCountsByTypeApi = async (residentId, type) => {
  try {
    const { data } = await $axios.post("/methods/getCountsByTypeApi", {
      residentId,
      type
    });
    return data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const getResidentActvitiesWithActivityAndFaciltatorNameApi = async residentId => {
  try {
    const { data } = await $axios.post(
      "/methods/getResidentActvitiesWithActivityAndFaciltatorNameApi",
      {
        residentId
      }
    );
    return data.map(function(activity) {
      // Create temporary object to get Activity values
      return {
        activityType: activity.activityTypeName,
        activityDate: activity.activityDate,
        duration: activity.duration,
        activityId: activity._id
      };
    });
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};

export const getDaywiseActivityDurationApi = async residentId => {
  try {
    const { data } = await $axios.post(
      "/methods/getDaywiseActivityDurationApi",
      {
        residentId
      }
    );
    return data;
  } catch (error) {
    errorNotifier(error);
    return [];
  }
};
