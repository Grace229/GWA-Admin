<template>
    <div>
        <div class="pt-[30px] pb-[40px] max-w-xl xl:max-w-full overflow-x-auto">
            <div v-if="loading"><SpinnerLoader class="mx-auto my-40 h-[50px] w-[50px]" /></div>
            <div v-else class="flex flex-col xl:flex-row gap-8">
                <!-- {{ pickedOrder }}ss -->
                <!-- {{ $route.params }} -->
                <!-- {{ orderState.accountInfo }} -->
                <!-- {{ orderState.customerDetails }} -->
                <div class="min-w-[499px]">
                    <div>
                        <Gallery v-if="orderState.fetchedOrderDetails.pictures" class="mb-[29px]" :car="orderState.fetchedOrderDetails" />
                    </div>
                    <div class="mt-[20px]">
                        <div class="detailsnfeatures mb-5 grid grid-cols-2 gap-8">
                            <div class="col-span-2 pt-[25px] pb-[38px]">
                                <h2 class="mb-[28px] font-semibold test-[18px] text-[#30374F]">Customer Details</h2>

                                <!-- <CarSpecs :specs="details" v-if="details?.brand" /> -->
                                <div class="">
                                    <!-- <div v-for="(detail, index) in details" :key="detail.id"> -->
                                    <div :class="[, 'pb-[15px] ']" class="flex items-center justify-between">
                                        <span class="font-medium text-sm text-[#4A5578]"> Name </span>

                                        <span class="font-semibold text-sm text-[#30374F]"> {{ orderState.customerDetails.firstName }} {{ orderState.customerDetails.lastName }}</span>
                                    </div>

                                    <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                        <span class="font-medium text-sm text-[#4A5578]"> Email </span>

                                        <span class="font-semibold text-sm text-[#30374F]"> {{ orderState.customerDetails.email }}</span>
                                    </div>
                                    <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                        <span class="font-medium text-sm text-[#4A5578]"> Phone Number</span>

                                        <span class="font-semibold text-sm text-[#30374F]"> {{ orderState.customerDetails.phoneCode }}{{ orderState.customerDetails.phoneNumber }} </span>
                                    </div>
                                    <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                        <span class="font-medium text-sm text-[#4A5578]"> Payment Method </span>

                                        <span class="font-semibold text-sm text-[#30374F]">
                                            {{
                                                orderState.accountInfo?.paymentInfo?.paymentMethod !== null && orderState.accountInfo?.paymentInfo?.paymentMethod !== undefined
                                                    ? Constants.paymentStatusEnum[orderState.accountInfo?.paymentInfo?.paymentMethod]
                                                    : ''
                                            }}</span
                                        >
                                    </div>
                                    <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                        <span class="font-medium text-sm text-[#4A5578]"> Account Number</span>

                                        <span class="font-semibold text-sm text-[#30374F]"> {{ orderState.accountInfo?.accountNo ? orderState.accountInfo?.accountNo : 'Nil' }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-1">
                    <VehicleInfo />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import VehicleInfo from './VehicleInfo.vue';
import Gallery from '@/views/admin/adminViews/reusable/AdminGallery.vue';
import { getVehicleById, getCustomer, getOrderDetails } from '@/services/AdminServices.js';
import { inject, computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Log, Constants } from '@/util';
import { useStore } from 'vuex';

onMounted(() => {
    getVehicle();
    fetchCustomer();
    fetchOrderDetails();
});
const store = useStore();

const route = useRoute();
const orderState = inject('orderState');
const refetchCount = inject('refetchCount');
const pickedOrder = computed(() => store.getters['admin/pickedOrder']);
const loading = ref(false);
const detailsLoading = ref(false);
const getVehicle = () => {
    loading.value = true;
    getVehicleById(
        route.params.vehicleId,
        (res) => {
            orderState.fetchedOrderDetails = res.data.data;
            loading.value = false;
        },
        (err) => {}
    );
};

const fetchCustomer = () => {
    detailsLoading.value = true;
    getCustomer(
        route.params.customerId,
        (res) => {
            orderState.customerDetails = res.data.data;
            detailsLoading.value = false;
        },
        (err) => {}
    );
};

const fetchOrderDetails = () => {
    getOrderDetails(
        route.params.orderId,
        (res) => {
            orderState.accountInfo = res.data.data;
        },
        (err) => {}
    );
};

watch(
    () => refetchCount.value,
    () => {
        getVehicle();
    }
);
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
