<template>
  <base-button>
    <span>Google</span>
  </base-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseButton from "./Atoms/BaseButton.vue";

export default defineComponent({
  components: {
    BaseButton,
  },
});
</script>
