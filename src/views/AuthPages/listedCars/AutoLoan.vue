<template>
    <div class="grid grid-cols-3 gap-8">
        <AutoLoanCarCards v-for="car in cars" :key="car" :car="car" link="/settings/car-financing/auto-loan" />
    </div>
</template>

<script setup>
import { carsList } from '/src/components/reusable/dummyData/CarsList';
import AutoLoanCarCards from '/src/views/AuthPages/carFinancing/AutoLoanCarCards.vue';

const cars = carsList;
</script>

<style lang="scss" scoped></style>
