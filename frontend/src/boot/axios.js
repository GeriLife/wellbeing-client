import Vue from "vue";
import axios from "axios";
import { getCookie } from "src/services/cookies";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL
});

axiosInstance.interceptors.request.use(
  config => {
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
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
export const $axios = axiosInstance;

Vue.prototype.$axios = axiosInstance;
