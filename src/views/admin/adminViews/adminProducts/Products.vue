<template>
    <div>
        <Navigator />

        <AllCars v-if="currentPage === 'all-cars'" />

        <CarParameters v-if="currentPage === 'car-parameters'" />
        <CarFeatures v-if="currentPage === 'car-features'" />
    </div>
</template>

<script setup>
import { computed, provide } from 'vue';
import { useRoute } from 'vue-router';
import Navigator from '@/views/admin/adminViews/adminProducts/Nav.vue';
import AllCars from '@/views/admin/adminViews/adminProducts/AllCars.vue';
import CarParameters from '@/views/admin/adminViews/adminProducts/CarParameters.vue';
import CarFeatures from '@/views/admin/adminViews/adminProducts/CarFeatures.vue';
const route = useRoute();
const currentPage = computed(() => route.params.list);

provide('currentPage', currentPage);
</script>

<style lang="scss" scoped></style>
