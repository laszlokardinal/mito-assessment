<script>
import { FlightsItem } from "../elements";

export default {
  components: { FlightsItem },
  props: {
    flights: { type: Array, required: true }
  },
  computed: {
    total() {
      return this.flights.reduce((sum, { price }) => sum + price, 0);
    }
  },
  methods: {
    handleShadowClick() {
      this.$emit("close");
    },
    handleWrapperClick(e) {
      e.stopPropagation();
    }
  }
};
</script>

<template>
  <div class="checkout-modal__shadow" @click="handleShadowClick">
    <div class="checkout-modal__wrapper" @click="handleWrapperClick">
      <div class="checkout-modal__header">
        Thanks for buying your tickets at mito airlines
      </div>
      <div class="checkout-modal__body">
        <template v-for="flight in flights">
          <flights-item
            :key="flight.id"
            :departure-station="flight.departureStation"
            :departure-time="flight.departureTime"
            :destination-station="flight.destinationStation"
            :arrival-time="flight.arrivalTime"
          />
        </template>
      </div>
      <div class="checkout-modal__footer">
        <div class="checkout-modal__total">
          Total: <span class="checkout-modal__cost">${{ total }}</span>
        </div>
        <router-link to="/" class="checkout-modal__reset">
          No, thanks (reset)
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "~/view/variables.scss";

.checkout-modal__shadow {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: $shadow-black;

  display: flex;
  justify-content: center;
  align-items: center;
}

.checkout-modal__wrapper {
  margin: 20px;

  border-radius: 3px;
  background-color: $white;
}

.checkout-modal__header {
  background-color: $background-gray;
  padding: 15px 30px;

  font-family: Roboto;
  font-weight: 300;
  font-size: 16px;
  line-height: 19px;
  text-transform: uppercase;
  color: $primary;
}

.checkout-modal__body {
  padding: 10px 15px;

  display: flex;
  flex-wrap: wrap;
}

.checkout-modal__footer {
  padding: 20px 30px 25px 30px;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 400px) {
    justify-content: space-between;
    flex-direction: row;
  }
}

.checkout-modal__total {
  font-family: Roboto;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  text-transform: uppercase;
  color: $black;
}

.checkout-modal__cost {
  color: $primary;
}

.checkout-modal__reset {
  margin: 20px 0;

  font-family: Roboto;
  font-weight: bold;
  font-size: 12px;
  line-height: 17px;
  text-transform: uppercase;
  color: $secondary;
}
</style>
