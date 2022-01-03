<template>
    <base-button : />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseButton from './BaseButton.vue'

export default defineComponent({
    name: 'GoogleButton',
    components: {
        BaseButton
    }
})
</script>
