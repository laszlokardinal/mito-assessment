<script>
export default {};
</script>

<template>
  <div class="flights-separator" />
</template>

<style lang="scss">
@import "~/view/variables.scss";

.flights-separator {
  height: 0px;

  background-color: $border-gray;
  border-top: 1px dashed $gray;

  position: relative;

  &:before {
    content: " ";

    position: absolute;
    top: -5px;
    left: calc(50% - 5px);
    width: 9px;
    height: 9px;

    border-right: 1px solid $gray;
    border-bottom: 1px solid $gray;

    transform: rotate(45deg);

    background-color: $white;
  }

  &:after {
    content: " ";

    position: absolute;
    top: -1px;
    left: calc(50% - 6px);
    width: 12px;

    border-top: 1px solid $border-gray;
  }
}
</style>
