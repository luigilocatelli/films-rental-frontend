import { boot } from "quasar/wrappers";
import axios from "axios";
import { getCookieWithName } from "src/utils/CookieUtils";
/*
A common use case for Quasar applications is to run code
before the root Vue app instance is instantiated,
like injecting and initializing your own dependencies (examples: Vue components, libraries…)
or simply configuring some startup code of your app.
*/

export const api = axios.create({ baseURL: "http://localhost:8080/api" });
api.defaults.timeout = 2000;
// create axios interceptor for the baseUrl ..8080/api
api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log("axios: " + config.url);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);


