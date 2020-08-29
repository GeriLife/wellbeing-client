import Vue from "vue";
import axios from "axios";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export const $axios = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  }
});

Vue.prototype.$axios = $axios;
