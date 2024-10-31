<template>
    <div>
        <div class="flex flex-col gap-[18px] border-b border-[#EAECF0] pb-[19px]">
            <div class="flex gap-[13px]">
                <span class="text-[#1D2939] font-semibold text-sm">Order No: {{ pickedOrder?.orderNo }}</span>
                <div v-if="Constants.orderStatus[Number(pickedOrder?.orderStatus)] == 'pending'" class="px-[10px] py-[2px] rounded-[16px] text-[#DC6803] bg-[#FEF0C7] text-sm font-medium max-w-max">
                    <span>Pending Approval</span>
                </div>

                <div v-if="Constants.orderStatus[Number(pickedOrder?.orderStatus)] == 'approved'" class="px-[10px] py-[2px] rounded-[16px] text-[#027A48] bg-[#ECFDF3] text-sm font-medium max-w-max">
                    <span>Approved</span>
                </div>

                <div
                    v-if="Constants.orderStatus[Number(pickedOrder?.orderStatus)] == 'eligibilityApproved'"
                    class="px-[10px] py-[2px] rounded-[16px] text-[#175CD3 ] bg-[#EFF8FF] text-sm font-medium max-w-max"
                >
                    <span>Eligibility Approved</span>
                </div>

                <div v-if="Constants.orderStatus[Number(pickedOrder?.orderStatus)] == 'rejected'" class="px-[10px] py-[2px] rounded-[16px] text-[#B42318] bg-[#FEF3F2] text-sm font-medium max-w-max">
                    <span>Rejected</span>
                </div>

                <div
                    v-if="Constants.orderStatus[Number(pickedOrder?.orderStatus)] == 'eligibilityRejected'"
                    class="px-[10px] py-[2px] rounded-[16px] text-[#B42318] bg-[#FEF3F2] text-sm font-medium max-w-max"
                >
                    <span>Eligibility Rejected</span>
                </div>
            </div>

            <h1 class="text-[#30374F] text-[24px] font-semibold">{{ orderState.fetchedOrderDetails.year }} {{ orderState.fetchedOrderDetails.brand }} {{ orderState.fetchedOrderDetails.model }}</h1>

            <div class="mb-[5px] flex flex-col sm:flex-row font-medium text-sm text-[#4A5578] gap-[19px]">
                <span class="flex items-center gap-1"
                    ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 2V4.5M12 2C6.47715 2 2 6.47715 2 12M12 2C17.5228 2 22 6.47715 22 12M12 19.5V22M12 22C17.5228 22 22 17.5228 22 12M12 22C6.47715 22 2 17.5228 2 12M4.5 12H2M22 12H19.5M19.0784 19.0784L17.3047 17.3047M4.92163 19.0784L6.69715 17.3029M4.92163 5L6.65808 6.73645M19.0784 5L13.4999 10.5M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
                            stroke="#4A5578"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                    <!-- {{  }} -->

                    {{ orderState.fetchedOrderDetails.mileage == 0 ? '0.00' : formatCurrency(orderState.fetchedOrderDetails.mileage).slice(1, orderState.fetchedOrderDetails.mileage) }}
                    miles</span
                >

                <span class="flex items-center gap-1"
                    ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3.75 13.5C3.75 12.6703 4.42172 12 5.25 12C6.07969 12 6.75 12.6703 6.75 13.5C6.75 14.3297 6.07969 15 5.25 15C4.42172 15 3.75 14.3297 3.75 13.5ZM20.25 13.5C20.25 14.3297 19.5797 15 18.75 15C17.9203 15 17.25 14.3297 17.25 13.5C17.25 12.6703 17.9203 12 18.75 12C19.5797 12 20.25 12.6703 20.25 13.5ZM2.25469 8.85L3.86016 4.26234C4.43906 2.60766 6 1.5 7.75312 1.5H16.2469C17.9578 1.5 19.5609 2.60766 20.1422 4.26234L21.7453 8.85C23.0906 9.62813 24 11.0813 24 12.75V21.375C24 21.9984 23.4984 22.5 22.875 22.5C22.2516 22.5 21.75 21.9984 21.75 21.375V18.75H2.25V21.375C2.25 21.9984 1.74609 22.5 1.125 22.5C0.503906 22.5 0 21.9984 0 21.375V12.75C0 11.0813 0.907031 9.62813 2.25469 8.85ZM4.84688 8.25H19.1531L18.0141 5.00625C17.7516 4.25344 17.0438 3.75 16.2469 3.75H7.75312C6.95625 3.75 6.24844 4.25344 5.98594 5.00625L4.84688 8.25ZM19.5 10.5H4.5C3.25734 10.5 2.25 11.5078 2.25 12.75V16.5H21.75V12.75C21.75 11.5078 20.7422 10.5 19.5 10.5Z"
                            fill="#4A5578"
                        />
                    </svg>

                    {{ orderState.fetchedOrderDetails.condition }}</span
                >
                <span class="flex items-center gap-1"
                    ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                            stroke="#4A5578"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z"
                            stroke="#4A5578"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                    {{ orderState.fetchedOrderDetails.location }}</span
                >
            </div>
            <h1 class="text-[#1D2939] text-[24px] font-bold mt-[9px]">{{ formatCurrency(orderState.fetchedOrderDetails.price) }}</h1>
        </div>
        <h1 class="text-[#30374F] text-[18px] font-semibold mt-[21px]">Description</h1>
        <p class="text-[#4A5578] text-sm font-normal mt-[9px]">
            {{ orderState.fetchedOrderDetails.description }}
        </p>

        <div class="mt-[20px]">
            <div class="detailsnfeatures mb-5 grid grid-cols-2 gap-8">
                <div class="col-span-2 pt-[25px] pb-[38px]">
                    <h2 class="mb-[28px] font-semibold test-[18px] text-[#30374F]">Car Details</h2>

                    <!-- <CarSpecs :specs="details" v-if="details?.brand" /> -->
                    <div class="capitalize">
                        <!-- <div v-for="(detail, index) in details" :key="detail.id"> -->
                        <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                            <span class="font-medium text-sm text-[#4A5578]"> Car Brand </span>

                            <span class="font-semibold text-sm text-[#30374F]"> {{ orderState.fetchedOrderDetails.brand }} </span>
                        </div>

                        <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                            <span class="font-medium text-sm text-[#4A5578]"> Model </span>

                            <span class="font-semibold text-sm text-[#30374F]"> {{ orderState.fetchedOrderDetails.model }} </span>
                        </div>
                        <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                            <span class="font-medium text-sm text-[#4A5578]"> Year </span>

                            <span class="font-semibold text-sm text-[#30374F]"> {{ orderState.fetchedOrderDetails.year }} </span>
                        </div>
                        <div
                            v-for="data in orderState?.fetchedOrderDetails?.vehicleDetails?.vehicleParameters"
                            :key="data.id"
                            :class="['border-t border-[#DCDFEA]', 'py-[15px] ']"
                            class="flex items-center justify-between"
                        >
                            <span class="font-medium text-sm text-[#4A5578]"> {{ data.parameter }} </span>

                            <span class="font-semibold text-sm text-[#30374F]"> {{ data.value }} </span>
                        </div>
                        <!-- <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                            <span class="font-medium text-sm text-[#4A5578]"> Body Color</span>

                            <span class="font-semibold text-sm text-[#30374F]"> Red </span>
                        </div>
                        <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                            <span class="font-medium text-sm text-[#4A5578]"> Fuel Type </span>

                            <span class="font-semibold text-sm text-[#30374F]"> Petrol </span>
                        </div>
                        <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                            <span class="font-medium text-sm text-[#4A5578]"> Engine </span>

                            <span class="font-semibold text-sm text-[#30374F]"> 3.5L V6 Engine </span>
                        </div>
                       
                        <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                            <span class="font-medium text-sm text-[#4A5578]"> Interior </span>

                            <span class="font-semibold text-sm text-[#30374F]"> Black </span>
                        </div> -->
                        <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                            <span class="font-medium text-sm text-[#4A5578]"> Transmission </span>

                            <span class="font-semibold text-sm text-[#30374F]"> {{ orderState.fetchedOrderDetails.transmissionTypeText }} </span>
                        </div>
                        <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                            <span class="font-medium text-sm text-[#4A5578]"> Vehicle Id </span>

                            <span class="font-semibold text-sm text-[#30374F]"> {{ orderState.fetchedOrderDetails.id }} </span>
                        </div>
                        <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                            <span class="font-medium text-sm text-[#4A5578]"> VIN </span>

                            <span class="font-semibold text-sm text-[#30374F]"> {{ orderState.fetchedOrderDetails.vin }} </span>
                        </div>
                        <!-- </div> -->
                    </div>
                </div>
            </div>
        </div>

        <div class="mb-5 detailsnfeatures pt-5 pb-[31px]">
            <h2 class="mb-[24px] font-semibold test-[18px] text-[#30374F]">Car Features</h2>

            <div v-if="orderState?.fetchedOrderDetails?.vehicleDetails?.features" class="flex flex-wrap gap-[15px]">
                <div v-for="feature in orderState?.fetchedOrderDetails?.vehicleDetails?.features" :key="feature.id" class="flex items-center justify-between">
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_785_68512)">
                                <path d="M8 0C3.58862 0 0 3.58862 0 8C0 12.4114 3.58862 16 8 16C12.4114 16 16 12.4114 16 8C16 3.58862 12.4114 0 8 0Z" fill="#4A5578" />
                                <path
                                    d="M12.0542 6.3042L7.72083 10.6375C7.59082 10.7675 7.42017 10.8329 7.24951 10.8329C7.07886 10.8329 6.9082 10.7675 6.7782 10.6375L4.61157 8.47083C4.35083 8.21021 4.35083 7.78882 4.61157 7.5282C4.87219 7.26746 5.29346 7.26746 5.5542 7.5282L7.24951 9.22351L11.1116 5.36157C11.3722 5.10083 11.7935 5.10083 12.0542 5.36157C12.3148 5.62219 12.3148 6.04346 12.0542 6.3042Z"
                                    fill="#FAFAFA"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_785_68512">
                                    <rect width="16" height="16" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <span class="ml-[5px] font-medium text-xs text-[#4A5578]">{{ feature.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Constants } from '@/util';
import { useStore } from 'vuex';

const store = useStore();

const router = useRouter();
const orderState = inject('orderState');
const formatCurrency = inject('formatCurrency');
const pickedOrder = computed(() => store.getters['vendor/pickedOrder']);

// const features = [
//     {
//         id: 1,
//         name: 'Air bags',
//     },
//     {
//         id: 2,
//         name: 'Alloy Wheels',
//     },
// ];

const redirectOnNoData = () => {
    // check if there is no picked order then redirect to orders list for selection
    if (!pickedOrder.value?.id) {
        router.push('/admin/orders');
    }
};
</script>

<style lang="scss" scoped>
.detailsnfeatures {
    background: #f9f9fb;
    /* Gray cool / 100 */

    border: 1px solid #eff1f5;
    border-radius: 5px;
    padding-left: 25px;
    padding-right: 25px;
}
</style>
