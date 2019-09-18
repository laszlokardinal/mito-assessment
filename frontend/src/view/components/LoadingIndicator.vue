<script>
export default {
  props: {
    loading: { type: Boolean, required: true }
  }
};
</script>

<template>
  <div
    :class="{
      'loading-indicator__wrapper': true,
      'loading-indicator__wrapper--loading': loading
    }"
  >
    <div class="loading-indicator__ring" />
  </div>
</template>

<style lang="scss">
@import "~/view/variables.scss";

.loading-indicator__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2000;

  background-color: $loading-indicator-shadow;
  pointer-events: none;

  opacity: 0;
  transition: opacity 0.5s linear;

  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-indicator__wrapper--loading {
  transition: opacity 0.3s linear 0.3s;
  opacity: 1;
}

.loading-indicator__ring {
  display: inline-block;
  width: 64px;
  height: 64px;
}

.loading-indicator__ring:after {
  content: " ";
  display: block;
  width: 46px;
  height: 46px;
  margin: 1px;
  border-radius: 50%;
  border: 5px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: loading-indicator__ring 1.2s linear infinite;
}

@keyframes loading-indicator__ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
