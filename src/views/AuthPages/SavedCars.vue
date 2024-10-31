<template>
    <div>
        <SettingsPlate header="Saved Cars" description="Manage your vehicle listings">
            <template v-slot:body>
                <div v-if="loading && likedCars.length === 0" class="flex-1">
                    <div class="carcardGrid">
                        <span v-for="count in 9" :key="count"> <CarCardLoading /></span>
                    </div>

                    <div class="flex items-center justify-center mt-[60px] mb-[20px]"><Pagination /></div>
                </div>
                <div v-else-if="!loading && likedCars.length === 0" class="text-center">
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
                    <h1 class="font-semibold text-[18px] text-[#1D2939]">Nothing to see here</h1>
                    <p class="font-normal text-sm text-[#667085] mt-1">You haven't saved any cars to your account</p>

                    <!-- ------ -->
                </div>
                <div v-else class="flex-1">
                    <div class="carcardGrid">
                        <CarouselCard v-for="car in likedCars" :key="car" :car="car" link="/buy_car" />
                    </div>

                    <div v-if="likedCars.length >= 9" class="mt-[40px]"><PaginationComponent /></div>
                </div>
            </template>
        </SettingsPlate>
    </div>
</template>

<script setup>
import { Log } from '@/util';
import CarouselCard from '@/views/search/CarouselCard.vue';
import CarCardLoading from '@/components/reusable/CarCardLoading.vue';
import Pagination from '/src/components/reusable/Pagination.vue';
import PaginationComponent from '@/components/reusable/PaginationComponent.vue';

import { useStore } from 'vuex';
import SettingsPlate from '@/components/reusable/SettingsPlate.vue';
import { getAllLikedCars } from '@/services/MarketPlace.js';
import { reactive, ref, onMounted, computed, watch, provide } from 'vue';
onMounted(() => {
    getLikedCars();
});

const store = useStore();
const userId = computed(() => store.getters['authToken/userId']);
const state = reactive({
    searchParams: {
        userId: userId.value,
        descending: true,
        pageNumber: 1,
        pageSize: 9,
        total: 0,
    },
});
const loading = ref(false);
const likedCars = ref([]);

const getLikedCars = () => {
    loading.value = true;
    getAllLikedCars(
        state.searchParams,
        (res) => {
            likedCars.value = res.data.data;
            state.searchParams.total = res.data.total;
            loading.value = false;
        },
        (err) => {
            loading.value = false;
        }
    );
};

provide('searchParams', state.searchParams);
</script>

<style lang="scss" scoped></style>
