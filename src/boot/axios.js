import Vue from "vue";
import axios from "axios";
import { getCookie } from "src/services/cookies";
import { checkIfLoggedIn } from "src/services/login.js";

const axiosInstance = axios.create();

export default () => {
  axiosInstance.interceptors.request.use(
    async config => {
      if (config.url !== "/users/login") {
        const token = getCookie("token");
        if (token) {
          config.headers["Authorization"] = "Bearer " + token;
        }
      }
      if (!config.params) {
        config.params = {};
      }
      config.params["_t"] = new Date().getTime();

      if (
        config.url === "/users/login" ||
        config.url === "/methods/sendResetEmail" ||
        config.url.startsWith("/resident/")
      ) {
        return config;
      }

      const allowedApiCalls = [
        "/methods/getResidentDetailsApi",
        "/methods/isResidentManagedByCurrentUserApi",
        "/methods/isResidentManagedByCurrentUserApi",
        "/methods/updateResidentInfo",
        "/methods/getFeelingsPercentagesByResidentIdApi",
        "/methods/getResidentAggregatedActivitiesApi",
        "/methods/getCountsByTypeApi",
        "/methods/getResidentActvitiesWithActivityAndFaciltatorNameApi",
        "/methods/getDaywiseActivityDurationApi"
      ];

      if (allowedApiCalls.indexOf(config.url) > -1) {
        return config;
      }

      const result = await checkIfLoggedIn();
      if (!result) {
        window.location.reload();
        window.location.href = "/#/login";
      }
      return config;
    },
    error => {
      Promise.reject(error);
    }
  );
};
export const $axios = axiosInstance;

Vue.prototype.$axios = axiosInstance;
