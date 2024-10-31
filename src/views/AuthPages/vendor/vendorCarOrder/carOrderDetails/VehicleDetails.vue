<template>
    <div>
        <div class="pt-[30px] pb-[40px] max-w-xl xl:max-w-full overflow-x-auto">
            <div v-if="vehicleLoading"><VehicleDetailsLoader class="" /></div>
            <div v-else class="flex flex-col xl:flex-row gap-8">
                <!-- {{ pickedOrder.id }}sss
                {{ orderId }} -->
                <!-- {{ $route.params }} -->
                <!-- {{ orderState.accountInfo }} -->
                <!-- {{ orderState.customerDetails }} -->
                <div class="md:min-w-[499px]">
                    <div>
                        <Gallery v-if="orderState.fetchedOrderDetails.pictures" class="mb-[29px]" :car="orderState.fetchedOrderDetails" />
                    </div>
                    <div v-if="orderState.customerDetails !== null" class="mt-[20px]">
                        <div class="detailsnfeatures mb-5 grid grid-cols-2 gap-8">
                            <div class="col-span-2 pt-[25px] pb-[38px]">
                                <h2 class="mb-[28px] font-semibold test-[18px] text-[#30374F]">Customer Details</h2>

                                <div class="">
                                    <div :class="[, 'pb-[15px] ']" class="flex items-center justify-between">
                                        <span class="font-medium text-sm text-[#4A5578]"> Name </span>
                                        <div class="ml-4">
                                            <span class="font-semibold text-sm text-[#30374F]"> {{ orderState.customerDetails.firstName }} {{ orderState.customerDetails.lastName }}</span>
                                        </div>
                                    </div>

                                    <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                        <span class="font-medium text-sm text-[#4A5578]"> Email </span>

                                        <div class="ml-4">
                                            <span class="font-semibold text-sm text-[#30374F]"> {{ orderState.customerDetails.email }} </span>
                                        </div>
                                    </div>
                                    <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                        <span class="font-medium text-sm text-[#4A5578]"> Phone Number</span>
                                        <div class="ml-4">
                                            <span class="font-semibold text-sm text-[#30374F]"> {{ orderState.customerDetails.phoneCode }}{{ orderState.customerDetails.phoneNumber }} </span>
                                        </div>
                                    </div>
                                    <!-- <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                        <span class="font-medium text-sm text-[#4A5578]"> Payment Method </span>

                                        <span class="font-semibold text-sm text-[#30374F]">
                                            {{ orderState.accountInfo?.paymentInfo?.paymentMethod ? Constants.paymentStatusEnum[orderState.accountInfo?.paymentInfo?.paymentMethod] : '' }}</span
                                        >
                                    </div>
                                    <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                        <span class="font-medium text-sm text-[#4A5578]"> Account Number</span>

                                        <span class="font-semibold text-sm text-[#30374F]"> {{ orderState.accountInfo?.accountNo ? orderState.accountInfo?.accountNo : 'Nil' }}</span>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-1">
                    <CarInfo />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import VehicleDetailsLoader from '@/components/reusable/VehicleDetailsLoader.vue';
import CarInfo from './CarInfo.vue';
import Gallery from './Gallery.vue';
import { getVehicle } from '@/services/VendorServices.js';
import { getOrderDetails } from '@/services/OrderServices.js';
import { inject, provide, computed, onMounted, onBeforeMount, ref, reactive, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Log, Constants } from '@/util';
import { getCustomer } from '@/services/AdminServices.js';
import { useStore } from 'vuex';

onMounted(() => {
    fetchVehicle();
    fetchCustomer();
    fetchOrderDetails();
});
onBeforeMount(() => {
    redirectOnNoData();
});

onUnmounted(() => {
    emptyPickedorder();
});
const router = useRouter();
const store = useStore();
const route = useRoute();
const orderId = computed(() => route.params.orderId);
const customerId = computed(() => route.params.customerId);
const vehicleId = computed(() => route.params.vehicleId);
const pickedOrder = computed(() => store.getters['vendor/pickedOrder']);

const orderState = reactive({
    fetchedOrderDetails: {},
    customerDetails: null,
});
const orderLoading = ref(false);
const vehicleLoading = ref(false);
const customerLoading = ref(false);

const emptyPickedorder = () => {
    store.commit('vendor/pickedOrder', null);
};

const redirectOnNoData = () => {
    if (pickedOrder.value === null || pickedOrder.value.id !== orderId.value) {
        router.push('/ordered-cars');
    }
};

const fetchVehicle = () => {
    //api call for fetching vehicle
    //api call for fetching order
    vehicleLoading.value = true;
    getVehicle(
        vehicleId.value,
        (res) => {
            orderState.fetchedOrderDetails = res.data.data;
            vehicleLoading.value = false;
        },
        (err) => {}
    );
};

const fetchCustomer = () => {
    //api call for fetching customer
    customerLoading.value = true;
    getCustomer(
        route.params.customerId,
        (res) => {
            orderState.customerDetails = res.data.data;
            customerLoading.value = false;
        },
        (err) => {}
    );
};

const fetchOrderDetails = () => {
    //api call for fetching order
    // orderLoading.value = true;
    getOrderDetails(
        {
            orderId: orderId.value,
        },
        (res) => {
            // orderState.fetchedOrderDetails = res.data.data;
            // orderLoading.value = false;
        },
        (err) => {}
    );
};

provide('orderState', orderState);
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
