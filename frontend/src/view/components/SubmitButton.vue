<script>
export default {
  props: {
    label: { type: String, required: true },
    secondary: { type: Boolean, default: false },
    fullWidth: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>

<template>
  <button
    :class="{
      'submit-button': true,
      'submit-button--secondary-color': secondary,
      'submit-button--full-width': fullWidth,
      'submit-button--disabled': disabled
    }"
    :disabled="disabled"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<style lang="scss">
@import "~/view/variables.scss";

.submit-button {
  justify-self: center;

  width: 250px;
  height: 50px;

  @media only screen and (min-width: 670px) {
    width: 230px;
  }

  background-color: $button-blue;
  transition: background-color 50ms ease;

  border-radius: 3px;
  border: 0;

  color: white;
  font-family: Roboto;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-transform: uppercase;

  cursor: pointer;
}

.submit-button:hover {
  background-color: $button-hover-blue;
}

.submit-button--secondary-color {
  background-color: $button-magenta;
}

.submit-button--secondary-color:hover {
  background-color: $button-hover-magenta;
}

.submit-button--full-width {
  width: 100%;
}

.submit-button--disabled,
.submit-button--disabled:hover {
  background-color: $button-gray;
}

.submit-button::-moz-focus-inner {
  border: 0;
}
</style>
