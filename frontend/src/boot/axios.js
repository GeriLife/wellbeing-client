import Vue from "vue";
import axios from "axios";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

console.log("axios::::::::::", axios.defaults, process.env.BASE_URL);
Vue.prototype.$axios = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',

  }
});
