<template>
    <div>
        <MainAuthPlate header="Dashboard" description="Here’s a quick overview of your business.">
            <template v-slot:nav>
                <VendorDashboardNav />
            </template>
            <template v-slot:body>
                <div class="flex flex-col gap-6">
                    <VendorDashboardCards />
                    <VendorGraph />
                    <VendorDashboardTables />
                </div>
            </template>
        </MainAuthPlate>
    </div>
</template>

<script setup>
import VendorDashboardTables from '/src/views/AuthPages/vendor/vendorDashboard/VendorDashboardTables.vue';
import VendorGraph from '/src/views/AuthPages/vendor/vendorDashboard/VendorGraph.vue';
import VendorDashboardCards from '/src/views/AuthPages/vendor/vendorDashboard/VendorDashboardCards.vue';
import VendorDashboardNav from '/src/views/AuthPages/vendor/vendorDashboard/VendorDashboardNav.vue';
import MainAuthPlate from '/src/components/reusable/MainAuthPlate.vue';
</script>

<style lang="scss" scoped></style>
