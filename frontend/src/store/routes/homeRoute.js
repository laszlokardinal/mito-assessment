import { API__GET, HOME__ENTER, HOME__SUBMIT, HOME__LEAVE } from "~/actions.js";

import {
  HOME__LOAD,
  HOME__LOAD_SUCCESS,
  HOME__LOAD_FAILURE,
  HOME__RESET,
  HOME__SET_ERROR,
  HOME__RESET_ERRORS,
  HOME__SET_DEPARTURE_IATA,
  HOME__SET_DESTINATION_IATA,
  HOME__SET_DEPARTURE_DATE,
  HOME__SET_ARRIVAL_DATE
} from "~/mutations.js";

const homeRoute = {
  state: {
    stations: [],
    errors: {},
    loading: false,

    departureIata: null,
    destinationIata: null,
    departureDate: null,
    arrivalDate: null
  },
  mutations: {
    [HOME__LOAD](state) {
      state.loading = true;
      state.errors = {};
      state.stations = [];
    },

    [HOME__LOAD_SUCCESS](state, payload) {
      state.loading = false;
      state.stations = payload.stations;
    },

    [HOME__LOAD_FAILURE](state, payload) {
      state.loading = false;
      state.errors = payload.errors;
    },

    [HOME__RESET](state) {
      state.loading = false;
      state.errors = {};
      state.stations = [];
    },

    [HOME__SET_ERROR](state, { key, value }) {
      state.errors = { ...state.errors, [key]: value };
    },

    [HOME__RESET_ERRORS](state) {
      state.errors = {};
    },

    [HOME__SET_DEPARTURE_IATA](state, departureIata) {
      const { stations, destinationIata } = state;

      state.departureIata = departureIata;

      if (destinationIata) {
        const selectedDepartureStation = stations.find(
          ({ iata }) => iata === departureIata
        );

        const connection = selectedDepartureStation.connections.find(
          ({ iata }) => iata === destinationIata
        );

        if (!connection) {
          state.destinationIata = null;
        }
      }
    },

    [HOME__SET_DESTINATION_IATA](state, destinationIata) {
      state.destinationIata = destinationIata;
    },

    [HOME__SET_DEPARTURE_DATE](state, departureDate) {
      state.departureDate = departureDate;

      if (state.departureDate >= state.arrivalDate) {
        state.arrivalDate = null;
      }
    },

    [HOME__SET_ARRIVAL_DATE](state, arrivalDate) {
      state.arrivalDate = arrivalDate;
    }
  },
  actions: {
    async [HOME__ENTER]({ dispatch, commit }) {
      try {
        commit(HOME__LOAD);

        const { data } = await dispatch(API__GET, { path: "/asset/stations" });

        commit(HOME__LOAD_SUCCESS, { stations: data });
      } catch (e) {
        commit(HOME__LOAD_FAILURE, e);
      }
    },

    async [HOME__SUBMIT]({ state, commit }) {
      commit(HOME__RESET_ERRORS);

      const {
        departureIata,
        destinationIata,
        departureDate,
        arrivalDate
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

      if (arrivalDate) {
        query["return"] = arrivalDate;
      }

      return { path: "/select-flights", query };
    },

    [HOME__LEAVE]({ commit }) {
      commit(HOME__RESET);
    }
  },
  getters: {
    departureStations: state => {
      return state.stations.map(({ iata, shortName }) => ({
        id: iata,
        title: shortName
      }));
    },

    destinationStations: state => {
      if (state.departureIata) {
        const selectedDepartureStation = state.stations.find(
          ({ iata }) => iata === state.departureIata
        );

        if (!selectedDepartureStation) {
          return [];
        }

        return selectedDepartureStation.connections
          .filter(({ iata }) => iata)
          .map(connection => {
            const stationWithMatchingIata = state.stations.find(
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

      return state.stations.map(({ iata, shortName }) => ({
        id: iata,
        title: shortName
      }));
    },

    departureIata: state => state.departureIata,

    destinationIata: state => state.destinationIata,

    departureDate: state => state.departureDate,

    arrivalDate: state => state.arrivalDate,

    errors: state => state.errors
  }
};

export default homeRoute;
