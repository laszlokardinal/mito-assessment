<script>
import {
  SubmitButton,
  FlightDateSelector,
  FlightTicketSelector
} from "../elements";
import { DateInputField } from "../components";
import { CardArrowRight } from "../images";

export default {
  components: {
    SubmitButton,
    FlightDateSelector,
    FlightTicketSelector,
    DateInputField,
    CardArrowRight
  },
  props: {
    departureStation: { type: String, required: true },
    destinationStation: { type: String, required: true },
    flights: { type: Array, required: true },
    selectedFareSellKey: { type: String },
    departureDate: { type: String },
    minimumDepartureDate: { type: String, required: true },
    inbound: { type: Boolean, default: false }
  },
  data() {
    return { dateInputSelectedDate: null, dateInputError: null };
  },
  methods: {
    handleSelectTicket(fareSellKey) {
      this.$emit("ticket-change", fareSellKey);
    },
    handleDateChange(newDate) {
      this.$emit("date-change", newDate);
    },
    handleDateInputChange(newDate) {
      this.dateInputSelectedDate = newDate;
    },
    handleSubmit() {
      if (this.dateInputSelectedDate) {
        this.handleDateChange(this.dateInputSelectedDate);

        this.dateInputSelectedDate = null;
        this.dateInputError = null;
      } else {
        this.dateInputError = "Please select return";
      }
    }
  }
};
</script>

<template>
  <div class="flight-selector-card__wrapper">
    <div class="flight-selector-card__header">
      <div class="flight-selector-card__title">
        {{ inbound ? "Inbound" : "Outbound" }}
      </div>
      <div class="flight-selector-card__airports">
        {{ departureStation }}
        <card-arrow-right class="flight-selector-card__arrow" />
        {{ destinationStation }}
      </div>
    </div>
    <div class="flight-selector-card__body">
      <template v-if="departureDate">
        <flight-date-selector
          :departure-date="departureDate"
          :minimum-departure-date="minimumDepartureDate"
          @date-change="handleDateChange"
        />
        <flight-ticket-selector
          v-if="flights.length"
          :flights="flights"
          :selected-fare-sell-key="selectedFareSellKey"
          @select-ticket="handleSelectTicket"
          @date-change="handleDateChange"
        />
        <div class="flight-selector-card__placeholder" v-else>
          Sorry, could not find flights on this day
        </div>
      </template>
      <template v-else>
        <div class="flight-selector-card__form-wrapper">
          <date-input-field
            label="Return"
            :minimum-value="minimumDepartureDate"
            :value="dateInputSelectedDate"
            :error="dateInputError"
            @change="handleDateInputChange"
          />
          <div class="flight-selector-card__form-button ">
            <submit-button full-width label="Search" @click="handleSubmit" />
          </div>
        </div>
      </template>
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

.flight-selector-card__placeholder {
  padding: 45px 15px 60px 15px;

  border-top: 1px solid $border-gray;
  background-color: $white;

  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: $gray;

  text-align: center;
}

.flight-selector-card__form-wrapper {
  padding: 40px 10px 0px 10px;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.flight-selector-card__form-button {
  width: 250px;
  margin-bottom: 50px;

  @media (min-width: 600px) {
    width: 125px;
  }
}
</style>
