import { API__GET, STATIONS__LOAD } from "~/actions";

import {
  STATIONS__LOAD_START,
  STATIONS__LOAD_SUCCESS,
  STATIONS__LOAD_FAILURE
} from "~/mutations";

const stationsService = {
  state: {
    stations: [],
    errors: {},
    loading: false
  },
  mutations: {
    [STATIONS__LOAD_START](state) {
      state.loading = true;
      state.errors = {};
      state.stations = [];
    },
    [STATIONS__LOAD_SUCCESS](state, payload) {
      state.loading = false;
      state.stations = payload.stations;
    },
    [STATIONS__LOAD_FAILURE](state, payload) {
      state.loading = false;
      state.errors = payload.errors;
    }
  },
  actions: {
    async [STATIONS__LOAD]({ state, commit, dispatch }) {
      if (state.stations.length) {
        return;
      }

      try {
        commit(STATIONS__LOAD_START);

        const { data } = await dispatch(API__GET, { path: "/asset/stations" });

        commit(STATIONS__LOAD_SUCCESS, { stations: data });
      } catch (e) {
        commit(STATIONS__LOAD_FAILURE, e);
      }
    }
  },
  getters: {
    stations: state => state.stations,
    stationsLoading: state => state.loading,
    stationsErrors: state => state.errors
  }
};

export default stationsService;
