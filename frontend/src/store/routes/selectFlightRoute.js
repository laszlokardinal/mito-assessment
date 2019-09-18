import Vue from "vue";

import {
  API__GET,
  SELECT_FLIGHT__ENTER,
  SELECT_FLIGHT__SET_DEPARTURE_DATE,
  SELECT_FLIGHT__SET_RETURN_DATE,
  SELECT_FLIGHT__SET_SELECTED_OUTBOUND_FLIGHT,
  SELECT_FLIGHT__SET_SELECTED_INBOUND_FLIGHT,
  SELECT_FLIGHT__LEAVE,
  SELECT_FLIGHT__SUBMIT,
  SELECT_FLIGHT__CLOSE_MODAL,
  STATIONS__LOAD
} from "~/actions.js";

import {
  SELECT_FLIGHT__LOAD_OUTBOUND_FLIGHTS_START,
  SELECT_FLIGHT__LOAD_OUTBOUND_FLIGHTS_SUCCESS,
  SELECT_FLIGHT__LOAD_OUTBOUND_FLIGHTS_FAILURE,
  SELECT_FLIGHT__LOAD_INBOUND_FLIGHTS_START,
  SELECT_FLIGHT__LOAD_INBOUND_FLIGHTS_SUCCESS,
  SELECT_FLIGHT__LOAD_INBOUND_FLIGHTS_FAILURE,
  SELECT_FLIGHT__SET_FIELDS,
  SELECT_FLIGHT__RESET
} from "~/mutations";

const selectFlightRoute = {
  state: {
    outboundRequestLoading: false,
    inboundRequestLoading: false,
    outboundFlights: [],
    inboundFlights: [],

    selectedOutboundFlight: null,
    selectedInboundFlight: null,

    departureIata: null,
    destinationIata: null,
    departureDate: null,
    returnDate: null,

    showCheckoutModal: false
  },
  mutations: {
    [SELECT_FLIGHT__LOAD_OUTBOUND_FLIGHTS_START](state) {
      state.outboundRequestLoading = true;
    },

    [SELECT_FLIGHT__LOAD_OUTBOUND_FLIGHTS_SUCCESS](state, payload) {
      state.outboundRequestLoading = false;
      state.outboundFlights = payload.flights;
    },

    [SELECT_FLIGHT__LOAD_OUTBOUND_FLIGHTS_FAILURE](state) {
      state.outboundRequestLoading = false;
    },

    [SELECT_FLIGHT__LOAD_INBOUND_FLIGHTS_START](state) {
      state.inboundRequestLoading = true;
    },

    [SELECT_FLIGHT__LOAD_INBOUND_FLIGHTS_SUCCESS](state, payload) {
      state.inboundRequestLoading = false;
      state.inboundFlights = payload.flights;
    },

    [SELECT_FLIGHT__LOAD_INBOUND_FLIGHTS_FAILURE](state) {
      state.inboundRequestLoading = false;
    },

    [SELECT_FLIGHT__SET_FIELDS](state, patch) {
      Object.entries(patch).forEach(([key, value]) => {
        Vue.set(state, key, value);
      });
    },

    [SELECT_FLIGHT__RESET](state) {
      state.outboundRequestLoading = false;
      state.inboundRequestLoading = false;
      state.outboundFlights = [];
      state.inboundFlights = [];
      state.selectedOutboundFlight = null;
      state.selectedInboundFlight = null;
      state.departureIata = null;
      state.destinationIata = null;
      state.departureDate = null;
      state.returnDate = null;
      state.showCheckoutModal = false;
    }
  },
  actions: {
    [SELECT_FLIGHT__ENTER]({ commit, dispatch }, payload) {
      const {
        departureIata,
        destinationIata,
        departureDate,
        returnDate
      } = payload;

      dispatch(STATIONS__LOAD);

      commit(SELECT_FLIGHT__SET_FIELDS, { departureIata, destinationIata });

      dispatch(SELECT_FLIGHT__SET_DEPARTURE_DATE, departureDate);

      if (returnDate) {
        dispatch(SELECT_FLIGHT__SET_RETURN_DATE, returnDate);
      }
    },

    [SELECT_FLIGHT__LEAVE]({ commit }) {
      commit(SELECT_FLIGHT__RESET);
    },

    async [SELECT_FLIGHT__SET_DEPARTURE_DATE](
      { state, commit, dispatch },
      departureDate
    ) {
      const { departureIata, destinationIata } = state;

      commit(SELECT_FLIGHT__SET_FIELDS, { departureDate });

      try {
        commit(SELECT_FLIGHT__LOAD_OUTBOUND_FLIGHTS_START);

        const { data } = await dispatch(API__GET, {
          path: "/search",
          params: {
            departureStation: departureIata,
            arrivalStation: destinationIata,
            date: departureDate
          }
        });

        commit(SELECT_FLIGHT__LOAD_OUTBOUND_FLIGHTS_SUCCESS, { flights: data });
      } catch (e) {
        commit(SELECT_FLIGHT__LOAD_OUTBOUND_FLIGHTS_FAILURE);
      }
    },

    async [SELECT_FLIGHT__SET_RETURN_DATE](
      { state, commit, dispatch },
      returnDate
    ) {
      const { departureIata, destinationIata } = state;

      commit(SELECT_FLIGHT__SET_FIELDS, { returnDate });

      try {
        commit(SELECT_FLIGHT__LOAD_INBOUND_FLIGHTS_START);

        const { data } = await dispatch(API__GET, {
          path: "/search",
          params: {
            departureStation: destinationIata,
            arrivalStation: departureIata,
            date: returnDate
          }
        });

        commit(SELECT_FLIGHT__LOAD_INBOUND_FLIGHTS_SUCCESS, { flights: data });
      } catch (e) {
        commit(SELECT_FLIGHT__LOAD_INBOUND_FLIGHTS_FAILURE);
      }
    },

    [SELECT_FLIGHT__SET_SELECTED_OUTBOUND_FLIGHT](
      { state, commit, dispatch, getters },
      selectedFareSellKey
    ) {
      const flight = state.outboundFlights.find(({ fares }) =>
        fares.find(({ fareSellKey }) => fareSellKey === selectedFareSellKey)
      );

      const fare = flight.fares.find(
        ({ fareSellKey }) => fareSellKey === selectedFareSellKey
      );

      const selectedOutboundFlight = {
        id: `${flight.flightNumber}-${fare.fareSellKey}`,
        fareSellKey: selectedFareSellKey,
        departureTime: flight.departure,
        arrivalTime: flight.arrival,
        departureStation: getters.selectFlightDepartureStationName,
        destinationStation: getters.selectFlightDestinationStationName,
        price: fare.price
      };

      const patch = { selectedOutboundFlight };

      const outboundDate = new Date(selectedOutboundFlight.departureTime)
        .toISOString()
        .slice(0, 10);

      if (state.selectedInboundFlight) {
        const inboundDate = new Date(state.selectedInboundFlight.departureTime)
          .toISOString()
          .slice(0, 10);

        if (inboundDate <= outboundDate) {
          patch.selectedInboundFlight = null;
        }
      }

      commit(SELECT_FLIGHT__SET_FIELDS, patch);

      if (state.returnDate <= outboundDate) {
        const newReturnDate = new Date(outboundDate);
        newReturnDate.setDate(newReturnDate.getDate() + 1);

        const newReturnDateString = newReturnDate.toISOString().slice(0, 10);

        dispatch(SELECT_FLIGHT__SET_RETURN_DATE, newReturnDateString);
      }
    },

    [SELECT_FLIGHT__SET_SELECTED_INBOUND_FLIGHT](
      { state, commit, getters },
      selectedFareSellKey
    ) {
      const flight = state.inboundFlights.find(({ fares }) =>
        fares.find(({ fareSellKey }) => fareSellKey === selectedFareSellKey)
      );

      const fare = flight.fares.find(
        ({ fareSellKey }) => fareSellKey === selectedFareSellKey
      );

      const selectedInboundFlight = {
        id: `${flight.flightNumber}-${fare.fareSellKey}`,
        fareSellKey: selectedFareSellKey,
        departureTime: flight.departure,
        arrivalTime: flight.arrival,
        departureStation: getters.selectFlightDestinationStationName,
        destinationStation: getters.selectFlightDepartureStationName,
        price: fare.price
      };

      commit(SELECT_FLIGHT__SET_FIELDS, { selectedInboundFlight });
    },

    [SELECT_FLIGHT__SUBMIT]({ commit }) {
      commit(SELECT_FLIGHT__SET_FIELDS, { showCheckoutModal: true });
    },

    [SELECT_FLIGHT__CLOSE_MODAL]({ commit }) {
      commit(SELECT_FLIGHT__SET_FIELDS, { showCheckoutModal: false });
    }
  },
  getters: {
    selectFlightLoading: (state, idx1, idx2, rootGetters) =>
      state.outboundRequestLoading ||
      state.inboundRequestLoading ||
      rootGetters.stationsLoading,

    selectFlightDepartureDate: state => state.departureDate,
    selectFlightReturnDate: state => state.returnDate,

    selectFlightOutboundFlights: state => state.outboundFlights,

    selectFlightInboundFlights: state => state.inboundFlights,

    selectFlightSelectedOutboundFlight: state => state.selectedOutboundFlight,

    selectFlightSelectedInboundFlight: state => state.selectedInboundFlight,

    selectFlightSelectedFlights: state =>
      [state.selectedOutboundFlight, state.selectedInboundFlight].filter(
        truthy => truthy
      ),

    selectFlightDepartureStationName: (state, idx1, idx2, rootGetters) => {
      const station = rootGetters.stations.find(
        ({ iata }) => iata === state.departureIata
      );

      return station ? station.shortName : "";
    },

    selectFlightDestinationStationName: (state, idx1, idx2, rootGetters) => {
      const station = rootGetters.stations.find(
        ({ iata }) => iata === state.destinationIata
      );

      return station ? station.shortName : "";
    },

    selectFlightShowCheckoutModal: state => state.showCheckoutModal
  }
};

export default selectFlightRoute;
