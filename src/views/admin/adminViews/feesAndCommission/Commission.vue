<template>
    <div :class="!hasActionPermission() ? 'disabled-page' : ''">
        <div class="flex justify-between mt-5 mb-[22px]">
            <button @click="openAddAndEdit('Add', emptyCommissionObj)" class="gap-3 rounded-lg text-white flex items-center justify-center py-[10px] px-4 bg-[#12B76A]">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.0001 4.1665V15.8332M4.16675 9.99984H15.8334" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <span>Add AddOns</span>
            </button>
        </div>

        <div class="">
            <div class="mt-8 flow-root">
                <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div v-if="commissions.length === 0 && commissionsLoading">
                            <SpinnerLoader class="mx-auto my-40 h-[50px] w-[50px]" />
                        </div>
                        <div v-else-if="commissions.length === 0 && !commissionsLoading" class="py-40 w-full bg-white flex flex-col items-center justify-center">
                            <!-- <div>
                                <TransactionHistoryEmptySvg />
                            </div> -->
                            <span style="color: #999999" class="mt-6 fs-16 fw-400">Nothing to see</span>
                        </div>

                        <div v-else class="overflow-hidden shadow-[0px_1px_2px_rgba(16,24,40,0.05)] ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-[#EAECF0]">
                                <thead class="bg-[#F9FAFB]">
                                    <tr>
                                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-xs font-medium text-[#475467] sm:pl-6"> Name</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Amount</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Date</th>
                                        <th scope="col" class="sr-only px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="commission in commissions" :key="commission.id">
                                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-[#101828] sm:pl-6">
                                            <div class="flex flex-col">
                                                <span class="font-normal text-[#475467]">{{ commission.name }}</span>
                                            </div>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-[#101828] font-normal">
                                            <div class="flex flex-col">
                                                <span class="text-[#475467]">{{ formatCurrency(commission.price) }}</span>
                                            </div>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-[#475467] font-normal">{{ Util.dateFormat(commission.createdAt) }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-[#475467] font-normal text-ellipsis truncate max-w-[400px]">
                                            <div class="flex justify-center gap-3">
                                                <div @click="openAddAndEdit('Edit', commission)" class="p-3 cursor-pointer">
                                                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M2.89662 15.0963C2.93491 14.7517 2.95405 14.5794 3.00618 14.4184C3.05243 14.2755 3.11778 14.1396 3.20045 14.0142C3.29363 13.8729 3.41621 13.7503 3.66136 13.5052L14.6666 2.49992C15.5871 1.57945 17.0795 1.57945 17.9999 2.49993C18.9204 3.4204 18.9204 4.91279 17.9999 5.83326L6.99469 16.8385C6.74954 17.0836 6.62696 17.2062 6.48566 17.2994C6.36029 17.3821 6.22433 17.4474 6.08146 17.4937C5.92042 17.5458 5.74813 17.5649 5.40356 17.6032L2.58325 17.9166L2.89662 15.0963Z"
                                                            stroke="#475467"
                                                            stroke-width="1.66667"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        />
                                                    </svg>
                                                </div>
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
        <NegativeModal />
        <FeesAndCommissionOps @proceed="action" />
    </div>
</template>

<script setup>
import { getCommissions, updateCommission, addCommission } from '@/services/AdminServices.js';
import { Log, Util } from '@/util';
import { provide, ref, onMounted, inject } from 'vue';
import NegativeModal from '@/views/admin/adminViews/reusable/NegativeModal.vue';
import FeesAndCommissionOps from '@/views/admin/adminViews/reusable/FeesAndCommissionOps.vue';
import { useStore } from 'vuex';

onMounted(() => {
    getAllCommissions();
});
const store = useStore();
const role = store.getters['authToken/roles'][0];
const commissions = ref([]);
const actionLoading = ref(false);
const commissionsLoading = ref(false);
const isNegativeModalOpen = ref(false);
const emptyCommissionObj = ref({
    id: '',
    name: '',
    amount: '',
});
const negativeModalText = ref({
    title: '',
    description: 'Are you sure you want to delete this commission?',
    buttonText: 'Delete',
    commission: {},
    actionName: 'Delete Commission',
});
const formatCurrency = inject('formatCurrency');
const toggleNegativeModal = () => {
    isNegativeModalOpen.value = !isNegativeModalOpen.value;
};

const openDelete = (commission) => {
    negativeModalText.value.title = `Delete ${commission.name} commission`;
    negativeModalText.value.commission = commission;

    toggleNegativeModal();
};

const hasActionPermission = () => {
    if (role === 'SuperAdmin') {
        return false;
    } else {
        return true;
    }
};

const isAddAndEditOpen = ref(false);
const toggleAddAndEditModalText = ref({
    title: '',

    buttonText: '',
});

const toggleAddAndEditModal = () => {
    isAddAndEditOpen.value = !isAddAndEditOpen.value;
};

const openAddAndEdit = (type, commission) => {
    if (type === 'Add') {
        toggleAddAndEditModalText.value = {
            title: 'New AddOns',

            buttonText: 'Add AddOns',
            commission: commission,
        };
    }
    if (type === 'Edit') {
        toggleAddAndEditModalText.value = {
            title: 'Edit AddOns',

            buttonText: 'Save Changes',
            commission: commission,
        };
    }
    toggleAddAndEditModal();
};

// const fees = [
//     {
//         id: '1',
//         name: 'Vendors',
//         amount: 30000,
//     },
// ];

const getAllCommissions = () => {
    commissionsLoading.value = true;
    getCommissions(
        (res) => {
            commissionsLoading.value = false;
            commissions.value = res.data.data.data;
        },
        (err) => {}
    );
};

const action = ({ action, data }) => {
    if (action === 'Edit Commission') {
        actionLoading.value = true;
        updateCommission(
            data,
            (res) => {
                actionLoading.value = false;
                Util.handleGlobalAlert(true, 'success', 'AddOns Successfully Updated');
                toggleAddAndEditModal();
                getAllCommissions();
            },
            (err) => {
                actionLoading.value = false;
                Util.handleGlobalAlert(true, 'failed', err?.response?.data?.message);
                toggleAddAndEditModal();
            }
        );
    }

    if (action === 'New Commission') {
        actionLoading.value = true;
        addCommission(
            data,
            (res) => {
                actionLoading.value = false;
                Util.handleGlobalAlert(true, 'success', 'AddOns Successfully Added');
                toggleAddAndEditModal();
                getAllCommissions();
            },
            (err) => {
                actionLoading.value = false;
                Util.handleGlobalAlert(true, 'failed', err?.response?.data?.message);
                toggleAddAndEditModal();
            }
        );
    }
};

provide('isNegativeModalOpen', isNegativeModalOpen);
provide('toggleNegativeModal', toggleNegativeModal);
provide('negativeModalText', negativeModalText);
provide('isAddAndEditOpen', isAddAndEditOpen);
provide('toggleAddAndEditModal', toggleAddAndEditModal);
provide('toggleAddAndEditModalText', toggleAddAndEditModalText);
provide('refetch', getAllCommissions);
provide('actionLoading', actionLoading);
</script>

<style lang="scss" scoped></style>
