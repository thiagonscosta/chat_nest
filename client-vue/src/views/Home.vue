<template>
  <div class="home">
    <base-button :title="'Google'"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseButton from '../components/buttons/BaseButton.vue';

@Options({
  components: {
    BaseButton
  },
})
export default class Home extends Vue {}
</script>
