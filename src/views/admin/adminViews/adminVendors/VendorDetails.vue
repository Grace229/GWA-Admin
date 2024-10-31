<template>
    <div>
        <GoBack class="mb-[30px]" @click="$router.push('/admin/users/users-list')" text="Back to Users" />

        <AdminDetailsPlate header="Customer's Details">
            <template v-slot:body>
                <!-- Body -->

                <div v-if="!vendor.hasOwnProperty('id')">
                    <SpinnerLoader class="mx-auto my-40 h-[50px] w-[50px]" />
                </div>

                <VendorProfileInputs v-else />
            </template>
        </AdminDetailsPlate>
    </div>
</template>

<script setup>
import GoBack from '@/components/reusable/GoBack.vue';
import VendorProfileInputs from '@/views/admin/adminViews/adminVendors/VendorProfileInputs.vue';
import AdminDetailsPlate from '@/components/reusable/AdminDetailsPlate.vue';
import { onMounted, ref, computed, provide } from 'vue';
import { useRoute } from 'vue-router';
// import { useStore } from 'vuex';
import { Log } from '@/util';
import { getVendor, getVendorStats } from '@/services/AdminServices.js';
onMounted(() => {
    getVendorDetails();
    // fetchVendorStats();
});

const vendor = ref({});
const vendorStats = ref({
    carsUloaded: 0,
    carsSold: 0,
    totalSales: 0,
});

// const store = useStore();
const route = useRoute();
const loading = ref(false);
const routeId = computed(() => route.params.id);
const userId = computed(() => route.params.userId);
const getVendorDetails = () => {
    loading.value = true;
    getVendor(
        routeId.value,

        (res) => {
            loading.value = false;
            vendor.value = res.data.data;
        },
        (err) => {
            loading.value = false;
        }
    );
};

const fetchVendorStats = () => {
    getVendorStats(
        routeId.value,
        userId.value,
        (res) => {
            const data = res.data.data;
            vendorStats.value = {
                carsUloaded: data.carsUloaded,
                carsSold: data.carsSold,
                totalSales: data.totalSales,
            };
        },
        (err) => {}
    );
};

provide('vendor', vendor);
provide('vendorStats', vendorStats);
</script>

<style lang="scss" scoped></style>
