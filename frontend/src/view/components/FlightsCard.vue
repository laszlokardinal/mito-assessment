<script>
import { FlightsItem, FlightsSeparator, SubmitButton } from "../elements";

export default {
  components: { FlightsItem, FlightsSeparator, SubmitButton },
  props: {
    flights: { type: Array, required: true }
  },
  computed: {
    total() {
      return this.flights.reduce((sum, { price }) => sum + price, 0);
    }
  },
  methods: {
    handleClick() {
      this.$emit("submit");
    }
  }
};
</script>

<template>
  <div class="flights-card__wrapper">
    <div class="flights-card__header">
      <span>Flights</span>
      <span>${{ total }}</span>
    </div>
    <div v-if="flights.length > 0">
      <template v-for="(flight, index) in flights">
        <flights-separator v-if="index > 0" :key="flight.id + '-separator'" />
        <flights-item
          :key="flight.id"
          :departure-station="flight.departureStation"
          :departure-time="flight.departureTime"
          :destination-station="flight.destinationStation"
          :arrival-time="flight.arrivalTime"
        />
      </template>
    </div>
    <div v-else class="flights-card__placeholder">
      Choose an outbound flight
    </div>
    <div class="flights-card__total">
      <span>Total</span>
      <span>${{ total }}</span>
    </div>
    <div class="flights-card__button">
      <submit-button
        label="Pay now"
        secondary
        full-width
        :disabled="flights.length == 0"
        @click="handleClick"
      />
    </div>
  </div>
</template>

<style lang="scss">
@import "~/view/variables.scss";

.flights-card__header {
  padding: 15px;

  display: flex;
  justify-content: space-between;

  font-family: Roboto;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;

  background-color: $white;
}

.flights-card__items {
  background-color: $white;

  margin-top: -12px;
}

.flights-card__placeholder {
  background-color: $white;

  padding: 3px 70px 20px 15px;

  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: $gray;
}

.flights-card__total {
  padding: 15px;

  display: flex;
  justify-content: space-between;

  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: $white;

  background-color: $primary;
}

.flights-card__button {
  margin-top: 20px;
}
</style>
