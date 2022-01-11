<template>
  <div class="home">
    <base-button>
      <span>Google</span>
    </base-button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import BaseButton from "../components/Atoms/BaseButton.vue";

@Options({
  components: {
    BaseButton,
  },
})
export default class Home extends Vue {}
</script>
