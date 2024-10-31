<template>
    <div class="grid grid-cols-3 gap-8">
        <CarCarousel v-for="car in cars" :key="car" :car="car" />
    </div>
</template>

<script setup>
import CarCarousel from '/src/components/reusable/CarCarousel.vue';

const cars = [
    {
        id: 1,
        make: '2017 BMW X5',
        mileage: '58,911 mi',
        location: 'Lagos',
        locallyUsed: false,
        price: '$68,987',
        imageUrls: ['/Car2.png', '/Car1.png'],
    },

    {
        id: 2,
        make: '2017 BMW X5',
        mileage: '58,911 mi',
        location: 'Lagos',
        locallyUsed: true,
        price: '$68,987',
        imageUrls: ['/Car1.png', '/Car2.png'],
    },
    {
        id: 3,
        make: '2017 BMW X5',
        mileage: '58,911 mi',
        location: 'Lagos',
        locallyUsed: false,
        price: '$68,987',
        imageUrls: ['/Car1.png', '/Car2.png'],
    },
];
</script>

<style lang="scss" scoped></style>
