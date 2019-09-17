<script>
export default {};
</script>

<template>
  <div class="home-container">
    <slot />
  </div>
</template>

<style lang="scss">
@import "~/view/variables.scss";

.home-container {
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
