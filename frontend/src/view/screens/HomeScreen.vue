<script>
import { mapGetters, mapMutations } from "vuex";

import { SubmitButton } from "../elements";

import {
  DateInputField,
  DropdownInputField,
  HomeCard,
  HomeContainer
} from "../components";

import { HOME__ENTER, HOME__LEAVE, HOME__SUBMIT } from "~/actions.js";
import {
  HOME__SET_DEPARTURE_IATA,
  HOME__SET_DESTINATION_IATA,
  HOME__SET_DEPARTURE_DATE,
  HOME__SET_ARRIVAL_DATE
} from "~/mutations";

export default {
  components: {
    SubmitButton,
    DateInputField,
    DropdownInputField,
    HomeCard,
    HomeContainer
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch(HOME__ENTER);
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch(HOME__LEAVE);
    next();
  },
  data() {
    return {
      today: new Date().toISOString().slice(0, 10)
    };
  },
  computed: {
    arrivalMinimumDate() {
      const { departureDate, today } = this;

      if (departureDate) {
        const date = new Date(departureDate);
        date.setDate(date.getDate() + 1);

        return date.toISOString().slice(0, 10);
      }

      return today;
    },
    ...mapGetters([
      "departureStations",
      "destinationStations",
      "departureIata",
      "destinationIata",
      "departureDate",
      "arrivalDate",
      "errors"
    ])
  },
  methods: {
    ...mapMutations({
      handleDepartureIataChange: HOME__SET_DEPARTURE_IATA,
      handleDestinationIataChange: HOME__SET_DESTINATION_IATA,
      handleDepartureDateChange: HOME__SET_DEPARTURE_DATE,
      handleArrivalDateChange: HOME__SET_ARRIVAL_DATE
    }),
    async handleSubmit() {
      const route = await this.$store.dispatch(HOME__SUBMIT);

      if (route) {
        this.$router.push(route);
      }
    }
  }
};
</script>

<template>
  <home-container>
    <home-card>
      <dropdown-input-field
        label="Origin"
        :options="departureStations"
        :value="departureIata"
        :error="errors.departureIata"
        @change="handleDepartureIataChange"
      />
      <dropdown-input-field
        label="Destination"
        :options="destinationStations"
        :value="destinationIata"
        :error="errors.destinationIata"
        @change="handleDestinationIataChange"
      />
      <date-input-field
        label="Departure"
        :minimum-value="today"
        :value="departureDate"
        :error="errors.departureDate"
        @change="handleDepartureDateChange"
      />
      <date-input-field
        label="Return"
        :minimum-value="arrivalMinimumDate"
        :value="arrivalDate"
        :error="errors.arrivalDate"
        @change="handleArrivalDateChange"
      />
      <submit-button label="Search" @click="handleSubmit" />
    </home-card>
  </home-container>
</template>

<style></style>
