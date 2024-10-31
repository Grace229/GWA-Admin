<template>
    <div>
        <SettingsPlate header="Rejected Cars" description="View all cars that have been rejected or archived">
            <template v-slot:body>
                <div class="min-h-[400px] flex items-center justify-center" v-if="carList.length === 0 && loading">
                    <div class="flex justify-center items-center">
                        <div class="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-300"></div>
                    </div>
                </div>
                <div v-else-if="carList.length === 0 && !loading" class="text-center">
                    <div class="flex justify-center mb-4">
                        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="4" y="4" width="48" height="48" rx="24" fill="#EFF1F5" />
                            <path
                                d="M37 37L33.5001 33.5M36 27.5C36 32.1944 32.1944 36 27.5 36C22.8056 36 19 32.1944 19 27.5C19 22.8056 22.8056 19 27.5 19C32.1944 19 36 22.8056 36 27.5Z"
                                stroke="#FF6600"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <rect x="4" y="4" width="48" height="48" rx="24" stroke="#F9F9FB" stroke-width="8" />
                        </svg>
                    </div>
                    <h1 class="font-semibold text-[18px] text-[#1D2939]">No Listed Cars</h1>
                    <p class="font-normal text-sm text-[#667085] mt-1">You haven’t added any cars to your account.</p>

                    <!-- ------ -->
                    <button @click="$router.push('/add-new-car')" class="brandButton flex items-center mx-auto rounded-lg gap-2 mt-5">
                        <div>
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.4998 4.16602V15.8327M4.6665 9.99935H16.3332" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        Add a Car
                    </button>
                </div>
                <div v-else class="">
                    <!-- <div class="flex items-center justify-between w-full mb-[30px]">
                        <div class="max-h-max">
                            <div class="relative min-w-[294px]">
                                <input
                                    type="tel"
                                    name="text"
                                    id="phoneNo"
                                    autocomplete="off"
                                    placeholder="Search"
                                    v-model="searchText"
                                    class="pl-[48px] block w-full border-gray-300 focus:border-gray-400 rounded-lg shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                    aria-describedby="phoneNo-description"
                                />

                                <div class="w-[40px] pl-4 absolute inset-y-0 left-0 flex items-center cursor-pointer">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                                            stroke="#667085"
                                            stroke-width="1.66667"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <button @click="$router.push('/add-car')" class="brandButton flex items-center rounded-lg gap-2">
                            <div>
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.4998 4.16602V15.8327M4.6665 9.99935H16.3332" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            Add a Car
                        </button>
                    </div> -->
                    <!-- {{ vendorInfo }} -->
                    <div class="carcardGrid">
                        <CarCard v-for="car in carList" :key="car.id" :car="car" />
                    </div>
                    <div v-if="carList.length >= 9" class="mt-[40px]"><PaginationComponent /></div>
                </div>
            </template>
        </SettingsPlate>
    </div>
</template>

<script setup>
import PaginationComponent from '@/components/reusable/PaginationComponent.vue';

import SettingsPlate from '/src/components/reusable/SettingsPlate.vue';
import { getRejectedCars } from '@/services/VendorServices.js';
import { onMounted, ref, watch, reactive, provide, computed, onBeforeMount } from 'vue';
import { Log, Util } from '@/util';
import { useRouter } from 'vue-router';

import { useStore } from 'vuex';
import CarCard from '@/views/AuthPages/vendor/vendorCarListing/CarCard.vue';
onBeforeMount(() => {
    pageEligibilityCheck();
});
onMounted(() => {
    getCarList();
});
const router = useRouter();
const store = useStore();
const vendorInfo = computed(() => store.getters['authToken/vendorInfo']);

const searchText = ref('');
const sortEnum = {
    Brand: 1,
    Model: 2,
    Added: 3,
    Year: 4,
    Price: 5,
};
const carList = ref([]);
const loading = ref(false);
const searchParams = reactive({
    userId: store.getters['authToken/userId'],
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
    pageSize: 9,
    total: 0,
});
const prepareParams = () => {
    //status of 4 = rejected
    const obj = {
        leastAmount: searchParams.priceMin,
        highestAmount: searchParams.priceMax,
        highestYear: '',
        leastYear: '',
        userId: searchParams.userId,
        searchText: searchText.value,
        sortBy: sortEnum.Added,
        descending: true,
        conditions: searchParams.conditions,
        financeOption: Number(searchParams.financeOption),
        brandId: searchParams.brand,
        modelId: searchParams.model,
        location: searchParams.location,
        pageNumber: searchParams.pageNumber,
        pageSize: searchParams.pageSize,
        status: 4,
    };
    return obj;
};
const pageEligibilityCheck = () => {
    // profile status of 4 = blocked;

    if (vendorInfo.value?.profileStatus == 4) {
        Util.handleGlobalAlert(true, 'Failed', 'You have been blocked');
        router.push('/dashboard');
    }
};
const getCarList = () => {
    loading.value = true;
    getRejectedCars(
        prepareParams(),
        (res) => {
            loading.value = false;

            searchParams.total = res.data.total;
            if (res.data.data.length > 0) {
                carList.value = res.data.data;
            }
        },
        (err) => {
            loading.value = false;
        }
    );
};

watch(searchText, (newValue) => {
    getCarList();
});

watch(
    () => searchParams.pageNumber,
    (newValue) => {
        getCarList();
    },
    { deep: true }
);

provide('searchParams', searchParams);
</script>

<style lang="scss" scoped></style>
