import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

const createStore = () => {
  const plugins = [];

  if (process.env.NODE_ENV === "development") {
    plugins.push(createLogger());
  }

  return new Vuex.Store({
    modules: {
    },
    plugins
  });
};

export default createStore;
