import Vue from "vue";

import {
  API__GET,
  SELECT_FLIGHT__ENTER,
  SELECT_FLIGHT__SET_DEPARTURE_DATE,
  SELECT_FLIGHT__SET_ARRIVAL_DATE,
  SELECT_FLIGHT__SET_SELECTED_OUTBOUND_TICKET,
  SELECT_FLIGHT__SET_SELECTED_INBOUND_TICKET,
  SELECT_FLIGHT__LEAVE,
  SELECT_FLIGHT__SUBMIT,
  STATIONS__LOAD
} from "~/actions.js";

import {
  SELECT_FLIGHT__LOAD_OUTBOUND_TICKETS_START,
  SELECT_FLIGHT__LOAD_OUTBOUND_TICKETS_SUCCESS,
  SELECT_FLIGHT__LOAD_OUTBOUND_TICKETS_FAILURE,
  SELECT_FLIGHT__LOAD_INBOUND_TICKETS_START,
  SELECT_FLIGHT__LOAD_INBOUND_TICKETS_SUCCESS,
  SELECT_FLIGHT__LOAD_INBOUND_TICKETS_FAILURE,
  SELECT_FLIGHT__SET_FIELDS,
  SELECT_FLIGHT__RESET
} from "~/mutations";

const selectFlightRoute = {
  state: {
    outboundRequestLoading: false,
    inboundRequestLoading: false,
    outboundTickets: [],
    inboundTickets: [],

    selectedOutboundTicket: null,
    selectedInboundTicket: null,

    departureIata: null,
    destinationIata: null,
    departureDate: null,
    arrivalDate: null
  },
  mutations: {
    [SELECT_FLIGHT__LOAD_OUTBOUND_TICKETS_START](state) {
      state.outboundRequestLoading = true;
    },

    [SELECT_FLIGHT__LOAD_OUTBOUND_TICKETS_SUCCESS](state, payload) {
      state.outboundRequestLoading = false;
      state.outboundTickets = payload.tickets;
    },

    [SELECT_FLIGHT__LOAD_OUTBOUND_TICKETS_FAILURE](state) {
      state.outboundRequestLoading = false;
    },

    [SELECT_FLIGHT__LOAD_INBOUND_TICKETS_START](state) {
      state.inboundRequestLoading = true;
    },

    [SELECT_FLIGHT__LOAD_INBOUND_TICKETS_SUCCESS](state, payload) {
      state.inboundRequestLoading = false;
      state.inboundTickets = payload.tickets;
    },

    [SELECT_FLIGHT__LOAD_INBOUND_TICKETS_FAILURE](state) {
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
      state.outboundTickets = [];
      state.inboundTickets = [];
      state.selectedOutboundTicket = null;
      state.selectedInboundTicket = null;
      state.departureIata = null;
      state.destinationIata = null;
      state.departureDate = null;
      state.arrivalDate = null;
    }
  },
  actions: {
    [SELECT_FLIGHT__ENTER]({ commit, dispatch }, payload) {
      const {
        departureIata,
        destinationIata,
        departureDate,
        arrivalDate
      } = payload;

      dispatch(STATIONS__LOAD);

      commit(SELECT_FLIGHT__SET_FIELDS, { departureIata, destinationIata });

      dispatch(SELECT_FLIGHT__SET_DEPARTURE_DATE, departureDate);

      if (arrivalDate) {
        dispatch(SELECT_FLIGHT__SET_ARRIVAL_DATE, arrivalDate);
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
        commit(SELECT_FLIGHT__LOAD_OUTBOUND_TICKETS_START);

        const { data } = await dispatch(API__GET, {
          path: "/search",
          params: {
            departureStation: departureIata,
            arrivalStation: destinationIata,
            date: departureDate
          }
        });

        commit(SELECT_FLIGHT__LOAD_OUTBOUND_TICKETS_SUCCESS, { tickets: data });
      } catch (e) {
        commit(SELECT_FLIGHT__LOAD_OUTBOUND_TICKETS_FAILURE);
      }
    },

    async [SELECT_FLIGHT__SET_ARRIVAL_DATE](
      { state, commit, dispatch },
      arrivalDate
    ) {
      const { departureIata, destinationIata } = state;

      commit(SELECT_FLIGHT__SET_FIELDS, { arrivalDate });

      try {
        commit(SELECT_FLIGHT__LOAD_INBOUND_TICKETS_START);

        const { data } = await dispatch(API__GET, {
          path: "/search",
          params: {
            departureStation: destinationIata,
            arrivalStation: departureIata,
            date: arrivalDate
          }
        });

        commit(SELECT_FLIGHT__LOAD_INBOUND_TICKETS_SUCCESS, { tickets: data });
      } catch (e) {
        commit(SELECT_FLIGHT__LOAD_INBOUND_TICKETS_FAILURE);
      }
    },

    [SELECT_FLIGHT__SET_SELECTED_OUTBOUND_TICKET](
      { state, commit, dispatch, getters },
      selectedFareSellKey
    ) {
      const flight = state.outboundTickets.find(({ fares }) =>
        fares.find(({ fareSellKey }) => fareSellKey === selectedFareSellKey)
      );

      const fare = flight.fares.find(
        ({ fareSellKey }) => fareSellKey === selectedFareSellKey
      );

      const selectedOutboundTicket = {
        id: `${flight.flightNumber}-${fare.fareSellKey}`,
        fareSellKey: selectedFareSellKey,
        departureTime: flight.departure,
        arrivalTime: flight.arrival,
        departureStation: getters.selectFlightDepartureStationName,
        destinationStation: getters.selectFlightDestinationStationName,
        price: fare.price
      };

      const patch = { selectedOutboundTicket };

      const outboundDate = new Date(selectedOutboundTicket.departureTime)
        .toISOString()
        .slice(0, 10);

      if (state.selectedInboundTicket) {
        const inboundDate = new Date(state.selectedInboundTicket.departureTime)
          .toISOString()
          .slice(0, 10);

        if (inboundDate < outboundDate) {
          patch.selectedInboundTicket = null;
        }
      }

      commit(SELECT_FLIGHT__SET_FIELDS, patch);

      if (state.arrivalDate <= outboundDate) {
        const newReturnDate = new Date(outboundDate);
        newReturnDate.setDate(newReturnDate.getDate() + 1);

        const newReturnDateString = newReturnDate.toISOString().slice(0, 10);

        dispatch(SELECT_FLIGHT__SET_ARRIVAL_DATE, newReturnDateString);
      }
    },

    [SELECT_FLIGHT__SET_SELECTED_INBOUND_TICKET](
      { state, commit, getters },
      selectedFareSellKey
    ) {
      const flight = state.inboundTickets.find(({ fares }) =>
        fares.find(({ fareSellKey }) => fareSellKey === selectedFareSellKey)
      );

      const fare = flight.fares.find(
        ({ fareSellKey }) => fareSellKey === selectedFareSellKey
      );

      const selectedInboundTicket = {
        id: `${flight.flightNumber}-${fare.fareSellKey}`,
        fareSellKey: selectedFareSellKey,
        departureTime: flight.departure,
        arrivalTime: flight.arrival,
        departureStation: getters.selectFlightDestinationStationName,
        destinationStation: getters.selectFlightDepartureStationName,
        price: fare.price
      };

      commit(SELECT_FLIGHT__SET_FIELDS, { selectedInboundTicket });
    },

    [SELECT_FLIGHT__SUBMIT]() {}
  },
  getters: {
    selectFlightLoading: (state, idx1, idx2, rootGetters) =>
      state.outboundRequestLoading ||
      state.inboundRequestLoading ||
      rootGetters.stationsLoading,

    selectFlightDepartureDate: state => state.departureDate,
    selectFlightArrivalDate: state => state.arrivalDate,

    selectFlightOutboundTickets: state => state.outboundTickets,

    selectFlightInboundTickets: state => state.inboundTickets,

    selectFlightSelectedOutboundTicket: state => state.selectedOutboundTicket,

    selectFlightSelectedInboundTicket: state => state.selectedInboundTicket,

    selectFlightSelectedTickets: state =>
      [state.selectedOutboundTicket, state.selectedInboundTicket].filter(
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
    }
  }
};

export default selectFlightRoute;
