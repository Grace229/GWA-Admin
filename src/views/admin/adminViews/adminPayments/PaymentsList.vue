<template>
    <div>
        <div class="flex flex-col mt-2">
            <h1 class="text-sm font-semibold text-[#475467] mb-[17px]">Generate Payment Reports</h1>

            <div class="generator">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 py-[30px] px-[16px] max-w-[1200px]">
                    <div class="col-span-1">
                        <!-- <label for="from" class="block text-sm font-medium text-[#344054]">From</label> -->
                        <div class="">
                            <v-date-picker v-model="fromDate" :model-config="modelConfig">
                                <template v-slot="{ inputValue, inputEvents }">
                                    <div class="flex items-center">
                                        <input
                                            id="from"
                                            name="from"
                                            autocomplete="off"
                                            placeholder="From"
                                            :value="inputValue"
                                            v-on="inputEvents"
                                            class="h-[44px] grey-8 fs-14 fw-400 relative br-8 appearance-none block w-full px-3 py-3 rounded-md border border-gray-200 focus:outline-none sm:text-sm"
                                        />

                                        <i class="fa fa-calendar text-sm absolute right-3 text-[#666]" aria-hidden="true"></i>
                                    </div>
                                </template>
                            </v-date-picker>
                        </div>
                    </div>
                    <div class="col-span-1">
                        <!-- <label for="to" class="block text-sm font-medium text-[#344054]">To</label> -->
                        <div class="">
                            <v-date-picker v-model="toDate" :model-config="modelConfig">
                                <template v-slot="{ inputValue, inputEvents }">
                                    <div class="flex items-center relative">
                                        <input
                                            id="to"
                                            name="to"
                                            placeholder="To"
                                            autocomplete="off"
                                            :value="inputValue"
                                            v-on="inputEvents"
                                            class="h-[44px] grey-8 fs-14 fw-400 relative br-8 appearance-none block w-full px-3 py-3 rounded-md border border-gray-200 focus:outline-none sm:text-sm"
                                        />
                                        <i class="fa fa-calendar text-sm absolute right-3 text-[#321515]"></i>
                                    </div>
                                </template>
                            </v-date-picker>
                        </div>
                    </div>

                    <button @click="generate" :class="['h-[44px] flex items-center justify-center gap-4']" :disabled="generateLoading" type="submit" class="w-full brandButton">
                        {{ generateLoading ? 'Generating ...' : 'Generate Report' }}
                    </button>

                    <!-- <ExportButton @click="exportToExcel" class="h-[44px]" /> -->
                </div>
            </div>
        </div>
        <!-- //table -->
        <div class="mb-10">
            <div class="mt-8 flow-root">
                <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div v-if="payments.length === 0 && loading">
                            <SpinnerLoader class="mx-auto my-40 h-[50px] w-[50px]" />
                        </div>
                        <div v-else-if="payments.length === 0 && !loading" class="py-40 w-full bg-white flex flex-col items-center justify-center">
                            <!-- <div>
                                <TransactionHistoryEmptySvg />
                            </div> -->
                            <span style="color: #999999" class="mt-6 fs-16 fw-400">Nothing to see</span>
                        </div>
                        <div v-else class="overflow-auto shadow-[0px_1px_2px_rgba(16,24,40,0.05)] ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table ref="tableRef" class="overflow-y-auto z-[9999] min-w-full divide-y divide-[#EAECF0]">
                                <thead class="bg-[#F9FAFB]">
                                    <tr>
                                        <th scope="col" class="py-3.5 pl-6 pr-3 text-left text-xs font-medium text-[#475467]">Customer ID</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Customer Name</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Date</th>

                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Amount</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Payment Method</th>

                                        <!-- <th scope="col" class="relative py-3.5 pl-3 pr-6">
                                            <span class="sr-only">Menu</span>
                                        </th> -->
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="(payment, index) in payments" :key="payment.id" :class="[index + 1 === payment.length ? 'border-none rounded-b-lg' : 'border-b border-[#EAECF0]']">
                                        <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-[#475467]">
                                            <!-- <div class="flex items-center gap-3"> -->
                                            <span>{{ payment.transactionId }}</span>
                                            <!-- </div> -->
                                        </td>

                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">{{ payment.customerName }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">{{ Util.dateFormat(payment.transactionDate) }}</td>

                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">{{ payment.amount == 0 ? '0:00' : formatCurrency(payment.amount) }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">
                                            <span>{{ Constants.paymentStatusEnum[payment.paymentMethod] ? Constants.paymentStatusEnum[payment.paymentMethod] : 'N/A' }}</span>
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
                <PaginationComponent v-if="payments.length > 0" class="mt-2" />
            </div>
        </div>
    </div>
</template>

<script setup>
import ExportButton from '@/components/reusable/ExportButton.vue';

// import OrdersFilter from '@/views/admin/adminViews/adminOrders/OrdersFilter.vue';
import PaginationComponent from '@/components/reusable/PaginationComponent.vue';
import { Log, Constants, Util } from '@/util';
import { watchDebounced } from '@vueuse/core';
import RecentOrdersMenu from '@/views/admin/adminViews/reusable/RecentOrdersMenu.vue';
import { ref, computed, provide, reactive, onMounted, watch, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getPayments } from '@/services/AdminServices.js';
import PositiveModal from '@/views/admin/adminViews/reusable/PositiveModal.vue';
import { useStore } from 'vuex';
import XLSX from 'xlsx/dist/xlsx.full.min';
const modelConfig = {
    type: 'string',
    mask: 'YYYY-MM-DD',
};
// import XLSX from 'xlsx';
onMounted(() => {
    fetchPayments();
    // emptyPickedorder();
});
// const store = useStore();
const loading = ref(false);
const generateLoading = ref(false);

const currentDate = new Date(); 
const thirtyOneDays = () => {
    const fromDateObj = new Date();  
    fromDateObj.setDate(currentDate.getDate() - 31);  // Subtract 31 days from current date.
    return fromDateObj;  // Return a Date object instead of a string.
};

const fromDate = ref(thirtyOneDays());  // Now a Date object
const toDate = ref(currentDate);  // Current date as a Date object

const payments = ref([]);
const router = useRouter();
const route = useRoute();
const state = reactive({
    params: {
        from: fromDate.value,
        to: toDate.value,
        descending: true,
        searchText: '',
        pageNumber: 1,
        pageSize: 10,
        total: 0,
    },
});

const formatCurrency = inject('formatCurrency');

const tableRef = ref(null);

const exportToExcel = () => {
    const table = tableRef.value;

    const worksheet = XLSX.utils.table_to_sheet(table);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

    XLSX.writeFile(workbook, 'table_data.xlsx');
};

// const exportToExcel = () => {
//     const table = tableRef.value;

//     const worksheet = XLSX.utils.table_to_sheet(table);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

//     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'table_data.xlsx';

//     link.click();
// };

// const setToDate = () => {
//     toDate.value = currentDate.toISOString().slice(0, 10);
// };

// const menuOptions = ['View Order', 'Mark as Paid'];

const fetchPayments = () => {
    loading.value = true;
    getPayments(
        state.params,
        (res) => {
            loading.value = false;

            payments.value = res.data.data;
            state.params.total = res.data.total;
            generateLoading.value = false;
        },
        (err) => {
            generateLoading.value = false;
            loading.value = false;
        }
    );
};

const generate = () => {
    generateLoading.value = true;
    state.params.from = Util.formatDatePicked(fromDate.value);
    state.params.to = Util.formatDatePicked(toDate.value);

    fetchPayments();
};

watch(
    () => state.params.pageNumber,
    () => {
        fetchPayments();
    }
);

watch(
    () => state.params.pageSize,
    () => {
        fetchPayments();
    }
);

watchDebounced(
    () => state.params.searchText,
    () => {
        fetchPayments();
    },
    { debounce: 1000, maxWait: 1000 }
);
provide('searchParams', state.params);
</script>

<style lang="scss" scoped>
.overflowVisible {
    overflow: visible;
}

.generator {
    /* Gray/50 */

    background: #f9fafb;
    /* Gray cool / 100 */

    border: 1px solid #eff1f5;
    /* Shadow/xs */

    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
}
</style>
