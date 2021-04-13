import Vue from "vue";
import axios from "axios";
import { getCookie } from "src/services/cookies";
import { checkIfLoggedIn } from "src/services/login.js";

const axiosInstance = axios.create();

export default ({ router }) => {
  axiosInstance.interceptors.request.use(
    async config => {
      if (config.url.indexOf("/users/login") === -1) {
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
        config.url.indexOf("/users/login") > -1 ||
        config.url.indexOf("/api/methods/sendResetEmail") > -1
      ) {
        return config;
      }

      const allowedApiCalls = [
        "/api/methods/getResidentDetailsApi",
        "/api/methods/isResidentManagedByCurrentUserApi",
        "/api/methods/isResidentManagedByCurrentUserApi",
        "/api/methods/updateResidentInfo",
        "/api/methods/getFeelingsPercentagesByResidentIdApi",
        "/api/methods/getResidentAggregatedActivitiesApi",
        "/api/methods/getCountsByTypeApi",
        "/api/methods/getResidentActvitiesWithActivityAndFaciltatorNameApi",
        "/api/methods/getDaywiseActivityDurationApi"
      ];

      if (new RegExp(allowedApiCalls.join("|")).test(config.url)) {
        return config;
      }

      const result = await checkIfLoggedIn();
      if (!result) {
        router.push({ path: "/login" });
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
