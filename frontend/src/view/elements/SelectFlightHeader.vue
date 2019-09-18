<script>
import { ArrowLeft, ArrowRight, MitoLogo } from "../images";

export default {
  components: { ArrowLeft, ArrowRight, MitoLogo },
  props: {
    departureStation: { type: String, required: true },
    destinationStation: { type: String, required: true }
  }
};
</script>

<template>
  <div class="select-flight-header__wrapper">
    <router-link class="select-flight-header__link" to="/">
      <mito-logo class="select-flight-header__logo" />
    </router-link>
    <div class="select-flight-header__departure-wrapper">
      <div class="select-flight-header__label">Leaving from</div>
      <div class="select-flight-header__airport">
        {{ departureStation }}
      </div>
    </div>
    <div class="select-flight-header__arrows">
      <ArrowLeft class="select-flight-header__arrow" />
      <ArrowRight class="select-flight-header__arrow" />
    </div>
    <div class="select-flight-header__destination-wrapper">
      <div class="select-flight-header__airport">
        {{ destinationStation }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "~/view/variables.scss";

.select-flight-header__wrapper {
  height: 60px;

  background-color: $primary;

  display: flex;
}

.select-flight-header__link {
  outline: 0;
}

.select-flight-header__logo {
  margin: 15px;
}

.select-flight-header__departure-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 768px) {
    margin-left: 126px;
    justify-content: flex-start;
  }
}

.select-flight-header__label {
  margin-top: 12px;

  font-family: Roboto;
  font-size: 10px;
  line-height: 12px;
  text-transform: uppercase;
  color: $white;

  display: none;

  @media (min-width: 768px) {
    display: block;
  }
}

.select-flight-header__arrows {
  margin-left: 10px;

  @media (min-width: 768px) {
    margin-left: 40px;
  }

  display: flex;
  flex-direction: column;

  padding-top: 12px;
}

.select-flight-header__arrow {
  margin-top: 6px;
}

.select-flight-header__destination-wrapper {
  margin-left: 10px;

  @media (min-width: 768px) {
    margin-top: 24px;
    margin-left: 40px;
  }

  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    align-items: stretch;
  }
}

.select-flight-header__airport {
  font-family: Roboto;
  font-size: 20px;
  line-height: 23px;
  color: $white;
}
</style>
