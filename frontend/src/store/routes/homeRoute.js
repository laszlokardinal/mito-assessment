import Vue from "vue";

import {
  HOME__ENTER,
  HOME__LEAVE,
  HOME__SET_DEPARTURE_IATA,
  HOME__SET_DESTINATION_IATA,
  HOME__SET_DEPARTURE_DATE,
  HOME__SET_RETURN_DATE,
  HOME__SUBMIT,
  STATIONS__LOAD
} from "~/actions.js";

import {
  HOME__SET_FIELDS,
  HOME__SET_ERROR,
  HOME__RESET_ERRORS,
  HOME__RESET
} from "~/mutations.js";

const homeRoute = {
  state: {
    errors: {},

    departureIata: null,
    destinationIata: null,
    departureDate: null,
    returnDate: null
  },
  mutations: {
    [HOME__SET_FIELDS](state, patch) {
      Object.entries(patch).forEach(([key, value]) => {
        Vue.set(state, key, value);
      });
    },

    [HOME__SET_ERROR](state, { key, value }) {
      state.errors = { ...state.errors, [key]: value };
    },

    [HOME__RESET_ERRORS](state) {
      state.errors = {};
    },

    [HOME__RESET](state) {
      state.departureIata = null;
      state.destinationIata = null;
      state.departureDate = null;
      state.returnDate = null;
      state.errors = {};
    }
  },
  actions: {
    async [HOME__ENTER]({ dispatch }) {
      dispatch(STATIONS__LOAD);
    },

    [HOME__LEAVE]({ commit }) {
      commit(HOME__RESET);
    },

    [HOME__SET_DEPARTURE_IATA]({ state, commit, rootGetters }, departureIata) {
      const { destinationIata } = state;

      commit(HOME__SET_FIELDS, { departureIata });

      if (destinationIata) {
        const selectedDepartureStation = rootGetters.stations.find(
          ({ iata }) => iata === departureIata
        );

        const connection = selectedDepartureStation.connections.find(
          ({ iata }) => iata === destinationIata
        );

        if (!connection) {
          commit(HOME__SET_FIELDS, { destinationIata: null });
        }
      }
    },

    [HOME__SET_DESTINATION_IATA]({ commit }, destinationIata) {
      commit(HOME__SET_FIELDS, { destinationIata });
    },

    [HOME__SET_DEPARTURE_DATE]({ state, commit }, departureDate) {
      state.departureDate = departureDate;

      if (state.departureDate >= state.returnDate) {
        commit(HOME__SET_FIELDS, { returnDate: null });
      }
    },

    [HOME__SET_RETURN_DATE]({ commit }, returnDate) {
      commit(HOME__SET_FIELDS, { returnDate });
    },

    async [HOME__SUBMIT]({ state, commit }) {
      commit(HOME__RESET_ERRORS);

      const {
        departureIata,
        destinationIata,
        departureDate,
        returnDate
      } = state;

      let erroneous = false;

      if (!departureIata) {
        commit(HOME__SET_ERROR, {
          key: "departureIata",
          value: "Please select origin"
        });

        erroneous = true;
      }

      if (!destinationIata) {
        commit(HOME__SET_ERROR, {
          key: "destinationIata",
          value: "Please select destination"
        });

        erroneous = true;
      }

      if (!departureDate) {
        commit(HOME__SET_ERROR, {
          key: "departureDate",
          value: "Please select departure"
        });

        erroneous = true;
      }

      if (erroneous) {
        return null;
      }

      const query = {
        from: departureIata,
        to: destinationIata,
        departure: departureDate
      };

      if (returnDate) {
        query["return"] = returnDate;
      }

      return { path: "/select-flights", query };
    }
  },
  getters: {
    homeDepartureStations: (state, idx1, idx2, rootGetters) => {
      return rootGetters.stations.map(({ iata, shortName }) => ({
        id: iata,
        title: shortName
      }));
    },

    homeDestinationStations: (state, idx1, idx2, rootGetters) => {
      if (state.departureIata) {
        const selectedDepartureStation = rootGetters.stations.find(
          ({ iata }) => iata === state.departureIata
        );

        if (!selectedDepartureStation) {
          return [];
        }

        return selectedDepartureStation.connections
          .filter(({ iata }) => iata)
          .map(connection => {
            const stationWithMatchingIata = rootGetters.stations.find(
              station => station.iata === connection.iata
            );

            return {
              id: connection.iata,
              title: stationWithMatchingIata
                ? stationWithMatchingIata.shortName
                : ""
            };
          });
      }

      return rootGetters.stations.map(({ iata, shortName }) => ({
        id: iata,
        title: shortName
      }));
    },

    homeDepartureIata: state => state.departureIata,

    homeDestinationIata: state => state.destinationIata,

    homeDepartureDate: state => state.departureDate,

    homeReturnDate: state => state.returnDate,

    homeLoading: (idx1, idx2, idx3, rootGetters) => rootGetters.stationsLoading,

    homeErrors: (state, idx1, idx2, rootGetters) => ({
      ...state.errors,
      ...rootGetters.stationErrors
    })
  }
};

export default homeRoute;
