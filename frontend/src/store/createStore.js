import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import { apiService } from "./services";

const createStore = () => {
  const plugins = [];

  if (process.env.NODE_ENV === "development") {
    plugins.push(createLogger());
  }

  return new Vuex.Store({
    modules: {
      apiService
    },
    plugins
  });
};

export default createStore;
