 <template>
    <div>
        <div class="flex justify-between mt-5 mb-[22px]">
            <button @click="openAddAndEdit('Add', fee)" class="gap-3 rounded-lg text-white flex items-center justify-center py-[10px] px-4 bg-[#12B76A]">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.0001 4.1665V15.8332M4.16675 9.99984H15.8334" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <span>Add Subscription</span>
            </button>
        </div>

        <div class="">
            <div class="mt-8 flow-root">
                <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div v-if="fees.length === 0 && feesLoading">
                            <SpinnerLoader class="mx-auto my-40 h-[50px] w-[50px]" />
                        </div>
                        <div v-else-if="fees.length === 0 && !feesLoading" class="py-40 w-full bg-white flex flex-col items-center justify-center">
                            <!-- <div>
                                <TransactionHistoryEmptySvg />
                            </div> -->
                            <span style="color: #999999" class="mt-6 fs-16 fw-400">Nothing to see</span>
                        </div>
                        <div v-else class="overflow-hidden shadow-[0px_1px_2px_rgba(16,24,40,0.05)] ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-[#EAECF0]">
                                <thead class="bg-[#F9FAFB]">
                                    <tr>
                                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-xs font-medium text-[#475467] sm:pl-6">Name</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Amount</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Services</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Date</th>


                                        <th scope="col" class=" px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="fee in fees" :key="fee.id">
                                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-[#101828] sm:pl-6">
                                            <div class="flex flex-col">
                                                <span class="font-normal text-[#475467]">{{ fee.name }}</span>
                                            </div>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-[#101828] font-normal">
                                            <div class="flex flex-col">
                                                <span class="text-[#475467]">{{ formatCurrency(fee.price) }}</span>
                                            </div>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-[#101828] font-normal">
                                            <div class="flex flex-col">
                                                <span class="text-[#475467]">{{ fee.services.join(", ") }}</span>
                                            </div>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-[#475467] font-normal">{{ Util.dateFormat(fee.createdAt) }}</td>
                                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <div><RecentOrdersMenu @proceed="optionPrompt" :fee="fee" /></div>
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
        <FeesAndCommissionOps  @proceed="action" :fee="selectedFee" />
    </div>
</template>

<script setup>
import { provide, ref, onMounted, inject } from 'vue';
import { getFees, updateFee, addFee } from '@/services/AdminServices.js';
import { Log, Util } from '@/util';
import NegativeModal from '@/views/admin/adminViews/reusable/NegativeModal.vue';
import FeesAndCommissionOps from '@/views/admin/adminViews/reusable/FeesAndCommissionOps.vue';
import RecentOrdersMenu from '@/views/admin/adminViews/reusable/RecentOrdersMenu.vue';

import { useStore } from 'vuex';
onMounted(() => {
    getAllFees();
});
const store = useStore();
const role = store.getters['authToken/roles'][0];
const isNegativeModalOpen = ref(false);
const fee = ref({
    id: '',
    name: '',
    amount: '',
});
const selectedFee = ref(null)
const formatCurrency = inject('formatCurrency');
const fees = ref([]);
const feesLoading = ref(false);
const actionLoading = ref(false);
const negativeModalText = ref({
    title: 'Delete Inspection Fees',
    description: 'Are you sure you want to delete this fee?',
    buttonText: 'Delete',
    fee: {},
    actionName: 'Delete Fee',
});

const hasActionPermission = () => {
    if (role === 'SuperAdmin') {
        return false;
    } else {
        return true;
    }
};

const toggleNegativeModal = () => {
    isNegativeModalOpen.value = !isNegativeModalOpen.value;
};

const openDelete = (fee) => {
    // console.log(`Delete ${fee}`);
    negativeModalText.value.title = `Delete ${fee.name}`;
    negativeModalText.value.fee = fee;
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

const openAddAndEdit = (type, fee) => {
    if (type === 'Add') {
        toggleAddAndEditModalText.value = {
            title: 'New Subscription',

            buttonText: 'Add Subscription',
            fee: fee,
        };
    }
    if (type === 'Edit') {
        toggleAddAndEditModalText.value = {
            title: 'Edit Subscription',

            buttonText: 'Save Changes',
            fee: selectedFee.value,
        };
    }
    toggleAddAndEditModal();
};

const getAllFees = () => {
    feesLoading.value = true;
    getFees(
        (res) => {
            feesLoading.value = false;
            fees.value = res.data.data.data;
        },
        (err) => {}
    );
};
const menuOptions = ref(['Subscription Details', 'Edit Subscription']);

const optionPrompt = ({ menuItem, fee }) => {
    const option = menuItem;
    if (option === 'Subscription Details') {
        router.push(`/admin/users/details/${fee.id}`);
    }

  

    if (option === 'Edit Subscription') {
        selectedFee.value = fee
        openAddAndEdit('Edit', fee)
    }


};

const action = ({ action, data }) => {
    if (action === 'Edit Fees') {
        actionLoading.value = true;
        updateFee(
            selectedFee.value.id,
            data,
            (res) => {
                console.log(res)
                actionLoading.value = false;
                Util.handleGlobalAlert(true, 'success', 'Subscription Successfully Updated');
                toggleAddAndEditModal();
                getAllFees();
            },
            (err) => {
                actionLoading.value = false;
                Util.handleGlobalAlert(true, 'failed', err?.response?.data?.message);
                toggleAddAndEditModal();
            }
        );
    }

    if (action === 'New Fees') {
        actionLoading.value = true;
        addFee(
            data,
            (res) => {
                actionLoading.value = false;
                Util.handleGlobalAlert(true, 'success', 'Subscription Successfully Added');
                toggleAddAndEditModal();
                getAllFees();
            },
            (err) => {
                actionLoading.value = false;
                Util.handleGlobalAlert(true, 'failed', err?.response?.data?.message);
                toggleAddAndEditModal();
            }
        );
    }
};

// const editFee = (data) => {
//     actionLoading.value = true
//     updateFee(
//         data,
//         (res) => {
//             actionLoading.value= false;

//
//         },
//         (err) => {
//             actionLoading.value= false;
//
//         }
//     );
// };

provide('isNegativeModalOpen', isNegativeModalOpen);
provide('toggleNegativeModal', toggleNegativeModal);
provide('negativeModalText', negativeModalText);
provide('isAddAndEditOpen', isAddAndEditOpen);
provide('toggleAddAndEditModal', toggleAddAndEditModal);
provide('toggleAddAndEditModalText', toggleAddAndEditModalText);
provide('refetch', getAllFees);
provide('actionLoading', actionLoading);
provide('menuOptions', menuOptions);

</script>

<style lang="scss" scoped></style>
