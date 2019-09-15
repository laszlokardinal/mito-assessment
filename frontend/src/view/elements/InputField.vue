<script>
import { WarningTriangle } from "../images";

export default {
  components: { WarningTriangle },
  props: {
    label: { type: String, required: true },
    collapseLabel: { type: Boolean, required: true },
    error: { type: String }
  }
};
</script>

<template>
  <div class="input-field__wrapper">
    <div
      :class="{
        'input-field__inner': true,
        'input-field__inner--erroneous': !!error
      }"
    >
      <div
        :class="{
          'input-field__label': true,
          'input-field__label--collapsed': collapseLabel
        }"
      >
        {{ label }}
      </div>
      <slot />
    </div>
    <div v-if="!!error" class="input-field__error">
      <warning-triangle />
      <span class="input-field__error-message">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<style lang="scss">
@import "~/view/variables.scss";

.input-field__wrapper {
  margin: 0 10px;

  position: relative;
}

.input-field__inner {
  height: 50px;
  width: 250px;
  margin-bottom: 50px;

  background: $white;
  border: 1px solid $gray;
  box-sizing: border-box;
  border-radius: 2px;

  position: relative;
}

.input-field__inner--erroneous {
  margin-bottom: 0;
  border: 2px solid $secondary;
}

.input-field__label {
  position: absolute;
  top: calc(50% - 19px / 2);
  left: 15px;

  color: $gray;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;

  pointer-events: none;

  transition: all 150ms ease;
}

.input-field__label--collapsed {
  top: calc(50% - 12px / 2 - 11px);

  font-size: 10px;
  line-height: 12px;
}

.input-field__error {
  height: 40px;
  margin-bottom: 10px;

  display: flex;
  align-items: center;

  font-family: Roboto;
  font-size: 13px;
  line-height: 15px;
  color: $secondary;
}

.input-field__error-message {
  margin-left: 10px;
}
</style>
