<template>
    <div class="rounded-lg shadow-md bg-[#ffffff]">
        <div class="relative min-h-[200px]">
            <Carousel class="h-[200px]" v-model="slideIndex" :autoplay="3000000" :wrap-around="true" :transition="500" :itemsToShow="1">
                <Slide class="h-[200px]" v-for="slide in car.pictures" :key="slide">
                    <img class="carousel__item rounded-t-lg !w-[100%] !min-h-[200px]" :src="slide.fileUrl" :alt="car.brand" />
                </Slide>

                <!-- <template #addons>
                    <navigation>
                        <template #next>
                            <CarouselNext class="text-white" />
                        </template>
                        <template #prev> <CarouselPrev class="text-white" /></template>
                    </navigation>
                </template> -->
            </Carousel>
            <div class="absolute inset-x-0 bottom-0 w-full flex items-center justify-center gap-[7px] mb-[15px]">
                <button
                    v-for="(content, index) in car.pictures"
                    :key="content"
                    :class="car.pictures[slideIndex] === car.pictures[index] ? 'bg-white' : 'inactivePagination'"
                    @click="changeView(index)"
                    class="bottom-2 h-[6px] w-[6px] rounded-[100%] bg-white"
                ></button>
            </div>
        </div>
        <!-- <div class="h-[200px] rounded-t-lg">
            <img :src="car.pictures[0].fileUrl" :alt="car.pictures[0].photoName" class="h-full w-full rounded-t-lg" />
        </div> -->
        <div class="flex flex-col gap-3 pt-[21px] px-[19px] bg-[#ffffff]">
            <div class="flex items-center justify-between font-medium text-xs">
                <div v-if="car.statusText === 'Draft'" class="bg-[#4A5578] text-[#FFFFFF] rounded-[3px] py-[5px] px-[8px]">{{ car.statusText }}</div>
                <div v-else-if="car.statusText === 'Published'" class="bg-[#12B76A] text-[#FFFFFF] rounded-[3px] py-[5px] px-[8px]">{{ car.statusText }}</div>
                <div v-else-if="car.statusText === 'Rejected'" class="bg-[#F0203D] text-[#FFFFFF] rounded-[3px] py-[5px] px-[8px]">{{ car.statusText }}</div>

                <div v-else-if="car.statusText === 'Pending'" class="bg-[#4E5BA6] text-[#FFFFFF] rounded-[3px] py-[5px] px-[8px]">Pending Review</div>
                <div v-else class="text-[#344054] bg-[#F2F4F7] rounded-[3px] py-[5px] px-[8px]">{{ car.statusText }}</div>

                <!-- <button class="bg-[#5D6B98] text-[#FFFFFF] rounded-[3px] py-[5px] px-[8px]">Foreign Used</button> -->
            </div>
            <h2 class="font-semibold text-sm text-[#30374F]">{{ `${car.year}  ${car.brand}  ${car.model}` }}</h2>
            <div class="mb-[5px] flex font-normal text-xs text-[#4A5578] gap-[19px] flex-wrap">
                <span class="flex items-center gap-1"
                    ><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6 1V2.25M6 1C3.23858 1 1 3.23858 1 6M6 1C8.76142 1 11 3.23858 11 6M6 9.75V11M6 11C8.76142 11 11 8.76142 11 6M6 11C3.23858 11 1 8.76142 1 6M2.25 6H1M11 6H9.75M9.53921 9.53921L8.65234 8.65234M2.46082 9.53921L3.34858 8.65145M2.46082 2.5L3.32904 3.36823M9.53921 2.5L6.74995 5.25M7 6C7 6.55228 6.55228 7 6 7C5.44772 7 5 6.55228 5 6C5 5.44772 5.44772 5 6 5C6.55228 5 7 5.44772 7 6Z"
                            stroke="#4A5578"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                    {{ car.mileage == 0 ? '0.00' : formatCurrency(car.mileage).slice(1, car.mileage) }}
                </span>

                <span class="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_3079_47583)">
                            <path
                                d="M1.875 6.75C1.875 6.33516 2.21086 6 2.625 6C3.03984 6 3.375 6.33516 3.375 6.75C3.375 7.16484 3.03984 7.5 2.625 7.5C2.21086 7.5 1.875 7.16484 1.875 6.75ZM10.125 6.75C10.125 7.16484 9.78984 7.5 9.375 7.5C8.96016 7.5 8.625 7.16484 8.625 6.75C8.625 6.33516 8.96016 6 9.375 6C9.78984 6 10.125 6.33516 10.125 6.75ZM1.12734 4.425L1.93008 2.13117C2.21953 1.30383 3 0.75 3.87656 0.75H8.12344C8.97891 0.75 9.78047 1.30383 10.0711 2.13117L10.8727 4.425C11.5453 4.81406 12 5.54063 12 6.375V10.6875C12 10.9992 11.7492 11.25 11.4375 11.25C11.1258 11.25 10.875 10.9992 10.875 10.6875V9.375H1.125V10.6875C1.125 10.9992 0.873047 11.25 0.5625 11.25C0.251953 11.25 0 10.9992 0 10.6875V6.375C0 5.54063 0.453516 4.81406 1.12734 4.425ZM2.42344 4.125H9.57656L9.00703 2.50313C8.87578 2.12672 8.52188 1.875 8.12344 1.875H3.87656C3.47812 1.875 3.12422 2.12672 2.99297 2.50313L2.42344 4.125ZM9.75 5.25H2.25C1.62867 5.25 1.125 5.75391 1.125 6.375V8.25H10.875V6.375C10.875 5.75391 10.3711 5.25 9.75 5.25Z"
                                fill="#4A5578"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_3079_47583">
                                <rect width="12" height="12" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    {{ car.condition }}
                </span>
                <span class="flex items-center gap-1"
                    ><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6 6.5C6.82843 6.5 7.5 5.82843 7.5 5C7.5 4.17157 6.82843 3.5 6 3.5C5.17157 3.5 4.5 4.17157 4.5 5C4.5 5.82843 5.17157 6.5 6 6.5Z"
                            stroke="#4A5578"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M6 11C8 9 10 7.20914 10 5C10 2.79086 8.20914 1 6 1C3.79086 1 2 2.79086 2 5C2 7.20914 4 9 6 11Z"
                            stroke="#4A5578"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    {{ car.location }}</span
                >
            </div>
            <div class="flex items-center justify-between">
                <h1 class="font-bold text-xl text-[#30374F]">{{ formatCurrency(car.price) }}</h1>
                <!-- {{ car.id }} -->
                <CarCardMenu :carId="car.id" />
            </div>
        </div>
        <div class="pb-[19px] px-[19px]">
            <!-- <p class="mt-[5px] text-xs font-semibold text-[#FF6600]">deal</p> -->
        </div>
    </div>
</template>

<script setup>
import CarouselPrev from '/src/components/reusable/CarouselPrev.vue';
import CarouselNext from '/src/components/reusable/CarouselNext.vue';
import { defineProps, ref, inject, provide } from 'vue';
import CarCardMenu from '@/views/AuthPages/vendor/vendorCarListing/CarCardMenu.vue';
import 'vue3-carousel/dist/carousel.css';
import {
    Carousel,
    Slide,
    // Pagination,
    Navigation,
} from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';

// const props = defineProps(['car']);
const props = defineProps({
    car: Object,
});

const slideIndex = ref(0);
const changeView = (index) => {
    slideIndex.value = index;
};

const formatCurrency = inject('formatCurrency');
const menuOptions = ['Preview', 'Edit'];

provide('menuOptions', menuOptions);
</script>

<style lang="scss" scoped>
.inactivePagination {
    background: rgba(255, 255, 255, 0.5);
}
</style>
