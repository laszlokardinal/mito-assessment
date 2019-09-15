<script>
export default {
  props: {
    options: { type: Array, required: true },
    value: { type: String }
  },
  methods: {
    handleMouseDown(id) {
      this.$emit("change", id);
    }
  }
};
</script>

<template>
  <div class="dropdown-list__wrapper">
    <template v-for="option in options">
      <button
        :key="option.id"
        :class="{
          'dropdown-list__item': true,
          'dropdown-list__item--selected': option.id === value
        }"
        @mousedown="handleMouseDown(option.id)"
      >
        {{ option.title }}
      </button>
    </template>
  </div>
</template>

<style lang="scss">
@import "~/view/variables.scss";

.dropdown-list__wrapper {
  position: absolute;
  top: calc(100% + 1px);
  width: 250px;
  height: 250px;
  overflow-y: scroll;

  background: $white;
  box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
}

.dropdown-list__item {
  padding: 8px 15px;

  border: 0;
  outline: 0;

  font-family: Roboto;
  font-size: 16px;
  line-height: 19px;
  text-align: left;

  background-color: $white;
}

.dropdown-list__item--selected {
  color: $primary;
}

.dropdown-list__item:hover {
  background-color: $hover-gray;
}

.dropdown-list__item::-moz-focus-inner {
  border: 0;
}
</style>
