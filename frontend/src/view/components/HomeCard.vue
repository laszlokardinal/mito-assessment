<script>
import { MitoLogo } from "../images";

export default {
  components: { MitoLogo }
};
</script>

<template>
  <div class="home-card__wrapper">
    <div class="home-card__header">
      <mito-logo class="home-card__logo" />
      <span class="home-card__title">
        Mito Airline
      </span>
    </div>
    <div class="home-card__body">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@import "~/view/variables.scss";

.home-card__wrapper {
  margin: 50px;
  max-width: 570px;

  box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}

.home-card__header {
  background-color: $primary;

  display: flex;
  align-items: center;
}

.home-card__logo {
  margin: 10px 15px;
}

.home-card__title {
  color: $white;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  text-transform: uppercase;
}

.home-card__body {
  padding: 25px 5px 40px 5px;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (min-width: 670px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
  }

  background: $white;
}
</style>
