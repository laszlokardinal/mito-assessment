<script>
import { CalendarIcon } from "../images";
import { DatePicker, InputField } from "../elements";
import { renderDate } from "../renderers";

export default {
  components: { CalendarIcon, DatePicker, InputField },
  props: {
    label: { type: String, required: true },
    value: { type: String },
    error: { type: String }
  },
  data() {
    return {
      datePickerOpened: false
    };
  },
  computed: {
    valueString() {
      return this.value ? renderDate(this.value) : "";
    }
  },
  methods: {
    handleIconClick() {
      if (this.datePickerOpened) {
        this.datePickerOpened = false;
      } else {
        setTimeout(() => {
          this.datePickerOpened = true;
        }, 0);
      }
    },
    handleDateChange(newDate) {
      this.datePickerOpened = false;

      this.$emit("change", newDate);
    },
    handleClose() {
      this.datePickerOpened = false;
    }
  }
};
</script>

<template>
  <input-field :label="label" :collapse-label="!!value" :error="error">
    <div class="date-input-field__value">{{ valueString }}</div>
    <button class="date-input-field__button" @click="handleIconClick">
      <calendar-icon />
    </button>
    <date-picker
      v-if="datePickerOpened"
      :value="value"
      @change="handleDateChange"
      @close="handleClose"
    />
  </input-field>
</template>

<style lang="scss">
@import "~/view/variables.scss";

.date-input-field__value {
  font-family: Roboto;
  font-size: 16px;
  line-height: 19px;

  padding: 23px 15px 8px 15px;
}

.date-input-field__button {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 40px;
  height: 40px;

  padding: 0;

  background-color: transparent;
  border: 0;
  outline: 0;

  cursor: pointer;
}

.date-input-field__button::-moz-focus-inner {
  border: 0;
}

.date-input-field__button path {
  transition: fill 50ms ease;
}

.date-input-field__button:hover path {
  fill: $button-blue;
}

.date-input-field__icon {
  padding: 3px 2px 0 2px;
}
</style>
