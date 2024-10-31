<template>
    <div class="w-full">
        <div class="mt-[43px]"></div>
        <div v-if="carsLoading && cars.length === 0" class="grid-cols-4 grid gap-6 xl:gap-8">
            <span v-for="count in 4" :key="count"> <CarCardLoading /></span>
        </div>

        <div v-else-if="!carsLoading && cars.length === 0" class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid gap-6 xl:gap-8'">
            <UnAuthCarCarousel v-for="car in dummyCarData" :key="car" :car="car" link="/buy_car" />
        </div>

        <div v-else class="max-w-[330px] mx-auto sm:max-w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid gap-6 xl:gap-8'">
            <CarouselCard v-for="car in cars" :key="car" :car="car" link="/buy_car" />
        </div>
    </div>
</template>

<script setup>
import { dummyCarData } from './carComponents/DummyCarData.js';
import UnAuthCarCarousel from './carComponents/UnAuthCarCarousel.vue';
// import CarCarousel from '@/components/reusable/CarCarousel.vue';
import CarCardLoading from '@/components/reusable/CarCardLoading.vue';
import { Log } from '@/util';
import CarouselCard from '@/views/search/CarouselCard.vue';
import { getAllCars } from '@/services/GeneralServices.js';
import { reactive, ref, onBeforeMount, inject, computed } from 'vue';
import { useStore } from 'vuex';

onBeforeMount(() => {
    getCars();
});
const store = useStore();
const carsLoading = ref(false);
const financeOptn = inject('financeOptn');
const pageSizeValue = inject('pageSizeValue');
const cars = ref([]);
const userId = computed(() => `&UserId=${store.getters['authToken/userId']}`);

const searchParams = reactive({
    userId: userId.value,
    brand: '',
    model: '',
    location: '',
    min: 0,
    max: 1000,
    priceMin: 0,
    financeOption: computed(() => (financeOptn.value ? financeOptn.value : 0)),
    priceMax: 2000000000,
    conditions: [],
    pageNumber: 1,
    pageSize: computed(() => (pageSizeValue.value ? pageSizeValue.value : 4)),
    total: 0,
});

const prepareParams = () => {
    const obj = {
        userId: searchParams.userId,
        leastAmount: searchParams.priceMin,
        highestAmount: searchParams.priceMax,
        highestYear: '',
        leastYear: '',
        searchText: '',
        conditions: searchParams.conditions,
        financeOption: Number(searchParams.financeOption),
        brandId: searchParams.brand,
        modelId: searchParams.model,
        location: searchParams.location,
        pageNumber: searchParams.pageNumber,
        pageSize: searchParams.pageSize,
    };
    return obj;
};

const getCars = () => {
    carsLoading.value = true;
    getAllCars(
        prepareParams(),
        (res) => {
            carsLoading.value = false;
            searchParams.total = res.data.total;

            if (res.data.data.length) {
                cars.value = res.data.data;
            }
        },
        (err) => {
            carsLoading.value = false;
        }
    );
};
</script>

<style lang="scss" scoped></style>
