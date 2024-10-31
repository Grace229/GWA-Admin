<template>
    <div>
        <!-- {{ props.carDetails.isliked }} -->

        <div v-if="props.carDetails.isliked">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M13.4253 2.5C16.3605 2.5 18.3327 5.29375 18.3327 7.9C18.3327 13.1781 10.1475 17.5 9.99935 17.5C9.8512 17.5 1.66602 13.1781 1.66602 7.9C1.66602 5.29375 3.63824 2.5 6.57342 2.5C8.25861 2.5 9.36046 3.35312 9.99935 4.10312C10.6382 3.35312 11.7401 2.5 13.4253 2.5Z"
                    fill="red"
                    stroke="red"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </div>
        <div v-else>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M13.4253 2.5C16.3605 2.5 18.3327 5.29375 18.3327 7.9C18.3327 13.1781 10.1475 17.5 9.99935 17.5C9.8512 17.5 1.66602 13.1781 1.66602 7.9C1.66602 5.29375 3.63824 2.5 6.57342 2.5C8.25861 2.5 9.36046 3.35312 9.99935 4.10312C10.6382 3.35312 11.7401 2.5 13.4253 2.5Z"
                    fill="white"
                    stroke="#4A5578"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    carDetails: {
        type: Object,
        default: {
            vendorId: null,
            vehicleId: null,
            userId: null,
            isliked: false,
        },
    },
});
</script>

<style lang="scss" scoped>
// .heart{
//     color: #c64b4b
// }
</style>
