<template>
    <div>
        <!-- ss{{ role }} -->
        <!-- {{ state }} -->
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

            <div class="flex gap-3">
                <ExportButton class="hidden" />
                <CustomerFilter />
            </div>
        </div>

        <!-- {{ customers[0] }} -->

        <!-- //table -->
        <div class="mb-10">
            <div class="mt-8 flow-root">
                <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div v-if="customers.length === 0 && loading">
                            <SpinnerLoader class="mx-auto my-40 h-[50px] w-[50px]" />
                        </div>
                        <div v-else-if="customers.length === 0 && !loading" class="py-40 w-full bg-white flex flex-col items-center justify-center">
                            <!-- <div>
                                <TransactionHistoryEmptySvg />
                            </div> -->
                            <span style="color: #999999" class="mt-6 fs-16 fw-400">Nothing to see</span>
                        </div>
                        <div v-else class="overflow-auto shadow-[0px_1px_2px_rgba(16,24,40,0.05)] ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table class="overflow-y-auto z-[9999] min-w-full divide-y divide-[#EAECF0]">
                                <thead class="bg-[#F9FAFB]">
                                    <tr>
                                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-xs font-medium text-[#475467] sm:pl-6">Customer</th>
                                        <!-- <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Business Name</th> -->
                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Phone Number</th>
                                        <!-- <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Account No</th>

                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Profile Status</th>
                                        -->
                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Profile Status</th>
                                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span class="sr-only">Menu</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="customer in customers" :key="customer.email">
                                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-[#101828] sm:pl-6">
                                            <div class="flex flex-col">
                                                <span>{{ `${customer.firstName} ${customer.lastName}` }}</span>
                                                <span class="font-normal text-[#475467]">{{ customer.email }}</span>
                                            </div>
                                        </td>

                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-[#475467] font-normal">{{ customer.phoneCode }}{{ customer.phoneNumber }}</td>
                                        <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-[#475467] font-normal">-</td> -->
                                        <td class="whitespace-nowrap px-3 py-4 text-xs font-normal text-gray-500">
                                            <div class="flex gap-1 max-w-max">
                                                <!-- {{ onboardingStatusEnum[vendor.profileStatus] }} -->

                                                <div v-if="customer.profileStatus == 0" class="text-[#027A48] bg-[#ECFDF3] py-[2px] px-2 max-w-max rounded-[16px]">
                                                    <span>Active</span>
                                                </div>

                                                <div v-if="customer.profileStatus == 1" class="text-[#B42318] bg-[#FEF3F2] py-[2px] px-2 max-w-max rounded-[16px]">
                                                    <span>Blocked</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <div><RecentOrdersMenu @proceed="optionPrompt" :customer="customer" /></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <PaginationComponent v-if="customers.length > 0" class="mt-2" />
            </div>
        </div>
        <PositiveModal />
        <NegativeModal />
    </div>
</template>

<script setup>
import CustomerFilter from './CustomerFilter.vue';
import PaginationComponent from '@/components/reusable/PaginationComponent.vue';
import ExportButton from '@/components/reusable/ExportButton.vue';
import RecentOrdersMenu from '@/views/admin/adminViews/reusable/RecentOrdersMenu.vue';
import { ref, provide, reactive, onMounted, watch, inject, computed } from 'vue';
import { watchDebounced } from '@vueuse/core';
import { Log, Constants, Util } from '@/util';
import { useRouter } from 'vue-router';
import { getAllCustomers } from '@/services/AdminServices';
import PositiveModal from '@/views/admin/adminViews/reusable/PositiveModal.vue';
import NegativeModal from '@/views/admin/adminViews/reusable/NegativeModal.vue';

onMounted(() => {
    getCustomers();
    setMenuOptionsBasedOnRole();
});

const profileStatusString = computed(() => `ProfileStatus=${state.params.profileStatus}`);
const router = useRouter();
const state = reactive({
    params: {
        sortBy: 1,
        descending: true,
        searchText: '',
        onboardingStatus: 10,
        profileStatus: 10,
        pageNumber: 1,
        pageSize: 10,
        total: 0,
    },
});
const role = inject('role');
const customers = ref([]);

const menuOptions = ref(['Customer Details']);
const loading = ref(false);
const onboardingStatusEnum = Constants.onboardingStatusEnum;
const isPositiveModalOpen = ref(false);
const isNegativeModalOpen = ref(false);

const togglePositiveModal = () => {
    isPositiveModalOpen.value = !isPositiveModalOpen.value;
};
const toggleNegativeModal = () => {
    isNegativeModalOpen.value = !isNegativeModalOpen.value;
};
const negativeModalText = ref({
    title: '',
    description: '',
    buttonText: '',
});

const positiveModalText = ref({
    title: '',
    description: '',
    buttonText: '',
});

const setMenuOptionsBasedOnRole = () => {
    if (role === 'BusinessAdmin') {
        menuOptions.value = ['Customer Details', 'Unblock Customer', 'Block Customer'];
    }
};

const getCustomers = () => {
    loading.value = true;
    getAllCustomers(
        {
            ...state.params,
            profileStatusString: state.params.profileStatus == 10 ? '' : profileStatusString.value,
        },
        (res) => {
            loading.value = false;
            customers.value = res.data.data;
            state.params.total = res.data.total;
        },
        (err) => {
            loading.value = false;
        }
    );
};

const optionPrompt = ({ menuItem, customer }) => {
    const option = menuItem;
    if (option === 'Customer Details') {
        router.push(`/admin/customers/details/${customer.id}/`);
    }

    if (option === 'Unblock Customer') {
        positiveModalText.value = {
            title: 'Unblock Customer',
            description: 'Are you sure you want to unblock this customer',
            buttonText: 'Unblock',
            customer: customer,
            actionName: 'Unblock Customer',
            // updateProfileStatusById: (id) => {
            //     const updatedProfileStatus = 3;
            //     const item = customers.value.find((item) => item.id === id);

            //     if (item) {
            //         // alert('Set as activated');
            //         item.profileStatus = updatedProfileStatus;
            //     }
            // },
        };

        togglePositiveModal();
        return;
    }

    if (option === 'Block Customer') {
        negativeModalText.value = {
            title: 'Block Customer',
            description: 'Are you sure you want to block this customer',
            buttonText: 'Confirm',
            customer: customer,
            actionName: 'Block Customer',
            // updateProfileStatusById: (id) => {
            //     const updatedProfileStatus = 4;
            //     const item = customers.value.find((item) => item.id === id);

            //     if (item) {
            //         // alert('Set as activated');
            //         item.profileStatus = updatedProfileStatus;
            //     }
            // },
        };

        toggleNegativeModal();
        return;
    }
};

// const refetch = () => {
//     getCustomers();
// }
watch(
    () => state.params.pageNumber,
    () => {
        getCustomers();
    },
    { deep: true }
);

watch(
    () => state.params.onboardingStatus,
    () => {
        getCustomers();
    }
);
watch(
    () => state.params.profileStatus,
    () => {
        getCustomers();
    }
);

watch(
    () => state.params.pageSize,
    () => {
        getCustomers();
    }
);

watchDebounced(
    () => state.params.searchText,
    () => {
        getCustomers();
    },
    { debounce: 1000, maxWait: 1000 }
);

provide('searchParams', state.params);
provide('menuOptions', menuOptions);
provide('isPositiveModalOpen', isPositiveModalOpen);
provide('togglePositiveModal', togglePositiveModal);
provide('positiveModalText', positiveModalText);
provide('isNegativeModalOpen', isNegativeModalOpen);
provide('toggleNegativeModal', toggleNegativeModal);
provide('negativeModalText', negativeModalText);
provide('state', state);

provide('refetch', getCustomers);
</script>

<style lang="scss" scoped>
.overflowVisible {
    overflow: visible;
}
</style>
