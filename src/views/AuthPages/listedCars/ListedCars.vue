<template>
    <div>
        <SettingsPlate header="Car Financing" description="Manage your car purchase">
            <template v-slot:nav>
                <Navigator />
            </template>
            <template v-slot:body>
                <AutoLoan v-if="currentPage === 'auto-loan'" />
                <LeasedCars v-if="currentPage === 'leased-cars'" />
                <RentedCars v-if="currentPage === 'rented-cars'" />
            </template>
        </SettingsPlate>
    </div>
</template>

<script setup>
import { computed, provide } from 'vue';
import { useRoute } from 'vue-router';
import Navigator from '/src/views/AuthPages/carFinancing/Nav.vue';
import SettingsPlate from '/src/components/reusable/SettingsPlate.vue';
import AutoLoan from '/src/views/AuthPages/carFinancing/AutoLoan.vue';
import LeasedCars from '/src/views/AuthPages/carFinancing/LeasedCars.vue';
import RentedCars from '/src/views/AuthPages/carFinancing/RentedCars.vue';

const route = useRoute();
const currentPage = computed(() => route.params.page);

provide('currentPage', currentPage);
</script>

<style lang="scss" scoped></style>
