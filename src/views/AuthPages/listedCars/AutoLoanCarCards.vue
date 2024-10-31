<template>
    <div class="rounded-lg shadow-md bg-[#ffffff]">
        <div class="relative">
            <Carousel class="" v-model="slideIndex" :autoplay="3000000" :wrap-around="true" :transition="500" :itemsToShow="1">
                <Slide class="" v-for="slide in car.imageUrls" :key="slide">
                    <img class="carousel__item rounded-t-lg !w-[100%]" :src="slide" :alt="car.make" />
                </Slide>

                <template #addons>
                    <!-- <Pagination  /> -->

                    <!-- <Navigation /> -->
                    <navigation>
                        <template #next>
                            <CarouselNext class="text-white" />
                        </template>
                        <template #prev> <CarouselPrev class="text-white" /></template>
                    </navigation>
                </template>
            </Carousel>
            <div class="absolute inset-x-0 bottom-0 w-full flex items-center justify-center gap-[7px] mb-[15px]">
                <button
                    v-for="(content, index) in car.imageUrls"
                    :key="content"
                    :class="car.imageUrls[slideIndex] === car.imageUrls[index] ? 'bg-white' : 'inactivePagination'"
                    @click="changeView(index)"
                    class="bottom-2 h-[6px] w-[6px] rounded-[100%] bg-white"
                ></button>
            </div>
        </div>
        <div @click="$router.push(`${link}/${car.id}`)" class="cursor-pointer flex flex-col gap-3 pt-[21px] px-[19px] bg-[#ffffff]">
            <div class="flex items-center justify-between font-medium text-xs">
                <button v-if="car.status === 'Pending Review'" class="bg-[#DC6803] text-[#FFFFFF] rounded-[3px] py-[5px] px-[8px]">Pending Review</button>
                <button v-if="car.status === 'Eligibility Approved'" class="bg-[#5D6B98] text-[#FFFFFF] rounded-[3px] py-[5px] px-[8px]">Eligibility Approved</button>
                <button v-if="car.status === 'Paid'" class="bg-[#12B76A] text-[#FFFFFF] rounded-[3px] py-[5px] px-[8px]">Paid</button>

                <div><Heart :carDetails="car" /></div>
            </div>
            <h2 class="font-semibold text-sm text-[#30374F]">{{ car.make }}</h2>
            <div class="mb-[5px] flex font-normal text-xs text-[#4A5578] gap-[19px]">
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
                    {{ car.mileage }}</span
                >
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
            <div class="flex justify-between items-center">
                <span class="font-bold text-xl text-[#30374F]">{{ car.price }}</span>
                <span v-if="car.status === 'Paid'" class="text-[#DC6803] text-xs font-semibold">View Report</span>
            </div>
        </div>
        <div class="pb-[19px] px-[19px]">
            <p v-if="car.deal" class="mt-[5px] text-xs font-semibold text-[#FF6600]">{{ car.deal }}</p>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Heart from '/src/components/reusable/Heart.vue';
import { ref } from 'vue';
import CarouselPrev from '/src/components/reusable/CarouselPrev.vue';
import CarouselNext from '/src/components/reusable/CarouselNext.vue';

import 'vue3-carousel/dist/carousel.css';
import {
    Carousel,
    Slide,
    // Pagination,
    Navigation,
} from 'vue3-carousel';

// const props = defineProps(['car']);
const props = defineProps({
    car: Object,
    link: {
        default: '/details',
    },
});
const slideIndex = ref(0);
const changeView = (index) => {
    slideIndex.value = index;
};
</script>

<style lang="scss" scoped>
.inactivePagination {
    background: rgba(255, 255, 255, 0.5);
}
</style>
