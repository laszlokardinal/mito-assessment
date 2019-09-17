import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

import { homeRoute } from "./routes";
import { apiService } from "./services";

const createStore = () => {
  const plugins = [];

  if (process.env.NODE_ENV === "development") {
    plugins.push(createLogger());
  }

  return new Vuex.Store({
    modules: {
      homeRoute,
      apiService
    },
    plugins
  });
};

export default createStore;
