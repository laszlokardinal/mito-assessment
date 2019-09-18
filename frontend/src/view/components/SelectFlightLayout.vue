<script>
import { Fragment } from "vue-fragment";

import { SelectFlightHeader, SelectFlightTitle } from "../elements";

export default {
  components: {
    Fragment,
    SelectFlightHeader,
    SelectFlightTitle
  },
  props: {
    departureStation: { type: String, required: true },
    destinationStation: { type: String, required: true }
  }
};
</script>

<template>
  <fragment>
    <select-flight-header
      :departure-station="departureStation"
      :destination-station="destinationStation"
    />
    <div class="select-flight__wrapper">
      <select-flight-title />
      <div class="select-flight__panels">
        <div class="select-flight__flights">
          <slot name="flights" />
        </div>
        <div class="select-flight__cards">
          <slot name="cards" />
        </div>
      </div>
    </div>
  </fragment>
</template>

<style lang="scss">
@import "~/view/variables.scss";

.select-flight__wrapper {
  max-width: 768px;

  @media (min-width: 1024px) {
    max-width: 1024px;
  }

  margin: 0 auto;
}

.select-flight__panels {
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
}

.select-flight__flights {
  margin: 0px 20px 40px 20px;
  order: 2;

  @media (min-width: 1024px) {
    margin: 0px 0px 40px 20px;
    width: 230px;
    order: 1;
  }
}

.select-flight__cards {
  flex-grow: 1;
  margin: 0 20px;

  order: 1;

  @media (min-width: 1024px) {
    order: 2;
  }
}
</style>
