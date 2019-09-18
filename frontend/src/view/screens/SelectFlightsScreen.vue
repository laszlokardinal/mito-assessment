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
  SELECT_FLIGHT__SET_SELECTED_OUTBOUND_TICKET,
  SELECT_FLIGHT__SET_SELECTED_INBOUND_TICKET,
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
      const { selectedOutboundTicket, today } = this;

      const minimumDate = selectedOutboundTicket
        ? selectedOutboundTicket.departureTime
        : today;

      const date = new Date(minimumDate);
      date.setDate(date.getDate() + 1);

      return date.toISOString().slice(0, 10);
    },
    ...mapGetters({
      loading: "selectFlightLoading",
      departureDate: "selectFlightDepartureDate",
      arrivalDate: "selectFlightArrivalDate",
      outboundTickets: "selectFlightOutboundTickets",
      inboundTickets: "selectFlightInboundTickets",
      selectedOutboundTicket: "selectFlightSelectedOutboundTicket",
      selectedInboundTicket: "selectFlightSelectedInboundTicket",
      selectedTickets: "selectFlightSelectedTickets",
      departureStationName: "selectFlightDepartureStationName",
      destinationStationName: "selectFlightDestinationStationName",
      showCheckoutModal: "selectFlightShowCheckoutModal"
    })
  },
  methods: {
    ...mapActions({
      handleDepartureDateChange: SELECT_FLIGHT__SET_DEPARTURE_DATE,
      handleArrivalDateChange: SELECT_FLIGHT__SET_ARRIVAL_DATE,
      handleOutboundTicketChange: SELECT_FLIGHT__SET_SELECTED_OUTBOUND_TICKET,
      handleInboundTicketChange: SELECT_FLIGHT__SET_SELECTED_INBOUND_TICKET,
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
        :flights="selectedTickets"
        @submit="handleSubmit"
      />
      <flight-selector-card
        slot="cards"
        :departure-station="departureStationName"
        :destination-station="destinationStationName"
        :flights="outboundTickets"
        :selected-fare-sell-key="
          selectedOutboundTicket ? selectedOutboundTicket.fareSellKey : null
        "
        :departure-date="departureDate"
        :minimum-departure-date="today"
        @date-change="handleDepartureDateChange"
        @ticket-change="handleOutboundTicketChange"
      />
      <flight-selector-card
        slot="cards"
        inbound
        :departure-station="destinationStationName"
        :destination-station="departureStationName"
        :flights="inboundTickets"
        :selected-fare-sell-key="
          selectedInboundTicket ? selectedInboundTicket.fareSellKey : null
        "
        :departure-date="arrivalDate"
        :minimum-departure-date="arrivalMinimumDate"
        @date-change="handleArrivalDateChange"
        @ticket-change="handleInboundTicketChange"
      />
    </select-flight-layout>
    <checkout-modal
      v-if="showCheckoutModal"
      :flights="selectedTickets"
      @close="handleCloseModal"
    />
  </fragment>
</template>

<style></style>
