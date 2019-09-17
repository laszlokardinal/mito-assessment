import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import VuexPersistence from "vuex-persist";

import { homeRoute } from "./routes";
import { apiService, stationsService } from "./services";

import { HOME__SET_FIELDS } from "~/mutations.js";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    homeRoute: {
      departureIata: state.homeRoute.departureIata,
      destinationIata: state.homeRoute.destinationIata
    }
  }),
  filter: mutation => mutation.type === HOME__SET_FIELDS
});

const createStore = () => {
  const plugins = [vuexLocal.plugin];

  if (process.env.NODE_ENV === "development") {
    plugins.push(createLogger());
  }

  return new Vuex.Store({
    modules: {
      homeRoute,
      apiService,
      stationsService
    },
    plugins
  });
};

export default createStore;
