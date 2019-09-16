<script>
import { ArrowSmall } from "../images";

import { renderTime } from "../renderers";

export default {
  components: { ArrowSmall },
  props: {
    flights: { type: Array, required: true },
    selectedFareSellKey: { type: String }
  },
  computed: {
    transformedFlights() {
      return this.flights.map(({ departure, arrival, fares }) => {
        const basicFare = fares.find(({ bundle }) => bundle === "basic");
        const standardFare = fares.find(({ bundle }) => bundle === "standard");
        const premiumFare = fares.find(({ bundle }) => bundle === "plus");

        return {
          departureTimeString: renderTime(departure),
          arrivalTimeString: renderTime(arrival),
          basicPrice: basicFare.price,
          basicFareSellKey: basicFare.fareSellKey,
          standardPrice: standardFare.price,
          standardFareSellKey: standardFare.fareSellKey,
          premiumPrice: premiumFare.price,
          premiumFareSellKey: premiumFare.fareSellKey
        };
      });
    }
  },
  methods: {
    handleTicketClick(fareSellKey) {
      this.$emit("select-ticket", fareSellKey);
    }
  }
};
</script>

<template>
  <div>
    <template v-for="(flight, index) in transformedFlights">
      <div
        :key="flight.flightNumber"
        :class="{
          'flight-ticket-selector__row': true,
          'flight-ticket-selector__row--first': index === 0
        }"
      >
        <div class="flight-ticket-selector__time">
          {{ flight.departureTimeString }}
          <arrow-small class="flight-ticket-selector__arrow" />
          {{ flight.arrivalTimeString }}
        </div>
        <div class="flight-ticket-selector__button-wrapper">
          <div class="flight-ticket-selector__label">Basic</div>
          <button
            :class="{
              'flight-ticket-selector__button': true,
              'flight-ticket-selector__button--selected':
                flight.basicFareSellKey === selectedFareSellKey
            }"
            @click="handleTicketClick(flight.basicFareSellKey)"
          >
            ${{ flight.basicPrice }}
          </button>
        </div>
        <div
          class="flight-ticket-selector__button-wrapper flight-ticket-selector__button-wrapper--gray-background"
        >
          <div class="flight-ticket-selector__label">Standard</div>
          <button
            :class="{
              'flight-ticket-selector__button': true,
              'flight-ticket-selector__button--selected':
                flight.standardFareSellKey === selectedFareSellKey
            }"
            @click="handleTicketClick(flight.standardFareSellKey)"
          >
            ${{ flight.standardPrice }}
          </button>
        </div>
        <div class="flight-ticket-selector__button-wrapper">
          <div class="flight-ticket-selector__label">Plus</div>
          <button
            :class="{
              'flight-ticket-selector__button': true,
              'flight-ticket-selector__button--selected':
                flight.premiumFareSellKey === selectedFareSellKey
            }"
            @click="handleTicketClick(flight.premiumFareSellKey)"
          >
            ${{ flight.premiumPrice }}
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
@import "~/view/variables.scss";

.flight-ticket-selector__row {
  border-top: 1px solid $border-gray;

  display: flex;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }

  padding: 0 5px;

  @media (min-width: 768px) {
    padding: 0;
  }
}

.flight-ticket-selector__time {
  flex-basis: 100%;

  font-family: Roboto;
  font-weight: 300;
  text-transform: uppercase;
  color: $black;

  font-size: 18px;
  line-height: 21px;

  @media (min-width: 768px) {
    font-size: 15px;
    line-height: 18px;
  }

  padding: 15px 15px 5px 15px;

  @media (min-width: 768px) {
    padding: 15px;
  }

  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
}

.flight-ticket-selector__arrow {
  margin: auto 8px;
}

.flight-ticket-selector__button-wrapper {
  flex-basis: 33.33333%;

  position: relative;
}

.flight-ticket-selector__button-wrapper--gray-background {
  @media (min-width: 768px) {
    background-color: $background-gray;
  }
}

.flight-ticket-selector__label {
  position: absolute;
  top: 6px;
  left: 0;
  width: 100%;

  font-family: Roboto;
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  text-transform: uppercase;
  color: $black-2;

  text-align: center;
}

@media (min-width: 768px) {
  .flight-ticket-selector__label {
    display: none;
  }

  .flight-ticket-selector__row--first .flight-ticket-selector__label {
    display: block;
  }
}

.flight-ticket-selector__button {
  margin: 24px 5px 20px 5px;
  width: calc(100% - 10px);
  height: 50px;

  @media (min-width: 768px) {
    margin: 24px 18px;
    width: 160px;
  }

  font-family: Roboto;
  font-weight: bold;
  text-transform: uppercase;

  font-size: 16px;
  line-height: 19px;

  @media (min-width: 768px) {
    font-size: 20px;
    line-height: 23px;
  }

  border: 2px solid $secondary;
  border-radius: 2px;
  outline: 0;

  background-color: $white;
  color: $black-2;

  cursor: pointer;
}

.flight-ticket-selector__button::-moz-focus-inner {
  border: 0;
}

.flight-ticket-selector__button--selected {
  background-color: $secondary;
  color: $white;
}
</style>
