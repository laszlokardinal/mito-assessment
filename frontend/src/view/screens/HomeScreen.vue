<script>
import { mapGetters, mapActions } from "vuex";

import { SubmitButton } from "../elements";

import {
  DateInputField,
  DropdownInputField,
  HomeCard,
  HomeContainer,
  LoadingIndicator
} from "../components";

import {
  HOME__ENTER,
  HOME__LEAVE,
  HOME__SET_DEPARTURE_IATA,
  HOME__SET_DESTINATION_IATA,
  HOME__SET_DEPARTURE_DATE,
  HOME__SET_RETURN_DATE,
  HOME__SUBMIT
} from "~/actions.js";

export default {
  components: {
    SubmitButton,
    DateInputField,
    DropdownInputField,
    HomeCard,
    HomeContainer,
    LoadingIndicator
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
    returnMinimumDate() {
      const { departureDate, today } = this;

      if (departureDate) {
        const date = new Date(departureDate);
        date.setDate(date.getDate() + 1);

        return date.toISOString().slice(0, 10);
      }

      return today;
    },
    ...mapGetters({
      departureStations: "homeDepartureStations",
      destinationStations: "homeDestinationStations",
      departureIata: "homeDepartureIata",
      destinationIata: "homeDestinationIata",
      departureDate: "homeDepartureDate",
      returnDate: "homeReturnDate",
      loading: "homeLoading",
      errors: "homeErrors"
    })
  },
  methods: {
    ...mapActions({
      handleDepartureIataChange: HOME__SET_DEPARTURE_IATA,
      handleDestinationIataChange: HOME__SET_DESTINATION_IATA,
      handleDepartureDateChange: HOME__SET_DEPARTURE_DATE,
      handleReturnDateChange: HOME__SET_RETURN_DATE
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
  <fragment>
    <loading-indicator :loading="loading" />
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
          :minimum-value="returnMinimumDate"
          :value="returnDate"
          :error="errors.returnDate"
          @change="handleReturnDateChange"
        />
        <submit-button label="Search" @click="handleSubmit" />
      </home-card>
    </home-container>
  </fragment>
</template>

<style></style>
