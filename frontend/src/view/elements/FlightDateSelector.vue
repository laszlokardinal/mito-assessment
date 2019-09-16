<script>
import { LeftArrowChevron, RightArrowChevron } from "../images";
import { renderDate } from "../renderers";

export default {
  components: { LeftArrowChevron, RightArrowChevron },
  props: {
    departureDate: { type: String, required: true }
  },
  computed: {
    previousDay() {
      const date = new Date(this.departureDate);
      date.setDate(date.getDate() - 1);

      return renderDate(date, {
        displayDayAbbreviations: true,
        omitYear: true
      });
    },
    currentDay() {
      return renderDate(this.departureDate, { displayDay: true });
    },
    nextDay() {
      const date = new Date(this.departureDate);
      date.setDate(date.getDate() + 1);

      return renderDate(date, {
        displayDayAbbreviations: true,
        omitYear: true
      });
    }
  },
  methods: {
    handlePreviousDayClick() {
      const date = new Date(this.departureDate);
      date.setDate(date.getDate() - 1);

      this.$emit("date-change", date.toISOString().slice(0, 10));
    },
    handleNextDayClick() {
      const date = new Date(this.departureDate);
      date.setDate(date.getDate() + 1);

      this.$emit("date-change", date.toISOString().slice(0, 10));
    }
  }
};
</script>

<template>
  <div class="flight-date-selector__wrapper">
    <button
      class="flight-date-selector__button"
      @click="handlePreviousDayClick"
    >
      <div class="flight-date-selector__caret">
        <left-arrow-chevron />
      </div>
      <div class="flight-date-selector__label">{{ previousDay }}</div>
    </button>
    <div class="flight-date-selector__date">{{ currentDay }}</div>
    <button
      class="flight-date-selector__button flight-date-selector__button--align-right"
      @click="handleNextDayClick"
    >
      <div class="flight-date-selector__label">{{ nextDay }}</div>
      <div class="flight-date-selector__caret">
        <right-arrow-chevron />
      </div>
    </button>
  </div>
</template>

<style lang="scss">
@import "~/view/variables.scss";

.flight-date-selector__wrapper {
  height: 60px;

  display: flex;
  justify-content: space-between;
}

.flight-date-selector__button {
  width: 40px;

  @media (min-width: 768px) {
    width: 200px;
  }

  padding: 0;

  background-color: transparent;
  outline: 0;
  border: 0;

  cursor: pointer;

  display: flex;
  align-items: center;
}

.flight-date-selector__button--align-right {
  justify-content: flex-end;
}

.flight-date-selector__button::-moz-focus-inner {
  border: 0;
}

.flight-date-selector__caret {
  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.flight-date-selector__label {
  font-family: Roboto;
  font-weight: bold;
  font-size: 13px;
  line-height: 15px;
  text-transform: uppercase;
  color: $gray;

  transition: background-color 50ms ease;

  display: none;

  @media (min-width: 768px) {
    display: block;
  }
}

.flight-date-selector__date {
  font-family: Roboto;
  font-size: 18px;
  line-height: 21px;
  color: $black;

  display: flex;
  align-items: center;
}

.flight-date-selector__button:hover > .flight-date-selector__label {
  color: $hover-gray-dark;
}
</style>
