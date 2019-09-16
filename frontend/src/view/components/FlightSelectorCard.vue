<script>
import { FlightDateSelector, FlightTicketSelector } from "../elements";
import { CardArrowRight } from "../images";

export default {
  components: { FlightDateSelector, FlightTicketSelector, CardArrowRight },
  props: {
    departureStation: { type: String, required: true },
    destinationStation: { type: String, required: true },
    flights: { type: Array, required: true },
    selectedFareSellKey: { type: String },
    departureDate: { type: String, required: true },
    outbound: { type: Boolean, default: false }
  },
  methods: {
    handleSelectTicket(fareSellKey) {
      this.$emit("select-ticket", fareSellKey);
    },
    handleDateChange(newDate) {
      this.$emit("date-change", newDate);
    }
  }
};
</script>

<template>
  <div class="flight-selector-card__wrapper">
    <div class="flight-selector-card__header">
      <div class="flight-selector-card__title">
        {{ outbound ? "Inbound" : "Outbound" }}
      </div>
      <div class="flight-selector-card__airports">
        {{ departureStation }}
        <card-arrow-right class="flight-selector-card__arrow" />
        {{ destinationStation }}
      </div>
    </div>
    <div class="flight-selector-card__body">
      <flight-date-selector
        :departure-date="departureDate"
        @date-change="handleDateChange"
      />
      <flight-ticket-selector
        :flights="flights"
        :selected-fare-sell-key="selectedFareSellKey"
        @select-ticket="handleSelectTicket"
        @date-change="handleDateChange"
      />
    </div>
  </div>
</template>

<style lang="scss">
@import "~/view/variables.scss";

.flight-selector-card__wrapper {
  margin-bottom: 40px;

  box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}

.flight-selector-card__wrapper + .flight-selector-card__wrapper {
  margin-top: 40px;
}

.flight-selector-card__header {
  @media (min-width: 768px) {
    height: 60px;
  }

  background-color: $background-gray;

  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
}

.flight-selector-card__title {
  margin: 10px 10px 5px 10px;

  @media (min-width: 768px) {
    margin: 0 0 0 20px;
  }

  font-family: Roboto;
  font-weight: 500;
  text-transform: uppercase;
  color: $gray;
  font-size: 13px;
  line-height: 15px;

  @media (min-width: 768px) {
    font-size: 18px;
    line-height: 21px;
  }
}

.flight-selector-card__airports {
  margin: 0 10px 10px 10px;

  @media (min-width: 768px) {
    margin: 0 0 0 50px;
  }

  font-family: Roboto;
  font-weight: bold;
  text-transform: capitalize;
  color: $primary;

  font-size: 18px;
  line-height: 21px;

  @media (min-width: 768px) {
    font-size: 22px;
    line-height: 26px;
  }

  display: flex;
  align-items: center;
}

.flight-selector-card__arrow {
  margin: 0 10px;

  @media (min-width: 768px) {
    margin: 0 25px;
  }
}

.flight-selector-card__body {
  background-color: $white;
}
</style>
