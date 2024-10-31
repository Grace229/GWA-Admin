<template>
    <div class="grid grid-cols-2 gap-4">
        <div class="">
            <RelatedPrices />
        </div>
        <div class="">
            <CarRentingPreview />
        </div>
    </div>
</template>

<script setup>
import CarRentingPreview from '/src/views/AuthPages/vendor/vendorDashboard/CarRentingPreview.vue';
import RelatedPrices from '/src/views/AuthPages/vendor/vendorDashboard/RelatedPrices.vue';
</script>

<style lang="scss" scoped></style>
