<template>
    <div class="overflow-auto grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div class="min-w-[600px] sm:min-w-max">
            <RelatedPrices />
        </div>
        <div class="min-w-[600px] sm:min-w-max">
            <CarPendingPreview />
        </div>
    </div>
</template>

<script setup>
import CarPendingPreview from '/src/views/AuthPages/vendor/vendorDashboard/CarRentingPreview.vue';
import RelatedPrices from '/src/views/AuthPages/vendor/vendorDashboard/RelatedPrices.vue';
import { getDashboardVehicles } from '@/services/VendorServices.js';
import { onMounted, ref, reactive, inject, provide } from 'vue';
import { Log, Util } from '@/util';

onMounted(() => {
    getRelatedcarsList();
    getcarsPendingList();
});
const userId = inject('userId');
const sortEnum = {
    Brand: 1,
    Model: 2,
    Added: 3,
    Year: 4,
    Price: 5,
};
const relatedCarsList = ref([]);
const pendingCarsList = ref([]);

const relatedCarsLoading = ref(false);
const carPendingLoading = ref(false);
const searchParams = reactive({
    userId: userId,
    // sortBy: 3,
    // descending: true,
    brand: '',
    model: '',
    location: '',
    min: 0,
    max: 1000,
    priceMin: 10000,
    financeOption: '',
    priceMax: 2000000000,
    conditions: [],
    pageNumber: 1,
    pageSize: 5,
    total: 0,
});
const prepareRelatedCarsParams = () => {
    //status of 4 = rejected
    const obj = {
        userId: searchParams.userId,

        sortBy: sortEnum.Added,
        descending: true,

        pageNumber: searchParams.pageNumber,
        pageSize: searchParams.pageSize,
        status: 3,
    };
    return obj;
};

const preparePendingCarsParams = () => {
    //status of 4 = rejected
    const obj = {
        userId: searchParams.userId,

        sortBy: sortEnum.Added,
        descending: true,

        pageNumber: searchParams.pageNumber,
        pageSize: searchParams.pageSize,
        status: 2,
    };

    return obj;
};

const getRelatedcarsList = () => {
    relatedCarsLoading.value = true;
    getDashboardVehicles(
        prepareRelatedCarsParams(),
        (res) => {
            relatedCarsLoading.value = false;
            searchParams.total = res.data.total;
            if (res.data.data.length > 0) {
                relatedCarsList.value = res.data.data;
            }
        },
        (err) => {
            relatedCarsLoading.value = false;
        }
    );
};

const getcarsPendingList = () => {
    carPendingLoading.value = true;
    getDashboardVehicles(
        preparePendingCarsParams(),
        (res) => {
            carPendingLoading.value = false;
            searchParams.total = res.data.total;
            if (res.data.data.length > 0) {
                pendingCarsList.value = res.data.data;
            }
        },
        (err) => {
            carPendingLoading.value = false;
        }
    );
};

provide('relatedCarsList', relatedCarsList);
provide('pendingCarsList', pendingCarsList);
provide('relatedCarsLoading', relatedCarsLoading);
provide('carPendingLoading', carPendingLoading);
</script>

<style lang="scss" scoped></style>
