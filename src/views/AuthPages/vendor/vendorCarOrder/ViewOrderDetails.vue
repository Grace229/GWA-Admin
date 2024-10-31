<template>
    <div>
        <GoBack class="" @click="$router.push('/ordered-cars')" text="Back to Car Order" />

        <VehicleDetails />
    </div>
</template>

<script setup>
import GoBack from '@/components/reusable/GoBack.vue';
import VehicleDetails from '@/views/AuthPages/vendor/vendorCarOrder/carOrderDetails/VehicleDetails.vue';
// import { computed, onMounted } from 'vue';
// import { useRoute } from 'vue-router';
// onMounted(() => {});

// const route = useRoute();
// const orderId = computed(() => route.params.orderId);
// const customerId = computed(() => route.params.customerId);
// const vehicleId = computed(() => route.params.vehicleId);

// const fetchVehicle = () => {
//     //api call for fetching vehicle
// };

// const fetchCustomer = () => {
//     //api call for fetching customer
// };

// const fetchOrderDetails = () => {
//     //api call for fetching order
// };
</script>

<style lang="scss" scoped></style>
