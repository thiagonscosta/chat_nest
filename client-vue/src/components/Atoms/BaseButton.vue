<template>
  <button class="base-button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseButton",
  setup() {
    console.log("teste");
  },
});
</script>

<style lang="scss" scoped>
/* .base-button {
  @apply bg-purple-600 
    px-10 py-2 
    text-white
    rounded-full
    shadow-xl
    transition-colors duration-150;

  &:hover {
    @apply bg-purple-800;
  }
} */
</style>
