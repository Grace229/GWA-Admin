<template>
    <div>
        <!-- <div class="flex justify-between mt-5 mb-[22px]">
            <div class="relative min-w-[294px]">
                <input
                    type="tel"
                    name="text"
                    id="phoneNo"
                    autocomplete="off"
                    placeholder="Search"
                    v-model="state.params.searchText"
                    class="pl-[48px] block w-full border-gray-300 focus:border-gray-400 rounded-lg shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                    aria-describedby="phoneNo-description"
                />

              

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

            </div>

            <div>
                <OrdersFilter />
            </div>
        </div> -->

        <!-- //table -->
        <div class="mb-10">
            <div class="pr-6 pt-3"><span class="font-semibold text-sm text-[#475467]">Recent Orders</span></div>

            <div class="mt-[25px] flow-root">
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

                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Amount</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Payment Status</th>

                                        <th scope="col" class="relative py-3.5 pl-3 pr-6">
                                            <span class="sr-only">Menu</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="(order, index) in orders" :key="order.id" :class="[index + 1 === order.length ? 'border-none rounded-b-lg' : 'border-b border-[#EAECF0]']">
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
                                                <div v-if="Constants.orderStatus[order.orderStatus] === 'approved'" class="px-[10px] py-[2px] rounded-[16px] text-[#027A48] bg-[#ECFDF3] max-w-max">
                                                    <span>Approved</span>
                                                </div>
                                                <div
                                                    v-if="Constants.orderStatus[order.orderStatus] === 'eligibilityApproved'"
                                                    class="px-[10px] py-[2px] rounded-[16px] text-[#175CD3 ] bg-[#EFF8FF] max-w-max"
                                                >
                                                    <span>Eligibility Approved</span>
                                                </div>

                                                <div v-if="Constants.orderStatus[order.orderStatus] === 'pending'" class="px-[10px] py-[2px] rounded-[16px] text-[#DC6803] bg-[#FEF0C7] max-w-max">
                                                    <span>Pending</span>
                                                </div>

                                                <div v-if="Constants.orderStatus[order.orderStatus] === 'rejected'" class="px-[10px] py-[2px] rounded-[16px] text-[#B42318] bg-[#FEF3F2] max-w-max">
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
                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">{{ order.amount == 0 ? '0:00' : formatCurrency(order.amount) }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">
                                            <div v-if="Constants.paymentStatus[order.paymentStatus] === 'paid'" class="px-[10px] py-[2px] rounded-[16px] text-[#027A48] bg-[#ECFDF3] max-w-max">
                                                <span>Paid</span>
                                            </div>
                                            <div v-if="Constants.paymentStatus[order.paymentStatus] === 'pending'" class="px-[10px] py-[2px] rounded-[16px] text-[#DC6803] bg-[#FEF0C7] max-w-max">
                                                <span>Pending</span>
                                            </div>

                                            <div v-if="Constants.paymentStatus[order.paymentStatus] === 'notpaid'" class="px-[10px] py-[2px] rounded-[16px] text-[#DC6803] bg-[#FEF0C7] max-w-max">
                                                <span>Unpaid</span>
                                            </div>
                                        </td>
                                        <td class="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-xs font-normal text-[#475467]">
                                            <div>
                                                <RecentOrdersMenu @proceed="optionPrompt" :order="order" :menuType="'Orders Listing'" />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- <PaginationComponent v-if="orders.length > 0" class="mt-2" /> -->
            </div>
        </div>
        <PositiveModal />
    </div>
</template>

<script setup>
// import OrdersFilter from '@/views/admin/adminViews/adminOrders/OrdersFilter.vue';
// import PaginationComponent from '@/components/reusable/PaginationComponent.vue';
import { Log, Constants, Util } from '@/util';
import { watchDebounced } from '@vueuse/core';
import RecentOrdersMenu from '@/views/admin/adminViews/reusable/RecentOrdersMenu.vue';
import { ref, provide, reactive, onMounted, watch, inject } from 'vue';
import { useRouter } from 'vue-router';
import { getAllOrders } from '@/services/AdminServices.js';
import PositiveModal from '@/views/admin/adminViews/reusable/PositiveModal.vue';
import { useStore } from 'vuex';

onMounted(() => {
    getOrders();
    setMenuOptionsBasedOnRole();
});
const store = useStore();
const role = store.getters['authToken/roles'][0];
const loading = ref(false);
const orders = ref([]);
const router = useRouter();
const state = reactive({
    params: {
        descending: true,
        searchText: '',
        orderSort: 0,
        orderType: 0,
        pageNumber: 1,
        pageSize: 8,
        total: 0,
    },
});
const menuOptions = ref(['View Order', 'Mark as Paid']);
const setMenuOptionsBasedOnRole = () => {
    if (role === 'SuperAdmin') {
        menuOptions.value = ['View Order'];
    }
};
const formatCurrency = inject('formatCurrency');
// const orderState = inject('orderState');
const isPositiveModalOpen = ref(false);

const togglePositiveModal = () => {
    isPositiveModalOpen.value = !isPositiveModalOpen.value;
};

const positiveModalText = ref({
    title: '',
    description: '',
    buttonText: '',
});

const optionPrompt = ({ menuItem, order }) => {
    const option = menuItem;
    if (option === 'View Order') {
        //navigate to view order page
        store.commit('admin/pickedOrder', order);
        // orderState.pickedOrder = order;
        router.push(`/admin/order/vehicle-details/${order.productId}/${order.id}/${order.buyerId}`);
    }

    if (option === 'Mark as Paid') {
        positiveModalText.value = {
            title: 'Mark as Paid',
            description: 'Can you verify that this order has been paid for?',
            buttonText: 'Yes, confirm',
            order: order,
        };

        togglePositiveModal();
        return;
    }
};

// const tData = ref([
//     { id: 1, orderNo: '#2345678', name: 'Arlene McCoy', product: 'Toyota Highlander', orderType: 'Car Loan', orderStatus: 'Approved', paymentStatus: 'paid', amount: 'N24,000,000' },
//     { id: 2, orderNo: '#2345679', name: 'Jacob Jones', product: 'Toyota Highlander', orderType: 'Lease', orderStatus: 'Rejected', paymentStatus: 'paid', amount: 'N24,000,000' },
//     { id: 3, orderNo: '#2345678', name: 'Arlene McCoy', product: 'Toyota Highlander', orderType: 'Car Loan', orderStatus: 'Approved', paymentStatus: 'paid', amount: 'N24,000,000' },
//     { id: 4, orderNo: '#2345679', name: 'Jacob Jones', product: 'Toyota Highlander', orderType: 'Lease', orderStatus: 'Approved', paymentStatus: 'unpaid', amount: 'N24,000,000' },
//     { id: 5, orderNo: '#2345678', name: 'Arlene McCoy', product: 'Toyota Highlander', orderType: 'Car Loan', orderStatus: 'Approved', paymentStatus: 'paid', amount: 'N24,000,000' },
//     { id: 6, orderNo: '#2345679', name: 'Jacob Jones', product: 'Toyota Highlander', orderType: 'Lease', orderStatus: 'Rejected', paymentStatus: 'unpaid', amount: 'N24,000,000' },
//  s]);

const getOrders = () => {
    loading.value = true;
    getAllOrders(
        state.params,
        (res) => {
            loading.value = false;

            orders.value = res.data.data;
            state.params.total = res.data.total;
        },
        (err) => {
            loading.value = false;
        }
    );
};

// watch(
//     () => state.params.pageNumber,
//     () => {
//         getOrders();
//     }
// );

// watch(
//     () => state.params.orderType,
//     () => {
//         getOrders();
//     }
// );

// watch(
//     () => state.params.pageSize,
//     () => {
//         getOrders();
//     }
// );

watchDebounced(
    () => state.params.searchText,
    () => {
        getOrders();
    },
    { debounce: 1000, maxWait: 1000 }
);

provide('menuOptions', menuOptions);
provide('isPositiveModalOpen', isPositiveModalOpen);
provide('togglePositiveModal', togglePositiveModal);
provide('positiveModalText', positiveModalText);
provide('searchParams', state.params);
provide('refetch', getOrders);
provide('state', state);
</script>

<style lang="scss" scoped>
.overflowVisible {
    overflow: visible;
}
</style>

<!-- <template>
    <div class="bg-[#FFFFFF] shadowStyle border border-[#EAECF0] rounded-lg mb-10">
        
        <div class="px-6 py-3"><span class="font-semibold text-sm text-[#475467]">Recent Orders</span></div>
        <div class="flow-root">
            <div class="overflow-x-auto">
                <div class="inline-block min-w-full pt-2 pb-1 align-middle">
                    <div class="overflow-hidden ring-black ring-opacity-5">
                        <table class="min-w-full divide-y divide-[#EAECF0] rounded-b-lg">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="py-3.5 pl-6 pr-3 text-left text-xs font-medium text-[#475467]">Order No</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Customer Name</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Product</th>

                                    <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Order Type</th>

                                    <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Order Status</th>

                                    <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Amount</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Payment Status</th>

                                    <th scope="col" class="relative py-3.5 pl-3 pr-6">
                                        <span class="sr-only">Menu</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white rounded-b-lg">
                                <tr v-for="(data, index) in tData" :key="data.id" :class="[index + 1 === tData.length ? 'border-none rounded-b-lg' : 'border-b border-[#EAECF0]']">
                                    <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-[#475467]">
                                        <span>{{ data.orderNo }}</span>
                                    </td>

                                    <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">{{ data.name }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">{{ data.product }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">{{ data.orderType }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">
                                        <div v-if="data.orderStatus === 'Approved'" class="px-[10px] py-[2px] rounded-[16px] text-[#027A48] bg-[#ECFDF3] max-w-max"><span>Approved</span></div>
                                        <div v-if="data.orderStatus === 'Rejected'" class="px-[10px] py-[2px] rounded-[16px] text-[#B42318] bg-[#FEF3F2] max-w-max"><span>Rejected</span></div>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">{{ data.amount }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">
                                        <div v-if="data.paymentStatus === 'paid'" class="px-[10px] py-[2px] rounded-[16px] text-[#027A48] bg-[#ECFDF3] max-w-max"><span>Approved</span></div>
                                        <div v-if="data.paymentStatus === 'unpaid'" class="px-[10px] py-[2px] rounded-[16px] text-[#DC6803] bg-[#FEF0C7] max-w-max"><span>Rejected</span></div>
                                    </td>
                                    <td class="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-xs font-normal text-[#475467]">
                                        <div>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M10.0001 10.8333C10.4603 10.8333 10.8334 10.4602 10.8334 9.99992C10.8334 9.53968 10.4603 9.16659 10.0001 9.16659C9.53984 9.16659 9.16675 9.53968 9.16675 9.99992C9.16675 10.4602 9.53984 10.8333 10.0001 10.8333Z"
                                                    stroke="#98A2B3"
                                                    stroke-width="1.66667"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M10.0001 4.99992C10.4603 4.99992 10.8334 4.62682 10.8334 4.16659C10.8334 3.70635 10.4603 3.33325 10.0001 3.33325C9.53984 3.33325 9.16675 3.70635 9.16675 4.16659C9.16675 4.62682 9.53984 4.99992 10.0001 4.99992Z"
                                                    stroke="#98A2B3"
                                                    stroke-width="1.66667"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M10.0001 16.6666C10.4603 16.6666 10.8334 16.2935 10.8334 15.8333C10.8334 15.373 10.4603 14.9999 10.0001 14.9999C9.53984 14.9999 9.16675 15.373 9.16675 15.8333C9.16675 16.2935 9.53984 16.6666 10.0001 16.6666Z"
                                                    stroke="#98A2B3"
                                                    stroke-width="1.66667"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const tData = ref([
    { id: 1, orderNo: '#2345678', name: 'Arlene McCoy', product: 'Toyota Highlander', orderType: 'Car Loan', orderStatus: 'Approved', paymentStatus: 'paid', amount: 'N24,000,000' },
    { id: 2, orderNo: '#2345679', name: 'Jacob Jones', product: 'Toyota Highlander', orderType: 'Lease', orderStatus: 'Rejected', paymentStatus: 'paid', amount: 'N24,000,000' },
    { id: 3, orderNo: '#2345678', name: 'Arlene McCoy', product: 'Toyota Highlander', orderType: 'Car Loan', orderStatus: 'Approved', paymentStatus: 'paid', amount: 'N24,000,000' },
    { id: 4, orderNo: '#2345679', name: 'Jacob Jones', product: 'Toyota Highlander', orderType: 'Lease', orderStatus: 'Approved', paymentStatus: 'unpaid', amount: 'N24,000,000' },
    { id: 5, orderNo: '#2345678', name: 'Arlene McCoy', product: 'Toyota Highlander', orderType: 'Car Loan', orderStatus: 'Approved', paymentStatus: 'paid', amount: 'N24,000,000' },
    { id: 6, orderNo: '#2345679', name: 'Jacob Jones', product: 'Toyota Highlander', orderType: 'Lease', orderStatus: 'Rejected', paymentStatus: 'unpaid', amount: 'N24,000,000' },
]);
</script>

<style lang="scss" scoped>
.shadowStyle {
    box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
}
</style> -->
