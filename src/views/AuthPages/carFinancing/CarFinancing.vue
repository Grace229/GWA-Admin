<template>
    <div>
        <SettingsPlate header="Car Financing" description="Manage your car purchase">
            <template v-slot:nav>
                <Navigator />
            </template>
            <template v-slot:body>
                <!-- {{ route.params.page }} -->
                <AutoLoan v-if="currentPage === 'auto-loan'" />
                <BoughtCars v-else-if="currentPage === 'purchased-cars'" />
                <LeasedCars v-else-if="currentPage === 'leased-cars'" />
                <RentedCars v-else-if="currentPage === 'rented-cars'" />
                <NotFoundRouter v-else />
            </template>
        </SettingsPlate>
    </div>
</template>

<script setup>
import { computed, provide, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Navigator from '/src/views/AuthPages/carFinancing/Nav.vue';
import SettingsPlate from '/src/components/reusable/SettingsPlate.vue';
import AutoLoan from '/src/views/AuthPages/carFinancing/AutoLoan.vue';
import LeasedCars from '/src/views/AuthPages/carFinancing/LeasedCars.vue';
import RentedCars from '/src/views/AuthPages/carFinancing/RentedCars.vue';
import BoughtCars from '@/views/AuthPages/carFinancing/BoughtCars.vue';
import NotFoundRouter from '@/components/reusable/NotFoundRouter.vue';
onMounted(() => {
    checkRoutePath();
});
const route = useRoute();
const router = useRouter();
const currentPage = computed(() => route.params.page);

const checkRoutePath = () => {
    if (currentPage !== 'auto-loan' && currentPage !== 'leased-cars' && currentPage !== 'rented-cars') {
        // router.push('/404');
    }
};

watch(
    () => currentPage,
    () => {
        checkRoutePath();
    }
);
provide('currentPage', currentPage);
</script>

<style lang="scss" scoped></style>
