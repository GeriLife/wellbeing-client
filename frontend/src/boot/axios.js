import Vue from "vue";
import axios from "axios";
import { getCookie } from "src/services/cookies";
import { checkIfLoggedIn } from "src/services/login.js";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL
});

export default ({ urlPath }) => {
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
        config.url.startsWith("/resident/")
      ) {
        return config;
      }

      const allowedApiCalls = [
        "/methods/getResidentDetailsApi",
        "/methods/isResidentManagedByCurrentUserApi"
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
