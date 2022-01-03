<template>
    <button :class="class">{{ title }}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:'BaseButton',
    props: {
        title: {
            type: String,
            required: true
        },
        class: {
            type: Object,
            required: true,
        }
    },
})
</script>
