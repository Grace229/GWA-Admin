<template>
    <div class="flex flex-col gap-[30px] min-w-[230px]">
        <div class="w-full flex flex-col pt-[25px] pb-[31px] px-4 bg-[#F9F9FB] border border-[#DCDFEA] rounded-[5px]">
            <!-- <button class="max-w-max bg-[#4E5BA6] text-[#FFFFFF] rounded-[3px] py-[5px] px-[8px] font-medium text-xs mb-[18px]">Draft</button> -->
            <div v-if="Constants.vehicleStatus[car.status] === 'Draft'" class="bg-[#4A5578] text-[#FFFFFF] rounded-[3px] py-[5px] px-[8px] max-w-max">Draft</div>
            <div v-if="Constants.vehicleStatus[car.status] === 'Published'" class="bg-[#12B76A] text-[#FFFFFF] rounded-[3px] py-[5px] px-[8px] max-w-max">Published</div>
            <div v-if="Constants.vehicleStatus[car.status] === 'Rejected'" class="bg-[#F0203D] text-[#FFFFFF] rounded-[3px] py-[5px] px-[8px] max-w-max">Rejected</div>

            <div v-if="Constants.vehicleStatus[car.status] === 'Pending'" class="bg-[#4E5BA6] text-[#FFFFFF] rounded-[3px] py-[5px] px-[8px] max-w-max">Pending Review</div>

            <div class="mb-[14px] flex flex-col font-normal text-sm text-[#4A5578] gap-[19px] mt-[18px]">
                <span class="flex items-center gap-1"
                    ><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.99967 1.33398V3.00065M7.99967 1.33398C4.31778 1.33398 1.33301 4.31875 1.33301 8.00065M7.99967 1.33398C11.6816 1.33398 14.6663 4.31875 14.6663 8.00065M7.99967 13.0007V14.6673M7.99967 14.6673C11.6816 14.6673 14.6663 11.6826 14.6663 8.00065M7.99967 14.6673C4.31778 14.6673 1.33301 11.6826 1.33301 8.00065M2.99967 8.00065H1.33301M14.6663 8.00065H12.9997M12.7186 12.7196L11.5361 11.5371M3.28076 12.7196L4.46444 11.5359M3.28076 3.33398L4.4384 4.49162M12.7186 3.33398L8.99961 7.00065M9.33301 8.00065C9.33301 8.73703 8.73605 9.33398 7.99967 9.33398C7.2633 9.33398 6.66634 8.73703 6.66634 8.00065C6.66634 7.26427 7.2633 6.66732 7.99967 6.66732C8.73605 6.66732 9.33301 7.26427 9.33301 8.00065Z"
                            stroke="#4A5578"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                    <!-- {{ car.mileage }}  -->
                    {{ car.mileage == 0 ? '0.00' : formatCurrency(car.mileage).slice(1, car.mileage) }}

                    miles</span
                >

                <span class="flex items-center gap-1"
                    ><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2.5 9C2.5 8.44688 2.94781 8 3.5 8C4.05312 8 4.5 8.44688 4.5 9C4.5 9.55313 4.05312 10 3.5 10C2.94781 10 2.5 9.55313 2.5 9ZM13.5 9C13.5 9.55313 13.0531 10 12.5 10C11.9469 10 11.5 9.55313 11.5 9C11.5 8.44688 11.9469 8 12.5 8C13.0531 8 13.5 8.44688 13.5 9ZM1.50312 5.9L2.57344 2.84156C2.95937 1.73844 4 1 5.16875 1H10.8313C11.9719 1 13.0406 1.73844 13.4281 2.84156L14.4969 5.9C15.3938 6.41875 16 7.3875 16 8.5V14.25C16 14.6656 15.6656 15 15.25 15C14.8344 15 14.5 14.6656 14.5 14.25V12.5H1.5V14.25C1.5 14.6656 1.16406 15 0.75 15C0.335938 15 0 14.6656 0 14.25V8.5C0 7.3875 0.604687 6.41875 1.50312 5.9ZM3.23125 5.5H12.7688L12.0094 3.3375C11.8344 2.83563 11.3625 2.5 10.8313 2.5H5.16875C4.6375 2.5 4.16563 2.83563 3.99062 3.3375L3.23125 5.5ZM13 7H3C2.17156 7 1.5 7.67188 1.5 8.5V11H14.5V8.5C14.5 7.67188 13.8281 7 13 7Z"
                            fill="#4A5578"
                        />
                    </svg>

                    {{ car.condition }}</span
                >
                <span class="flex items-center gap-1"
                    ><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.00033 8.66732C9.10489 8.66732 10.0003 7.77189 10.0003 6.66732C10.0003 5.56275 9.10489 4.66732 8.00033 4.66732C6.89576 4.66732 6.00033 5.56275 6.00033 6.66732C6.00033 7.77189 6.89576 8.66732 8.00033 8.66732Z"
                            stroke="#4A5578"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M8.00033 14.6673C10.667 12.0007 13.3337 9.61284 13.3337 6.66732C13.3337 3.7218 10.9458 1.33398 8.00033 1.33398C5.05481 1.33398 2.66699 3.7218 2.66699 6.66732C2.66699 9.61284 5.33366 12.0007 8.00033 14.6673Z"
                            stroke="#4A5578"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                    {{ car.location }}</span
                >
            </div>
            <h1 class="font-bold text-[24px] text-[#4A5578]">{{ formatCurrency(car.price) }}</h1>
        </div>
    </div>
</template>

<script setup>
// import { } from 'vue';
import { Constants } from '@/util';
import { inject } from 'vue';
// import { useRoute, useRouter } from 'vue-router';
const car = inject('car');
const formatCurrency = inject('formatCurrency');
</script>

<style lang="scss" scoped></style>
