<template>
    <div class="rounded-lg shadow-md bg-[#ffffff]">
        <div class="relative min-h-[100px]">

           <img v-if="car.image?.imageValue" :src="car.image?.imageValue" class=" h-40 w-full" alt="" srcset="">
       
        </div>
        <div class="cursor-pointer flex flex-col gap-3 pt-[21px] px-[19px] bg-[#ffffff]">
            <div class="flex items-center justify-between font-medium text-xs">
                <!-- <button v-if="car.locallyUsed" class="bg-[#DC6803] text-[#FFFFFF] rounded-[3px] py-[5px] px-[8px]">Locally Used</button>
                <button v-else class="bg-[#5D6B98] text-[#FFFFFF] rounded-[3px] py-[5px] px-[8px]">Foreign Used</button> -->
                <h2 class="font-semibold text-sm text-[#30374F]">{{ car.name }} ({{ car.services.join(", ") }})</h2>
                <!-- {{ car.financeOptionText }} -->

                <!-- <div><Heart :carDetails="car" /></div> -->
            </div>
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
                    {{  formatCurrency(car.price) }}
                </span>
    
            </div>
            <!-- <h1 class="font-bold text-xl text-[#30374F]">{{ formatCurrency(car.price) }}</h1> -->
        </div>
        <div @click.self="navigateToPreview(car.financeOptionText, car.id)" class="pb-[19px] px-[19px]">
            <p v-if="car.deal" class="mt-[5px] text-xs font-semibold text-[#FF6600]"> carjj.deal</p>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Heart from '/src/components/reusable/Heart.vue';
import { ref, inject } from 'vue';
import CarouselPrev from '/src/components/reusable/CarouselPrev.vue';
import CarouselNext from '/src/components/reusable/CarouselNext.vue';
import { useRouter } from 'vue-router';
import 'vue3-carousel/dist/carousel.css';
import {
    Carousel,
    Slide,
    // Pagination,
    Navigation,
} from 'vue3-carousel';

// const props = defineProps(['car']);
const formatCurrency = inject('formatCurrency');
const props = defineProps({
    car: Object,
    link: {
        default: '/details',
    },
});
const router = useRouter();
const slideIndex = ref(0);
const changeView = (index) => {
    slideIndex.value = index;
};

const navigateToPreview = (finnanceType, carId) => {
    if (finnanceType === 'Buy') {
        router.push(`/buy_car/${carId}`);
    }
    if (finnanceType === 'Rent') {
        router.push(`/rent_car/${carId}`);
    }
    if (finnanceType === 'Lease') {
        router.push(`/lease_car/${carId}`);
    }
};
</script>

<style lang="scss" scoped>
.inactivePagination {
    background: rgba(255, 255, 255, 0.5);
}

.image {
    width: 400px; /* set the width to a fixed value */
    height: calc(400 * 0.75); /* calculate the height based on the desired aspect ratio of 3:4 */
}
</style>
