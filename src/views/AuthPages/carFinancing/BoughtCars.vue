<template>
    <div>
        <div v-if="loading && cars.length === 0" class="carcardGrid">
            <span v-for="count in 3" :key="count"> <CarCardLoading /></span>
        </div>

        <div v-else-if="!loading && cars.length === 0" class="text-[#101828] font-semibold text-sm justify-center gap-2 items-center flex flex-col py-[60px]">
            No Cars

            <span class="text-[#475467] font-normal">Nothing to see</span>
        </div>
        <div v-else class="carcardGrid">
            <OrderCards v-for="car in cars" :key="car" :car="car" financeType="Buy" link="/settings/car-financing/auto-loan" />
        </div>
        <div v-if="cars.length > 9" class="mt-[40px]"><PaginationComponent /></div>
    </div>
</template>

<script setup>
import PaginationComponent from '@/components/reusable/PaginationComponent.vue';

// import { carsList } from '/src/components/reusable/dummyData/CarsList';
import OrderCards from './OrderCards.vue';
import CarCardLoading from '@/components/reusable/CarCardLoading.vue';
import { reactive, onMounted, ref, provide, watch } from 'vue';
import { getOrders } from '@/services/OrderServices.js';
import { useStore } from 'vuex';
import { Log, Constants } from '@/util';
onMounted(() => {
    fetchOrders();
});

const store = useStore();
const cars = ref([]);
const loading = ref(false);
const state = reactive({
    params: {
        buyerId: store.getters['authToken/userId'],
        orderType: Number(Constants.financeOptionsEnum[0].id),
        descending: true,
        pageNumber: 1,
        pageSize: 9,
        total: 0,
    },
});

const fetchOrders = () => {
    loading.value = true;
    getOrders(
        state.params,
        (res) => {
            loading.value = false;
            state.params.total = res.data.total;
            cars.value = res.data.data;
        },
        (err) => {
            // loading.value = false
        }
    );
};

watch(
    () => state.params.pageNumber,
    (newValue) => {
        fetchOrders();
        // displayParams();
    },
    { deep: true }
);

provide('searchParams', state.params);
</script>

<style lang="scss" scoped></style>
