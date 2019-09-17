<script>
import ClickOutside from "vue-click-outside";

import { LeftArrowChevron, RightArrowChevron } from "../images";

import { renderMonth } from "../renderers";

export default {
  components: { LeftArrowChevron, RightArrowChevron },
  directives: { ClickOutside },
  props: {
    value: { type: String },
    minimumValue: { type: String, required: true }
  },
  data() {
    const now = new Date();
    const actualMonthNumber = now.getFullYear() * 12 + now.getMonth();

    const showingDate = this.value ? new Date(this.value) : now;
    const showingMonthNumber =
      showingDate.getFullYear() * 12 + showingDate.getMonth();

    return { actualMonthNumber, showingMonthNumber };
  },
  computed: {
    showingYear() {
      return Math.floor(this.showingMonthNumber / 12);
    },
    showingMonthIndex() {
      return this.showingMonthNumber % 12;
    },
    showingMonthLabel() {
      const month = renderMonth(this.showingMonthIndex);
      const year = this.showingYear;

      return `${month} ${year}`;
    },
    calendar() {
      const { showingYear, showingMonthIndex, minimumValue, value } = this;

      const daysInTheMonth = new Date(
        showingYear,
        showingMonthIndex + 1,
        0
      ).getDate();

      const offset =
        (new Date(showingYear, showingMonthIndex, 1).getDay() + 6) % 7;

      return new Array(6 * 7).fill(null).map((_, index) => {
        if (index < offset || index >= daysInTheMonth + offset) {
          return null;
        }

        const day = index - offset + 1;

        const monthString = (showingMonthIndex + 1).toString().padStart(2, 0);
        const dayString = day.toString().padStart(2, 0);
        const date = `${showingYear}-${monthString}-${dayString}`;

        const selected = date === value;

        const disabled = date < minimumValue;

        const weekday = (day + offset) % 7;
        const weekend = weekday === 6 || weekday === 0;

        return { day, date, selected, disabled, weekend };
      });
    }
  },
  methods: {
    handlePreviousClick() {
      if (this.showingMonthNumber > this.actualMonthNumber) {
        this.showingMonthNumber = this.showingMonthNumber - 1;
      }
    },
    handleNextClick() {
      this.showingMonthNumber = this.showingMonthNumber + 1;
    },
    handleDateClick(newDate) {
      this.$emit("change", newDate);
    },
    handleClickOutside() {
      this.$emit("close");
    }
  }
};
</script>

<template>
  <div v-click-outside="handleClickOutside" class="date-picker__wrapper">
    <div class="date-picker__header">
      <button
        :class="{
          'date-picker__button': true,
          'date-picker__button--disabled':
            showingMonthNumber <= actualMonthNumber
        }"
        :disabled="showingMonthNumber <= actualMonthNumber"
        @click="handlePreviousClick"
      >
        <left-arrow-chevron class="date-picker__chevron" />
      </button>
      <div class="date-picker__month-label">{{ showingMonthLabel }}</div>
      <button class="date-picker__button" @click="handleNextClick">
        <right-arrow-chevron class="date-picker__chevron" />
      </button>
    </div>
    <div class="date-picker__dates">
      <div class="date-picker__day-label">Mon</div>
      <div class="date-picker__day-label">Tue</div>
      <div class="date-picker__day-label">Wed</div>
      <div class="date-picker__day-label">Thu</div>
      <div class="date-picker__day-label">Fri</div>
      <div class="date-picker__day-label">Sat</div>
      <div class="date-picker__day-label">Sun</div>
      <template v-for="(item, index) in calendar">
        <button
          v-if="item"
          :class="{
            'date-picker__button': true,
            'date-picker__button--selected': item.selected,
            'date-picker__button--disabled': item.disabled,
            'date-picker__button--weekend': item.weekend
          }"
          @click="handleDateClick(item.date)"
          :disabled="item.disabled"
          :key="index"
        >
          {{ item.day }}
        </button>
        <div v-else class="date-picker__placeholder" :key="index" />
      </template>
    </div>
  </div>
</template>

<style lang="scss">
@import "~/view/variables.scss";

.date-picker__wrapper {
  position: absolute;
  top: calc(100% + 1px);
  width: 250px;
  z-index: 1000;

  background: $white;
  box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.1);
}

.date-picker__header {
  padding: 10px 10px 0 10px;
  display: flex;
}

.date-picker__month-label {
  width: 162.5px;

  font-family: Roboto;
  font-size: 16px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.date-picker__dates {
  padding: 10px;

  display: flex;
  flex-wrap: wrap;
}

.date-picker__day-label {
  width: 32.5px;
  height: 16px;

  font-family: Roboto;
  font-size: 10px;
  line-height: 12px;
  text-transform: uppercase;

  display: flex;
  justify-content: center;
  align-items: center;
}

.date-picker__placeholder {
  width: 32.5px;
  height: 32.5px;
}

.date-picker__button {
  width: 32.5px;
  height: 32.5px;

  border: 0;
  outline: 0;

  font-family: Roboto;
  font-size: 16px;
  line-height: 19px;

  background-color: $white;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.date-picker__button--weekend {
  color: $secondary;
}

.date-picker__button--selected {
  border: 1px solid $primary;
}

.date-picker__button:hover {
  background-color: $hover-gray;
}

.date-picker__button::-moz-focus-inner {
  border: 0;
}

.date-picker__button--disabled {
  color: $gray;
}

.date-picker__button--disabled path {
  fill: $gray;
}

.date-picker__button--disabled:hover {
  background-color: $white;
}

.date-picker__chevron {
  width: 20px;
  height: 20px;
}
</style>
