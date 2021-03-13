import Vue from "vue";
import axios from "axios";
import { getCookie } from "src/services/cookies";
import { checkIfLoggedIn } from "src/services/login.js";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL
});
const _appendSubdomain = (domain, subdomain) => {
  const ip = domain.split("://")[1]
    ? domain.split("://")[1].split(":")
      ? domain.split("://")[1].split(":")[0]
      : null
    : null;

  //skip adding sub-domain to ip
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ip
    )
  ) {
    return domain;
  }
  if (domain.indexOf("localhost") > -1) {
    return domain;
  }
  if (
    domain.startsWith(`http://${subdomain}.`) ||
    domain.startsWith(`https://${subdomain}.`)
  ) {
    return domain;
  }
  const domsArray = domain.split(/^(https?|http):\/\//);
  const dom = domsArray[domsArray.length - 1];
  const protocol = domsArray[domsArray.length - 2];
  return `${protocol}://${subdomain}.${dom}`;
};

export const appendSubdomain = _appendSubdomain;

export const updateBaseUrl = subdomain => {
  axiosInstance.defaults.baseURL = _appendSubdomain(
    process.env.BASE_URL,
    subdomain
  );
};

export default () => {
  axiosInstance.interceptors.request.use(
    async config => {
      const subdomain = getCookie("subdomain");
      if (subdomain) {
        config.baseURL = axiosInstance.defaults.baseURL = _appendSubdomain(
          process.env.BASE_URL,
          getCookie("subdomain")
        );
      }

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
