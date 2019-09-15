<script>
import { InputField, DropdownList } from "../elements";

export default {
  components: { InputField, DropdownList },
  props: {
    label: { type: String, required: true },
    options: { type: Array, required: true },
    value: { type: String },
    error: { type: String }
  },
  data() {
    return {
      focused: false,
      filterString: ""
    };
  },
  computed: {
    displayValue() {
      const { focused, options, value, filterString } = this;

      if (focused) {
        return filterString;
      }

      if (value) {
        const selectedOption = options.find(({ id }) => id === value);

        if (selectedOption) {
          return selectedOption.title;
        }
      }

      return "";
    },
    collapseLabel() {
      const { focused, value } = this;

      return focused || !!value;
    },
    filteredOptions() {
      const { options, filterString } = this;

      const filterWords = filterString
        .trim()
        .toLowerCase()
        .split(/\s+/);

      return options.filter(({ title }) => {
        const lowerCaseTitle = title.toLowerCase();

        return filterWords
          .map(word => lowerCaseTitle.includes(word))
          .every(truthy => truthy);
      });
    }
  },
  methods: {
    handleFocus() {
      this.focused = true;
      this.filterString = "";
    },
    handleBlur() {
      this.focused = false;
    },
    handleFilterChange(e) {
      this.filterString = e.target.value;
    },
    handleSelect(id) {
      this.$emit("change", id);
    }
  }
};
</script>

<template>
  <input-field :label="label" :collapse-label="collapseLabel" :error="error">
    <input
      type="text"
      class="dropdown-input-field__text-input"
      :value="displayValue"
      @input="handleFilterChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <dropdown-list
      v-if="focused"
      :options="filteredOptions"
      :value="value"
      @change="handleSelect"
    />
  </input-field>
</template>

<style lang="scss">
@import "~/view/variables.scss";

.dropdown-input-field__text-input,
.dropdown-input-field__value {
  font-family: Roboto;
  font-size: 16px;
  line-height: 19px;

  padding: 23px 15px 8px 15px;
}

.dropdown-input-field__text-input {
  box-sizing: border-box;
  width: 100%;

  border: 0;
  background: transparent;
}
</style>
