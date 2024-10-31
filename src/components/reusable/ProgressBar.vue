<template>
    <div class="w-full rounded h-2 bg-[#EAECF0] progress-bar">
        <div :style="{ width: props.progressValue + '%' }" class="bg-[#4A5578] h-2 rounded progress"></div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    progressValue: {
        type: Number,
        default: 0,
    },
    fileId: {
        type: String,
    },
});
</script>

<style lang="scss" scoped>
// .progress-bar .progress {
//     width: 50%;
// }
</style>
