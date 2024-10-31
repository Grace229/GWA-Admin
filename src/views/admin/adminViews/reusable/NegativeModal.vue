<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="close">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[400px] sm:p-6">
                            <div>
                                <div class="flex items-start justify-between">
                                    <RedCancelIcon v-if="$route.name === 'Fees & Commission Listing'" />

                                    <UnCheckIcon v-else />

                                    <CancelIcon @click="close" />
                                </div>
                                <div class="mt-3 text-left sm:mt-5">
                                    <DialogTitle as="h3" class="text-[18px] font-semibold leading-6 text-[#101828]">{{ negativeModalText.title }}</DialogTitle>
                                    <div class="mt-2">
                                        <p class="text-sm text-[#475467]">{{ negativeModalText.description }}</p>
                                    </div>
                                </div>
                            </div>

                            <div v-if="negativeModalText.actionName === 'Delete Param'" class="flex gap-3 mt-5 items-center">
                                <input class="border-gray-300 text-[#ff6600] rounded-[4px] focus:outline-none focus:ring-0" type="checkbox" v-model="negativeModalText.permanent" />
                                <p class="font-normal text-sm text-[#404968]">Delete permanently</p>
                            </div>
                            <!-- {{ negativeModalText }} -->

                            <div
                                v-if="
                                    negativeModalText.actionName === 'Reject Product' ||
                                    negativeModalText.actionName === 'Decline Vendor' ||
                                    negativeModalText.actionName === 'Deactivate Vendor' ||
                                    negativeModalText.actionName === 'Block Vendor'
                                "
                                class="col-span-1 mt-3"
                            >
                                <label for="comment" class="block text-sm font-medium text-gray-700">Comment </label>
                                <div class="mt-1">
                                    <input
                                        type="text"
                                        name="comment"
                                        id="comment"
                                        autocomplete="off"
                                        v-model="form.comment"
                                        class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                        aria-describedby="email-description"
                                    />
                                </div>
                                <div v-if="commentValid" class="text-red-400 mt-1 text-xs">
                                    <div class="text-red-400">Comment must be at least 10 characters</div>
                                </div>
                            </div>

                            <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                                <button
                                    class="mt-3 flex items-center justify-center w-full rounded-lg bg-white px-3 py-[10px] text-base font-semibold text-[#344054] shadow-sm hover:bg-gray-50 sm:mt-0 border !ring-0 outline-none"
                                    @click="close"
                                >
                                    Cancel
                                </button>
                                <button @click="action" type="button" class="bg-[#F0203D] flex items-center justify-center w-full rounded-lg px-3 py-2 text-sm font-semibold text-white shadow-sm">
                                    {{ negativeModalText.buttonText }}
                                    <SpinnerLoader v-if="loading" class="ml-2 h-[14px] w-[14px]" />
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { ref, inject, onMounted, reactive, watch } from 'vue';
import RedCancelIcon from '@/views/admin/adminViews/reusable/RedCancelIcon.vue';
import CancelIcon from '@/views/admin/adminViews/reusable/CancelIcon.vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import UnCheckIcon from '@/views/admin/adminViews/reusable/UnCheckIcon.vue';
import {
    deleteUser,
    disableUser,
    vendorApproveOrDecline,
    vendorProfileStatusUpdate,
    deleteFee,
    deleteParam,
    deleteCommission,
    updateProductStatus,
    rejectOrder,
    deleteFeature,
    updateCustomerProfile,
} from '@/services/AdminServices.js';
import { Log, Util } from '@/util';

onMounted(() => {
    // loading.value = false;
});
const open = inject('isNegativeModalOpen');
const toggleNegativeModal = inject('toggleNegativeModal');
const negativeModalText = inject('negativeModalText');
const refetch = inject('refetch');
const form = reactive({
    comment: '',
});
const commentValid = ref(false);

const close = () => {
    loading.value = false;

    toggleNegativeModal();
    form.comment = '';
};
const loading = ref(false);
const declineVendor = () => {
    if (form.comment.length < 10) {
        commentValid.value = true;
        return;
    }

    const idOfVendor = negativeModalText.value.vendor.id;

    const payload = {
        vendorId: idOfVendor,
        onboardingStatus: 2,
        comment: form.comment,
    };
    loading.value = true;
    vendorApproveOrDecline(
        payload,
        (res) => {
            loading.value = false;
            // refetch();
            negativeModalText.value.updateOnboardingStatusById(idOfVendor);

            Util.handleGlobalAlert(true, 'success', 'Successfully Declined Vendor');

            toggleNegativeModal();
        },
        (error) => {
            Util.handleGlobalAlert(true, 'failed', error?.response?.data?.message ? error.response.data.message : 'Failed to Decline Vendor. Try Again');

            loading.value = false;

            toggleNegativeModal();
        }
    );
};

const deactivateVendor = () => {
    loading.value = true;
    const idOfVendor = negativeModalText.value.vendor.id;
    vendorProfileStatusUpdate(
        {
            vendorId: idOfVendor,
            profileStatus: 2,
            comment: form.comment,
        },
        (res) => {
            negativeModalText.value.updateProfileStatusById(idOfVendor);

            // refetch();
            Util.handleGlobalAlert(true, 'success', 'Successfully Deactivated Vendor');

            close();
        },
        (error) => {
            Util.handleGlobalAlert(true, 'failed', error?.response?.data?.message ? error.response.data.message : 'Failed to Deactivate Vendor. Try Again');
            close();
        }
    );
};

const blockVendor = () => {
    loading.value = true;
    const idOfVendor = negativeModalText.value.vendor.id;

    vendorProfileStatusUpdate(
        {
            vendorId: idOfVendor,
            profileStatus: 4,
            comment: form.comment,
        },
        (res) => {
            negativeModalText.value.updateProfileStatusById(idOfVendor);

            // refetch();
            Util.handleGlobalAlert(true, 'success', 'Successfully Blocked Vendor');

            close();
        },
        (error) => {
            Util.handleGlobalAlert(true, 'failed', error?.response?.data?.message ? error.response.data.message : 'Failed to Block Vendor. Try Again');
            close();
        }
    );
};

const deleteAFee = () => {
    loading.value = true;
    deleteFee(
        {
            id: negativeModalText.value.fee.id,
        },
        (res) => {
            refetch();
            Util.handleGlobalAlert(true, 'success', 'Successfully deleted Fee');

            close();
        },
        (error) => {
            Util.handleGlobalAlert(true, 'failed', error?.response?.data?.message ? error.response.data.message : 'Failed to Delete Fee. Try Again');
            close();
        }
    );
};

const deleteAParam = () => {
    loading.value = true;
    deleteParam(
        {
            parameterId: String(negativeModalText.value.param.id),
            permanent: negativeModalText.value.permanent,
        },
        (res) => {
            refetch();
            Util.handleGlobalAlert(true, 'success', 'Successfully deleted Parameter');

            close();
        },
        (error) => {
            Util.handleGlobalAlert(true, 'failed', error?.response?.data?.message ? error.response.data.message : 'Failed to Delete Parameter. Try Again');
            close();
        }
    );
};

const deleteAComission = () => {
    loading.value = true;
    deleteCommission(
        {
            id: String(negativeModalText.value.commission.id),
        },
        (res) => {
            refetch();
            Util.handleGlobalAlert(true, 'success', 'Successfully deleted Commission');

            close();
        },
        (error) => {
            Util.handleGlobalAlert(true, 'failed', error?.response?.data?.message ? error.response.data.message : 'Failed to Delete Commission. Try Again');
            close();
        }
    );
};

const rejectProduct = () => {
    //status:1 = approve
    //status:2 = reject
    if (form.comment.length < 10) {
        commentValid.value = true;
        return;
    }
    loading.value = true;
    updateProductStatus(
        {
            vehicleId: negativeModalText.value.car.id,
            comment: form.comment,
            status: 2,
            userId: negativeModalText.value.userId,
        },

        (res) => {
            refetch();
            Util.handleGlobalAlert(true, 'success', 'Successfully Deactivated');

            close();
        },
        (error) => {
            Util.handleGlobalAlert(true, 'failed', error?.response?.data?.message ? error.response.data.message : 'Failed. Try Again');
            close();
        }
    );
};

const rejectAnOrder = () => {
    // refetch();
    loading.value = true;
    rejectOrder(
        {
            id: negativeModalText.value.id,
        },

        (res) => {
            negativeModalText.value.setRejected();

            refetch();
            Util.handleGlobalAlert(true, 'success', 'Successfully Deactivated');

            close();
        },
        (error) => {
            // refetch();

            Util.handleGlobalAlert(true, 'failed', error?.response?.data?.message ? error.response.data.message : 'Failed. Try Again');
            close();
        }
    );
};

const blockAdmin = () => {
    // alert(JSON.stringify(negativeModalText.value.adminUser));
    loading.value = true;
    disableUser(
        {
            userId: negativeModalText.value.adminUser.id,
        },

        (res) => {
            // negativeModalText.value.setRejected();

            negativeModalText.value.setAdminUserStatus();
            Util.handleGlobalAlert(true, 'success', 'Successful');

            close();
        },
        (error) => {
            // refetch();

            Util.handleGlobalAlert(true, 'failed', error?.response?.data?.message ? error.response.data.message : 'Failed. Try Again');
            close();
        }
    );
};

const deleteAdmin = () => {
    loading.value = true;
    deleteUser(
        {
            userId: negativeModalText.value.adminUser.id,
        },

        (res) => {
            // negativeModalText.value.setRejected();

            refetch();
            Util.handleGlobalAlert(true, 'success', 'Successfully Deleted');

            close();
        },
        (error) => {
            // refetch();

            Util.handleGlobalAlert(true, 'failed', error?.response?.data?.message ? error.response.data.message : 'Failed. Try Again');
            close();
        }
    );
};

const deleteAFeature = () => {
    loading.value = true;
    deleteFeature(
        {
            featureId: String(negativeModalText.value.feature.id),
            permanent: negativeModalText.value.permanent,
        },
        (res) => {
            refetch();
            Util.handleGlobalAlert(true, 'success', 'Successfully deleted Feature');

            close();
        },
        (error) => {
            Util.handleGlobalAlert(true, 'failed', error?.response?.data?.message ? error.response.data.message : 'Failed to Delete Parameter. Try Again');
            close();
        }
    );
};

const blockCustomer = () => {
    loading.value = true;
    updateCustomerProfile(
        //1 = inactive
        {
            userId: negativeModalText.value.customer.userId,
            profileStatus: 1,
        },

        (res) => {
            Util.handleGlobalAlert(true, 'success', 'Successfully Blocked Customer');

            close();
        },
        (error) => {
            Util.handleGlobalAlert(true, 'failed', error?.response?.data?.message ? error.response.data.message : 'Failed. Try Again');
            close();
        }
    );
};

const action = () => {
    // console.log(negativeModalText.value);
    if (negativeModalText.value.title === 'Decline Vendor') {
        declineVendor();
    }

    if (negativeModalText.value.title === 'Deactivate Vendor') {
        deactivateVendor();
    }

    if (negativeModalText.value.title === 'Block Vendor') {
        blockVendor();
    }

    if (negativeModalText.value.actionName === 'Delete Fee') {
        deleteAFee();
    }

    if (negativeModalText.value.actionName === 'Delete Param') {
        deleteAParam();
    }

    if (negativeModalText.value.actionName === 'Delete Commission') {
        deleteAComission();
    }

    if (negativeModalText.value.actionName === 'Reject Product') {
        rejectProduct();
    }

    if (negativeModalText.value.actionName === 'Reject Order') {
        rejectAnOrder();
    }
    if (negativeModalText.value.actionName === 'Block Admin') {
        blockAdmin();
    }

    if (negativeModalText.value.actionName === 'Delete Admin') {
        deleteAdmin();
    }

    if (negativeModalText.value.actionName === 'Delete Feature') {
        deleteAFeature();
    }

    if (negativeModalText.value.actionName === 'Block Customer') {
        blockCustomer();
    }
};

watch(
    () => form.comment,
    () => {
        if (negativeModalText.value.title === 'Decline Vendor') {
            if (form.comment.length > 0 && form.comment.length < 10) {
                commentValid.value = true;
            } else {
                commentValid.value = false;
            }
        }

        if (negativeModalText.value.actionName === 'Reject Product') {
            if (form.comment.length > 0 && form.comment.length < 10) {
                commentValid.value = true;
            } else {
                commentValid.value = false;
            }
        }
    }
);
</script>
