<script>
import { mapGetters, mapActions } from "vuex";

import {
  CheckoutModal,
  FlightsCard,
  FlightSelectorCard,
  LoadingIndicator,
  SelectFlightLayout
} from "../components";

import {
  SELECT_FLIGHT__ENTER,
  SELECT_FLIGHT__LEAVE,
  SELECT_FLIGHT__SET_DEPARTURE_DATE,
  SELECT_FLIGHT__SET_ARRIVAL_DATE,
  SELECT_FLIGHT__SET_SELECTED_OUTBOUND_FLIGHT,
  SELECT_FLIGHT__SET_SELECTED_INBOUND_FLIGHT,
  SELECT_FLIGHT__SUBMIT,
  SELECT_FLIGHT__CLOSE_MODAL
} from "~/actions.js";

export default {
  components: {
    CheckoutModal,
    FlightsCard,
    FlightSelectorCard,
    LoadingIndicator,
    SelectFlightLayout
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const payload = {
        departureIata: to.query.from,
        destinationIata: to.query.to,
        departureDate: to.query.departure
      };

      if ("return" in to.query) {
        payload.arrivalDate = to.query["return"];
      }

      vm.$store.dispatch(SELECT_FLIGHT__ENTER, payload);
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch(SELECT_FLIGHT__LEAVE);
    next();
  },
  data() {
    return {
      today: new Date().toISOString().slice(0, 10)
    };
  },
  computed: {
    arrivalMinimumDate() {
      const { selectedOutboundFlight, today } = this;

      const minimumDate = selectedOutboundFlight
        ? selectedOutboundFlight.departureTime
        : today;

      const date = new Date(minimumDate);
      date.setDate(date.getDate() + 1);

      return date.toISOString().slice(0, 10);
    },
    ...mapGetters({
      loading: "selectFlightLoading",
      departureDate: "selectFlightDepartureDate",
      arrivalDate: "selectFlightArrivalDate",
      outboundFlights: "selectFlightOutboundFlights",
      inboundFlights: "selectFlightInboundFlights",
      selectedOutboundFlight: "selectFlightSelectedOutboundFlight",
      selectedInboundFlight: "selectFlightSelectedInboundFlight",
      selectedFlights: "selectFlightSelectedFlights",
      departureStationName: "selectFlightDepartureStationName",
      destinationStationName: "selectFlightDestinationStationName",
      showCheckoutModal: "selectFlightShowCheckoutModal"
    })
  },
  methods: {
    ...mapActions({
      handleDepartureDateChange: SELECT_FLIGHT__SET_DEPARTURE_DATE,
      handleArrivalDateChange: SELECT_FLIGHT__SET_ARRIVAL_DATE,
      handleOutboundFlightChange: SELECT_FLIGHT__SET_SELECTED_OUTBOUND_FLIGHT,
      handleInboundFlightChange: SELECT_FLIGHT__SET_SELECTED_INBOUND_FLIGHT,
      handleSubmit: SELECT_FLIGHT__SUBMIT,
      handleCloseModal: SELECT_FLIGHT__CLOSE_MODAL
    })
  }
};
</script>

<template>
  <fragment>
    <loading-indicator :loading="loading" />
    <select-flight-layout
      :departure-station="departureStationName"
      :destination-station="destinationStationName"
    >
      <flights-card
        slot="flights"
        :flights="selectedFlights"
        @submit="handleSubmit"
      />
      <flight-selector-card
        slot="cards"
        :departure-station="departureStationName"
        :destination-station="destinationStationName"
        :flights="outboundFlights"
        :selected-fare-sell-key="
          selectedOutboundFlight ? selectedOutboundFlight.fareSellKey : null
        "
        :departure-date="departureDate"
        :minimum-departure-date="today"
        @date-change="handleDepartureDateChange"
        @flight-change="handleOutboundFlightChange"
      />
      <flight-selector-card
        slot="cards"
        inbound
        :departure-station="destinationStationName"
        :destination-station="departureStationName"
        :flights="inboundFlights"
        :selected-fare-sell-key="
          selectedInboundFlight ? selectedInboundFlight.fareSellKey : null
        "
        :departure-date="arrivalDate"
        :minimum-departure-date="arrivalMinimumDate"
        @date-change="handleArrivalDateChange"
        @flight-change="handleInboundFlightChange"
      />
    </select-flight-layout>
    <checkout-modal
      v-if="showCheckoutModal"
      :flights="selectedFlights"
      @close="handleCloseModal"
    />
  </fragment>
</template>

<style></style>
