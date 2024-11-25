<template>
    <div>
        <!-- {{ pickedOrder?.orderStatus }} -->
        <div class="adminSearchNFilter mt-5 mb-[22px]">
            <div class="relative max-w-full sm:max-w-max min-w-[294px]">
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

            <!-- {{ $route.name }} -->
            <!-- {{ state.params.location }} -->

            <div class="flex gap-4">
                <ExportButton @click="exportToExcel" class="h-[44px]" />

                <OrdersFilter />
            </div>
        </div>

        <!-- //table -->
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
                            <table ref="tableRef" class="overflow-y-auto z-[9999] min-w-full divide-y divide-[#EAECF0]">
                                <thead class="bg-[#F9FAFB]">
                                    <tr>
                                        <th scope="col" class="py-3.5 pl-6 pr-3 text-left text-xs font-medium text-[#475467]">Order No</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Customer Name</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Subscription</th>

                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">AddOns</th>

                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Date</th>

                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Amount</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Payment Status</th>

                                        <!-- <th scope="col" class="relative py-3.5 pl-3 pr-6">
                                            <span class="sr-only">Menu</span>
                                        </th> -->
                                    </tr>
                                </thead>
                                                            <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="(order, index) in orders" :key="order.id" :class="[index + 1 === order.length ? 'border-none rounded-b-lg' : 'border-b border-[#EAECF0]']">
                                        <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-[#475467]">
                                            <!-- <div class="flex items-center gap-3"> -->
                                            <span>#{{ order.transactionRef }}</span>
                                            <!-- </div> -->
                                        </td>

                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">{{ order.userId.fullName }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">{{ order.product }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">{{ Constants.orderTypes[order.orderType] }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">
                                          {{ Util.dateFormat(order.createdAt) }}
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">{{ order.amount == 0 ? '0:00' : formatCurrency(order.amount) }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">
                                            <div v-if="order.status === 'success'" class="px-[10px py-[2px rounded-[16px] text-[#027A48] bg-[#ECFDF3] max-w-max">
                                                <span>Success</span>
                                            </div>
                                            <div v-if="order.status === 'pending'" class="px-[10px py-[2px] rounded-[16px] text-[#DC6803] bg-[#FEF0C7] max-w-max">
                                                <span>Pending</span>
                                            </div>

                                            <div v-if="order.status === 'notpaid'" class="px-[10px] py-[2px] rounded-[16px] text-[#DC6803] bg-[#FEF0C7] max-w-max">
                                                <span>Unpaid</span>
                                            </div>
                                        </td>
                                        <!-- <td class="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-xs font-normal text-[#475467]">
                                            <div>
                                                <RecentOrdersMenu @proceed="optionPrompt" :order="order" :menuType="'Orders Listing'" />
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
        <PositiveModal />
    </div>
</template>

<script setup>
import ExportButton from '@/components/reusable/ExportButton.vue';

import OrdersFilter from '@/views/admin/adminViews/adminOrders/OrdersFilter.vue';
import PaginationComponent from '@/components/reusable/PaginationComponent.vue';
import { Log, Constants, Util } from '@/util';
import { watchDebounced } from '@vueuse/core';
import RecentOrdersMenu from '@/views/admin/adminViews/reusable/RecentOrdersMenu.vue';
import { ref, computed, provide, reactive, onMounted, watch, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getAllOrders } from '@/services/AdminServices.js';
import PositiveModal from '@/views/admin/adminViews/reusable/PositiveModal.vue';
import { useStore } from 'vuex';
import XLSX from 'xlsx/dist/xlsx.full.min';

onMounted(() => {
    getOrders();
    setMenuOptionsBasedOnRole();
    // emptyPickedorder();
});
const store = useStore();
const role = store.getters['authToken/roles'][0];
const loading = ref(false);
const pickedOrder = computed(() => store.getters['admin/pickedOrder']);
const orders = ref([]);
const router = useRouter();
const menuOptions = ref(['View Order', 'Mark as Paid']);
const state = reactive({
    params: {
        descending: true,
        searchText: '',
        orderSort: 0,
        orderType: 10,
        location: '',
        pageNumber: 1,
        pageSize: 10,
        total: 0,
    },
});
const tableRef = ref(null);

const exportToExcel = () => {
    const table = tableRef.value;

    const worksheet = XLSX.utils.table_to_sheet(table);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

    XLSX.writeFile(workbook, 'table_data.xlsx');

    // const worksheet = XLSX.utils.table_to_sheet(table);
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

    // const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // const url = URL.createObjectURL(data);

    // const win = window.open();
    // win.location.href = url;
};

const setMenuOptionsBasedOnRole = () => {
    if (role === 'SuperAdmin') {
        menuOptions.value = ['View Order'];
    }
};

const formatCurrency = inject('formatCurrency');
const orderState = inject('orderState');
const isPositiveModalOpen = ref(false);
const route = useRoute();
const togglePositiveModal = () => {
    isPositiveModalOpen.value = !isPositiveModalOpen.value;
};

const positiveModalText = ref({
    title: '',
    description: '',
    buttonText: '',
});

const emptyPickedorder = () => {
    store.commit('admin/pickedOrder', null);
};

const optionPrompt = ({ menuItem, order }) => {
    const thisRoute = route;
    const option = menuItem;
    if (option === 'View Order') {
        //navigate to view order page
        store.commit('admin/pickedOrder', order);
        orderState.pickedOrder = order;
        router.push(`/admin/order/vehicle-details/${order.productId}/${order.id}/${order.buyerId}`);
    }

    if (option === 'Mark as Paid') {
        positiveModalText.value = {
            title: 'Mark as Paid',
            description: 'Can you verify that this order has been paid for?',
            buttonText: 'Yes, confirm',
            order: order,
            actionName: 'Mark Order As Paid',
            setPaymentStatus: () => {
                if (orderState?.pickedOrder?.paymentStatus) {
                    orderState.pickedOrder.paymentStatus = 1;
                }
            },
        };

        togglePositiveModal();
        return;
    }
};

const getOrders = () => {
    loading.value = true;
    getAllOrders(
        // state.params,
        (res) => {
            loading.value = false;
console.log(res.data.data.data)
            orders.value = res.data.data.data;
            state.params.total = res.data.data.total;
        },
        (err) => {
            loading.value = false;
        }
    );
};

watch(
    () => state.params.pageNumber,
    () => {
        getOrders();
    }
);

watch(
    () => state.params.location,
    () => {
        getOrders();
    }
);

watch(
    () => state.params.orderType,
    () => {
        getOrders();
    }
);

watch(
    () => state.params.pageSize,
    () => {
        getOrders();
    }
);

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
