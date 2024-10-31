<template>
    <div>
        <AddCar />
    </div>
</template>

<script setup>
import AddCar from '/src/views/AuthPages/vendor/vendorRejectedCars/AddCar.vue';
import { provide, reactive } from 'vue';
const conditions = [
    {
        id: 1,
        text1: 'Brand New',
    },
    {
        id: 2,
        text1: 'Used',
    },
];

const brands = [
    {
        id: 1,
        text1: 'Lexus',
    },
    {
        id: 2,
        text1: 'Honda',
    },
];

const models = [
    {
        id: 1,
        text1: 'ES350',
    },
    {
        id: 2,
        text1: 'ES360',
    },
];
const years = [
    {
        id: 1,
        text1: '2008',
    },
    {
        id: 2,
        text1: '2009',
    },
];
const bodyTypes = [
    {
        id: 1,
        text1: 'Metallic',
    },
    {
        id: 2,
        text1: 'Chrome',
    },
];
const fuelTypes = [
    {
        id: 1,
        text1: 'Petrol',
    },
    {
        id: 2,
        text1: 'Diesel',
    },
];
const engineTypes = [
    {
        id: 1,
        text1: '3.5L V6 Engine',
    },
    {
        id: 2,
        text1: '3.5L V8 Engine',
    },
];
const interiors = [
    {
        id: 1,
        text1: 'Fabric',
    },
    {
        id: 2,
        text1: 'Leather',
    },
];
const transmissionTypes = [
    {
        id: 1,
        text1: 'Automatic',
    },
    {
        id: 2,
        text1: 'Manual',
    },
];
const colors = [
    {
        id: 1,
        text1: 'Grey',
    },
    {
        id: 2,
        text1: 'Black',
    },
];
const mileages = [
    {
        id: 1,
        text1: '145,970',
    },
    {
        id: 2,
        text1: '195,260',
    },
];

const financingTypes = [
    {
        id: 0,
        text1: 'Buy',
    },
    {
        id: 1,
        text1: 'Lease',
    },
    {
        id: 2,
        text1: 'Rent',
    },
];

const locations = [
    {
        id: 1,
        text1: 'Lagos',
    },
    {
        id: 2,
        text1: 'Abuja',
    },
];

const features = reactive([
    {
        id: 1,
        name: 'Air Conditioning',
        checked: false,
    },
    {
        id: 2,
        name: 'Air Bags',
        checked: false,
    },
    {
        id: 3,
        name: 'Alloy Wheels',
        checked: false,
    },
    {
        id: 4,
        name: 'Air Suspension',
        checked: false,
    },
    {
        id: 5,
        name: 'AM/FM Radio',
        checked: false,
    },
    {
        id: 6,
        name: 'Power Windows',
        checked: false,
    },
    {
        id: 7,
        name: 'ABS System',
        checked: false,
    },
    {
        id: 8,
        name: 'Adaptive Headlamps',
        checked: false,
    },
]);

provide('conditions', conditions);
provide('brands', brands);
provide('models', models);
provide('years', years);
provide('bodyTypes', bodyTypes);
provide('fuelTypes', fuelTypes);
provide('engineTypes', engineTypes);
provide('interiors', interiors);
provide('transmissionTypes', transmissionTypes);
provide('colors', colors);
provide('mileages', mileages);
provide('financingTypes', financingTypes);
provide('locations', locations);
provide('features', features);
</script>

<style lang="scss" scoped></style>
