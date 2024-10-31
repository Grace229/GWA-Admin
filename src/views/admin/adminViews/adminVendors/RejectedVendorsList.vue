<template>
    <div>
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

            <div>
                <RejectedVendorFilter />
            </div>
        </div>

        <!-- //table -->
        <div class="">
            <div class="mt-8 flow-root">
                <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div v-if="vendors.length === 0 && loading">
                            <SpinnerLoader class="mx-auto my-40 h-[50px] w-[50px]" />
                        </div>
                        <div v-else-if="vendors.length === 0 && !loading" class="py-40 w-full bg-white flex flex-col items-center justify-center">
                            <!-- <div>
                                <TransactionHistoryEmptySvg />
                            </div> -->
                            <span style="color: #999999" class="mt-6 fs-16 fw-400">Nothing to see</span>
                        </div>
                        <div v-else class="overflow-hidden shadow-[0px_1px_2px_rgba(16,24,40,0.05)] ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-[#EAECF0]">
                                <thead class="bg-[#F9FAFB]">
                                    <tr>
                                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-xs font-medium text-[#475467] sm:pl-6">Vendor</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Business Name</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Date</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Reason</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="vendor in vendors" :key="vendor.email">
                                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-[#101828] sm:pl-6">
                                            <div class="flex flex-col">
                                                <span>{{ `${vendor.firstName} ${vendor.lastName}` }}</span>
                                                <span class="font-normal text-[#475467]">{{ vendor.email }}</span>
                                            </div>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-[#101828] font-normal">
                                            <div class="flex flex-col">
                                                <span>{{ vendor.businessName }}</span>
                                                <span class="text-[#475467]">{{ vendor.address }}</span>
                                            </div>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-[#475467] font-normal">{{ Util.dateFormat(vendor.termsAcceptedAt) }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-[#475467] font-normal text-ellipsis truncate max-w-[400px]">{{ vendor.comment }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <PaginationComponent v-if="vendors.length > 0" class="mt-2" />
        </div>
    </div>
</template>

<script setup>
import { watchDebounced } from '@vueuse/core';
import { Log, Constants, Util } from '@/util';
import { useRouter } from 'vue-router';
import { ref, provide, reactive, onMounted, watch } from 'vue';
import PaginationComponent from '@/components/reusable/PaginationComponent.vue';

import { getAllVendors } from '@/services/AdminServices';
import RejectedVendorFilter from '@/views/admin/adminViews/adminVendors/RejectedVendorFilter.vue';
import TableMenuIcon from '@/views/admin/svg/TableMenuIcon.vue';

onMounted(() => {
    getVendors();
});

const router = useRouter();
const state = reactive({
    params: {
        sortBy: 6,
        descending: true,
        searchText: '',
        onboardingStatus: 2,
        profileStatus: 10,
        pageNumber: 1,
        pageSize: 10,
        total: 0,
    },
});
const loading = ref(false);

const vendors = ref([
    {
        name: 'Lindsay Walton',
        date: '8 Sep, 2020',
        email: 'lindsay.walton@example.com',
        role: 'Member',
        address: 'Lekki',
        businessName: 'Treadie',
        reason: 'Inadequate details submitted for this user ',
        status: ['Approved', 'Not Blocked', 'Visible'],
    },
    {
        name: 'Lindsay Walton',
        date: '8 Sep, 2020',
        email: 'lindsay.walton@example.com',
        role: 'Member',
        address: 'Lekki',
        businessName: 'Treadie',
        reason: 'Inadequate details submitted for this user ',
        status: ['Approved', 'Not Blocked', 'Visible'],
    },
    {
        name: 'Lindsay Walton',
        date: '8 Sep, 2020',
        email: 'lindsay.walton@example.com',
        role: 'Member',
        address: 'Lekki',
        businessName: 'Treadie',
        reason: 'Inadequate details submitted for this user ',
        status: ['Approved', 'Not Blocked', 'Visible'],
    },
    {
        name: 'Lindsay Walton',
        date: '8 Sep, 2020',
        email: 'lindsay.walton@example.com',
        role: 'Member',
        address: 'Lekki',
        businessName: 'Treadie',
        reason: 'Inadequate details submitted for this user ',
        status: ['Approved', 'Not Blocked', 'Visible'],
    },
]);

const getVendors = () => {
    loading.value = true;
    getAllVendors(
        state.params,
        (res) => {
            loading.value = false;
            vendors.value = res.data.data;
            state.params.total = res.data.total;
        },
        (err) => {
            loading.value = false;
        }
    );
};

watch(
    () => state.params.pageNumber,
    () => {
        getVendors();
    },
    { deep: true }
);

watch(
    () => state.params.profileStatus,
    () => {
        getVendors();
    }
);

watchDebounced(
    () => state.params.searchText,
    () => {
        getVendors();
    },
    { debounce: 1000, maxWait: 1000 }
);
provide('searchParams', state.params);
provide('state', state);
</script>

<style lang="scss" scoped></style>
