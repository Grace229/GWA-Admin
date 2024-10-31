<template>
    <div :class="!hasActionPermission() ? 'disabled-page' : ''">
        <!-- <div class="flex justify-between items-center mt-5 mb-[22px]">
            <h1>Car Parameters</h1>
            <button @click="openAddAndEdit('Add')" class="gap-3 rounded-lg text-white flex items-center justify-center py-[10px] px-4 bg-[#12B76A]">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.0001 4.1665V15.8332M4.16675 9.99984H15.8334" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <span>Add Parameter</span>
            </button>
        </div> -->

        <div class="">
            <div class="mt-8 flow-root">
                <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div class="overflow-hidden shadow-[0px_1px_2px_rgba(16,24,40,0.05)] ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <!-- /////// -->

                            <div class="flex px-6 justify-between items-center border-b border-[#EAECF0] pt-5 pb-[21px]">
                                <h1 class="font-semibold text-[18px] text-[#1D2939]">Car Parameters</h1>
                                <button @click="openAddAndEdit('Add', emptyParamObj)" class="gap-3 rounded-lg text-white flex items-center justify-center py-[10px] px-4 bg-[#12B76A]">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0001 4.1665V15.8332M4.16675 9.99984H15.8334" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                    <span class="hidden sm:block">Add Parameter</span>
                                </button>
                            </div>

                            <!-- /////// -->

                            <div v-if="parameters?.length === 0 && loadingParameters">
                                <SpinnerLoader class="mx-auto my-40 h-[50px] w-[50px]" />
                            </div>
                            <div v-else-if="parameters.length === 0 && !loadingParameters" class="py-40 w-full bg-white flex flex-col items-center justify-center">
                                <span style="color: #999999" class="mt-6 fs-16 fw-400">Nothing to see</span>
                            </div>
                            <table v-else class="min-w-full divide-y divide-[#EAECF0]">
                                <thead class="">
                                    <tr>
                                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-xs font-medium text-[#475467] sm:pl-6">Name</th>
                                        <th scope="col" class="sr-only px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="(param, index) in parameters" :key="param.id" :class="index % 2 !== 0 ? undefined : 'bg-gray-50'">
                                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-[#101828] sm:pl-6">
                                            <div class="flex flex-col">
                                                <span class="font-normal text-[#475467]">{{ param.name }}</span>
                                            </div>
                                        </td>

                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-[#475467] font-normal text-ellipsis truncate max-w-[400px]">
                                            <div class="flex justify-end mr-4 gap-3">
                                                <div @click="openDelete(param)" class="p-3 cursor-pointer">
                                                    <!-- <span>ss</span> -->
                                                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M13.8333 4.99984V4.33317C13.8333 3.39975 13.8333 2.93304 13.6517 2.57652C13.4919 2.26292 13.2369 2.00795 12.9233 1.84816C12.5668 1.6665 12.1001 1.6665 11.1667 1.6665H9.83333C8.89991 1.6665 8.4332 1.6665 8.07668 1.84816C7.76308 2.00795 7.50811 2.26292 7.34832 2.57652C7.16667 2.93304 7.16667 3.39975 7.16667 4.33317V4.99984M8.83333 9.58317V13.7498M12.1667 9.58317V13.7498M3 4.99984H18M16.3333 4.99984V14.3332C16.3333 15.7333 16.3333 16.4334 16.0608 16.9681C15.8212 17.4386 15.4387 17.821 14.9683 18.0607C14.4335 18.3332 13.7335 18.3332 12.3333 18.3332H8.66667C7.26654 18.3332 6.56647 18.3332 6.03169 18.0607C5.56129 17.821 5.17883 17.4386 4.93915 16.9681C4.66667 16.4334 4.66667 15.7333 4.66667 14.3332V4.99984"
                                                            stroke="#475467"
                                                            stroke-width="1.66667"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        />
                                                    </svg>
                                                </div>
                                                <div @click="openAddAndEdit('Edit', param)" class="p-3 cursor-pointer">
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
        <CarAndParameterOps @proceed="action" />
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { provide, ref, onMounted } from 'vue';
import { Log, Util } from '@/util';
import { getParams } from '@/services/AdminServices.js';
import { addParam, updateParam } from '@/services/AdminServices.js';
import NegativeModal from '@/views/admin/adminViews/reusable/NegativeModal.vue';
import CarAndParameterOps from '@/views/admin/adminViews/adminProducts/CarAndParameterOps.vue';
onMounted(() => {
    getParameters();
});
const store = useStore();
const role = store.getters['authToken/roles'][0];
const hasActionPermission = () => {
    if (role === 'SuperAdmin') {
        return false;
    } else {
        return true;
    }
};

const emptyParamObj = ref({
    id: '',
    name: '',
    parameterType: '',
});
const loadingParameters = ref(false);
const actionLoading = ref(false);
const parameters = ref([]);

const isNegativeModalOpen = ref(false);
const negativeModalText = ref({
    title: '',
    description: 'Are you sure you want to delete this parameter?',
    buttonText: 'Delete',
    param: {},
    actionName: 'Delete Param',
    permanent: false,
});

const toggleNegativeModal = () => {
    isNegativeModalOpen.value = !isNegativeModalOpen.value;
};

const openDelete = (parameter) => {
    negativeModalText.value.title = `Delete ${parameter.name}`;
    negativeModalText.value.param = parameter;
    negativeModalText.value.permanent = false;
    negativeModalText.value.actionName = 'Delete Param';
    toggleNegativeModal();
};

const isAddAndEditOpen = ref(false);
const toggleAddAndEditModalText = ref({
    title: '',

    buttonText: '',
});

const toggleAddAndEditModal = () => {
    isAddAndEditOpen.value = !isAddAndEditOpen.value;
};

const openAddAndEdit = (type, param) => {
    if (type === 'Add') {
        toggleAddAndEditModalText.value = {
            title: 'New Parameter',

            buttonText: 'Create Parameter',
            param: param,
        };
    }
    if (type === 'Edit') {
        toggleAddAndEditModalText.value = {
            title: 'Edit Parameter',

            buttonText: 'Save Changes',
            param: param,
        };
    }
    toggleAddAndEditModal();
};

const getParameters = () => {
    loadingParameters.value = true;
    getParams(
        (res) => {
            loadingParameters.value = false;
            parameters.value = res.data.data;
        },
        (err) => {
            loadingParameters.value = false;
        }
    );
};

const action = ({ action, data }) => {
    if (action === 'Edit Parameter') {
        actionLoading.value = true;
        updateParam(
            data,
            (res) => {
                actionLoading.value = false;
                Util.handleGlobalAlert(true, 'success', 'Param Successfully Updated');
                toggleAddAndEditModal();
                getParameters();
            },
            (err) => {
                actionLoading.value = false;
                Util.handleGlobalAlert(true, 'failed', err.response.data.message);
                toggleAddAndEditModal();
            }
        );
    }

    if (action === 'New Parameter') {
        actionLoading.value = true;
        addParam(
            data,
            (res) => {
                actionLoading.value = false;
                Util.handleGlobalAlert(true, 'success', 'Param Successfully Added');
                toggleAddAndEditModal();
                getParameters();
            },
            (err) => {
                actionLoading.value = false;
                Util.handleGlobalAlert(true, 'failed', err.response.data.message);
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
provide('refetch', getParameters);
provide('paramsActionLoading', actionLoading);
</script>

<style lang="scss" scoped></style>
