<template>
    <div>
        <SettingsPlate header="Car Order" description="View list of ordered vehicles">
            <template v-slot:body>
                <div class="flex flex-col gap-6">
                    <div class="max-h-max">
                        <div class="relative min-w-[294px]">
                            <input
                                type="tel"
                                name="text"
                                id="phoneNo"
                                autocomplete="off"
                                placeholder="Search"
                                v-model="state.params.searchText"
                                class="pl-[48px] block w-full max-w-[294px] border-gray-300 focus:border-gray-400 rounded-lg shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                aria-describedby="phoneNo-description"
                            />

                            <!-- --------- -->

                            <div class="w-[40px] pl-4 absolute inset-y-0 left-0 flex items-center cursor-pointer">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                                        stroke="#667085"
                                        stroke-width="1.66667"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </div>

                            <!-- --------- -->
                        </div>
                    </div>

                    <div class="mb-10">
                        <div class="mt-8 flow-root">
                            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <div v-if="orders.length === 0 && loading">
                                        <SpinnerLoader class="mx-auto my-40 h-[50px] w-[50px]" />
                                    </div>
                                    <div v-else-if="orders.length === 0 && !loading" class="py-40 w-full bg-white flex flex-col items-center justify-center">
                                        <!-- <div>
                                <TransactionHistoryEmptySvg />
                            </div> -->
                                        <span style="color: #999999" class="mt-6 fs-16 fw-400">Nothing to see</span>
                                    </div>
                                    <div v-else class="overflow-auto shadow-[0px_1px_2px_rgba(16,24,40,0.05)] ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                        <table class="overflow-y-auto z-[9999] min-w-full divide-y divide-[#EAECF0]">
                                            <thead class="bg-[#F9FAFB]">
                                                <tr>
                                                    <th scope="col" class="py-3.5 pl-6 pr-3 text-left text-xs font-medium text-[#475467]">Order No</th>
                                                    <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Customer Name</th>
                                                    <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Product</th>

                                                    <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Order Type</th>

                                                    <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Order Status</th>

                                                    <!-- <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Amount</th> -->
                                                    <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Payment Status</th>

                                                    <!-- <th scope="col" class="relative py-3.5 pl-3 pr-6">
                                            <span class="sr-only">Menu</span>
                                        </th> -->
                                                </tr>
                                            </thead>
                                            <tbody class="divide-y divide-gray-200 bg-white">
                                                <tr
                                                    @click="viewOrderDetails(order, order.id, order.buyerId, order.productId)"
                                                    v-for="(order, index) in orders"
                                                    :key="order.id"
                                                    class="cursor-pointer"
                                                    :class="[index + 1 === order.length ? 'border-none rounded-b-lg' : 'border-b border-[#EAECF0]']"
                                                >
                                                    <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-[#475467]">
                                                        <!-- <div class="flex items-center gap-3"> -->
                                                        <span>#{{ order.orderNo }}</span>
                                                        <!-- </div> -->
                                                    </td>

                                                    <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">{{ order.customerName }}</td>
                                                    <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">{{ order.product }}</td>
                                                    <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">{{ Constants.orderTypes[order.orderType] }}</td>
                                                    <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">
                                                        <div class="flex">
                                                            <div
                                                                v-if="Constants.orderStatus[order.orderStatus] === 'approved'"
                                                                class="px-[10px] py-[2px] rounded-[16px] text-[#027A48] bg-[#ECFDF3] max-w-max"
                                                            >
                                                                <span>Approved</span>
                                                            </div>
                                                            <div
                                                                v-if="Constants.orderStatus[order.orderStatus] === 'eligibilityApproved'"
                                                                class="px-[10px] py-[2px] rounded-[16px] text-[#175CD3 ] bg-[#EFF8FF] max-w-max"
                                                            >
                                                                <span>Eligibility Approved</span>
                                                            </div>

                                                            <div
                                                                v-if="Constants.orderStatus[order.orderStatus] === 'pending'"
                                                                class="px-[10px] py-[2px] rounded-[16px] text-[#DC6803] bg-[#FEF0C7] max-w-max"
                                                            >
                                                                <span>Pending</span>
                                                            </div>

                                                            <div
                                                                v-if="Constants.orderStatus[order.orderStatus] === 'rejected'"
                                                                class="px-[10px] py-[2px] rounded-[16px] text-[#B42318] bg-[#FEF3F2] max-w-max"
                                                            >
                                                                <span>Rejected</span>
                                                            </div>
                                                            <div
                                                                v-if="Constants.orderStatus[order.orderStatus] === 'eligibilityRejected'"
                                                                class="px-[10px] py-[2px] rounded-[16px] text-[#B42318] bg-[#FEF3F2] max-w-max"
                                                            >
                                                                <span>Eligibility Rejected</span>
                                                            </div>

                                                            <div
                                                                class="ml-2 px-[10px] py-[2px] rounded-[16px] text-[#344054] bg-[#F2F4F7] max-w-max"
                                                                v-if="order.inspected && Constants.deliveryStatus[order.deliveryStatus] !== 'delivered'"
                                                            >
                                                                <span>Inspected</span>
                                                            </div>
                                                            <!-- {{ Constants.deliveryStatus[order.deliveryStatus] }} -->
                                                            <div
                                                                class="ml-2 px-[10px] py-[2px] rounded-[16px] text-[#027A48] bg-[#ECFDF3] max-w-max"
                                                                v-if="Constants.deliveryStatus[order.deliveryStatus] === 'delivered'"
                                                            >
                                                                <span>Delivered</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <!-- <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">{{ order.amount == 0 ? '0:00' : formatCurrency(order.amount) }}</td> -->
                                                    <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">
                                                        <div
                                                            v-if="Constants.paymentStatus[order.paymentStatus] === 'paid'"
                                                            class="px-[10px] py-[2px] rounded-[16px] text-[#027A48] bg-[#ECFDF3] max-w-max"
                                                        >
                                                            <span>Paid</span>
                                                        </div>
                                                        <div
                                                            v-if="Constants.paymentStatus[order.paymentStatus] === 'pending'"
                                                            class="px-[10px] py-[2px] rounded-[16px] text-[#DC6803] bg-[#FEF0C7] max-w-max"
                                                        >
                                                            <span>Pending</span>
                                                        </div>

                                                        <div
                                                            v-if="Constants.paymentStatus[order.paymentStatus] === 'notpaid'"
                                                            class="px-[10px] py-[2px] rounded-[16px] text-[#DC6803] bg-[#FEF0C7] max-w-max"
                                                        >
                                                            <span>Unpaid</span>
                                                        </div>
                                                    </td>
                                                    <!-- <td class="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-xs font-normal text-[#475467]">
                                            <div>
                                                <RecentOrdersMenu @proceed="optionPrompt" :order="order" />
                                            </div>
                                        </td> -->
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <PaginationComponent v-if="orders.length > 0" class="mt-2" />
                        </div>
                    </div>
                </div>
            </template>
        </SettingsPlate>
    </div>
</template>

<script setup>
import SettingsPlate from '@/components/reusable/SettingsPlate.vue';
import PaginationComponent from '@/components/reusable/PaginationComponent.vue';
import { getOrderedCars } from '@/services/VendorServices.js';
import { onMounted, ref, reactive, watchEffect, watch, provide, inject } from 'vue';
import { Log, Util, Constants } from '@/util';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
onMounted(() => {
    fetchOrderCars();
});
const store = useStore();
const router = useRouter();
const route = useRoute();
const orders = ref([]);
const loading = ref(false);
const state = reactive({
    params: {
        userId: store.getters['authToken/userId'],
        descending: true,
        searchText: '',
        orderType: 10,
        pageNumber: 1,
        pageSize: 10,
        total: 0,
    },
});
const formatCurrency = inject('formatCurrency');

const fetchOrderCars = () => {
    loading.value = true;
    getOrderedCars(
        state.params,
        (res) => {
            loading.value = false;

            state.params.total = res.data.total;
            if (res.data.data.length > 0) {
                orders.value = res.data.data;
            }
        },
        (err) => {
            loading.value = false;
        }
    );
};

const viewOrderDetails = (order, orderId, customerId, vehicleId) => {
    //route to the viewOrderDetails(order.id, order.buyerId) page
    router.push(`/ordered-cars/details/${orderId}/${customerId}/${vehicleId}`);
    //use id strings to fetch data and then display

    store.commit('vendor/pickedOrder', order);
};

watch(
    () => state.params.pageNumber,
    () => {
        fetchOrderCars();
    },
    { deep: true }
);

provide('searchParams', state.params);
</script>

<style lang="scss" scoped></style>
