<script>
import { AirplaneIcon } from "../images";

export default {
  components: { AirplaneIcon }
};
</script>

<template>
  <div class="select-flight-title__wrapper">
    <airplane-icon class="select-flight-title__icon" />
    <h1 class="select-flight-title__text">
      Select flight
    </h1>
  </div>
</template>

<style lang="scss">
@import "~/view/variables.scss";

.select-flight-title__wrapper {
  margin: 25px 20px;

  @media (min-width: 768px) {
    margin: 45px 20px;
  }

  display: flex;
  justify-content: center;

  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
}

.select-flight-title__icon {
  @media (min-width: 1024px) {
    margin-left: 250px;
  }
}

.select-flight-title__text {
  margin: 0 0 0 25px;

  font-family: Roboto;
  font-weight: 300;
  line-height: 47px;
  text-transform: uppercase;
  color: $title-blue;

  font-size: 30px;

  @media (min-width: 768px) {
    font-size: 40px;
  }
}
</style>
