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
                                    <PaidOrderIcon v-if="$route.name === 'Orders Listing'" />
                                    <CheckIcon v-else />

                                    <CancelIcon @click="close" />
                                </div>
                                <div class="mt-3 text-left sm:mt-5">
                                    <DialogTitle as="h3" class="text-[18px] font-semibold leading-6 text-[#101828]">{{ positiveModalText.title }}</DialogTitle>
                                    <div class="mt-2">
                                        <!-- {{ positiveModalText.order.id }} -->
                                        <p class="text-sm text-[#475467]">{{ positiveModalText.description }}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- <div v-if="positiveModalText.actionName === 'Approve Product'" class="col-span-1 mt-3">
                                <label for="comment" class="block text-sm font-medium text-gray-700">Comment</label>
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
                            </div> -->

                            <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                                <button
                                    class="mt-3 flex items-center justify-center w-full rounded-lg bg-white px-3 py-[10px] text-base font-semibold text-[#344054] shadow-sm hover:bg-gray-50 sm:mt-0 border !ring-0 outline-none"
                                    @click="close"
                                >
                                    Cancel
                                </button>
                                <button type="button" class="bg-[#12B76A] flex items-center justify-center w-full rounded-lg px-3 py-2 text-sm font-semibold text-white shadow-sm" @click="action">
                                    {{ positiveModalText.buttonText }}
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
import { useRoute } from 'vue-router';
import { inject, ref, reactive } from 'vue';
import { Log, Util } from '@/util';
import PaidOrderIcon from '@/views/admin/adminViews/reusable/PaidOrderIcon.vue';
import CancelIcon from '@/views/admin/adminViews/reusable/CancelIcon.vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import CheckIcon from '@/views/admin/adminViews/reusable/CheckIcon.vue';
import {
    updateCustomerProfile,
    vendorApproveOrDecline,
    vendorProfileStatusUpdate,
    markOrderAsDelivered,
    markAsPaid,
    updateProductStatus,
    approveOrder,
    enableUser,
    createAdmin,
} from '@/services/AdminServices.js';
const open = inject('isPositiveModalOpen');
const togglePositiveModal = inject('togglePositiveModal');
const positiveModalText = inject('positiveModalText');
const refetch = inject('refetch');
const route = useRoute();
const loading = ref(false);
const form = reactive({
    comment: '',
});
const close = () => {
    loading.value = false;
    togglePositiveModal();
    form.comment = '';
};

const approveVendor = () => {
    loading.value = true;
    const idOfVendor = positiveModalText.value.vendor.id;
    vendorApproveOrDecline(
        {
            vendorId: idOfVendor,
            onboardingStatus: 1,
            comment: '',
        },
        (res) => {
            loading.value = false;
            positiveModalText.value.updateOnboardingStatusById(idOfVendor);
            // refetch();
            Util.handleGlobalAlert(true, 'success', 'Successfully Approved Vendor');

            togglePositiveModal();
        },
        (error) => {
            Util.handleGlobalAlert(true, 'failed', error?.response?.data?.message ? error.response.data.message : 'Failed to Approve Vendor. Try Again');

            loading.value = false;

            togglePositiveModal();
        }
    );
};

const activateVendor = () => {
    loading.value = true;
    const idOfVendor = positiveModalText.value.vendor.id;

    vendorProfileStatusUpdate(
        {
            vendorId: idOfVendor,
            profileStatus: 1,
            comment: '',
        },
        (res) => {
            positiveModalText.value.updateProfileStatusById(idOfVendor);

            // refetch();
            Util.handleGlobalAlert(true, 'success', 'Successfully Activated Vendor');

            close();
        },
        (error) => {
            Util.handleGlobalAlert(true, 'failed', error?.response?.data?.message ? error.response.data.message : 'Failed to Activate Vendor. Try Again');
            close();
        }
    );
};

const unblockVendor = () => {
    loading.value = true;
    const idOfVendor = positiveModalText.value.vendor.id;

    vendorProfileStatusUpdate(
        {
            vendorId: idOfVendor,
            profileStatus: 3,
            comment: '',
        },
        (res) => {
            positiveModalText.value.updateProfileStatusById(idOfVendor);

            // refetch();
            Util.handleGlobalAlert(true, 'success', 'Successfully Unblocked Vendor');

            close();
        },
        (error) => {
            Util.handleGlobalAlert(true, 'failed', error?.response?.data?.message ? error.response.data.message : 'Failed to Unblock Vendor. Try Again');
            close();
        }
    );
};

const markOrderAsPaid = () => {
    loading.value = true;
    markAsPaid(
        {
            id: positiveModalText.value.order?.id,
            reference: '',
        },
        (res) => {
            // refetch();
            positiveModalText.value.setPaymentStatus();
            if (route.name === 'Orders Listing') {
                refetch();
            }

            Util.handleGlobalAlert(true, 'success', 'Successfully Marked As Paid');

            close();
        },
        (error) => {
            Util.handleGlobalAlert(true, 'failed', error?.response?.data?.message ? error.response.data.message : 'Failed. Try Again');
            close();
        }
    );
};

const approveProduct = () => {
    //status:1 = approve
    //status:2 = reject
    loading.value = true;
    updateProductStatus(
        {
            vehicleId: positiveModalText.value.car.id,
            comment: form.comment,
            status: 1,
            userId: positiveModalText.value.userId,
        },

        (res) => {
            refetch();
            Util.handleGlobalAlert(true, 'success', 'Successfully Approved');

            close();
        },
        (error) => {
            Util.handleGlobalAlert(true, 'failed', error?.response?.data?.message ? error.response.data.message : 'Failed. Try Again');
            close();
        }
    );
};

const authorizeOrder = () => {
    loading.value = true;
    approveOrder(
        {
            id: positiveModalText.value.id,
        },

        (res) => {
            positiveModalText.value.setAuthorised();
            refetch();
            Util.handleGlobalAlert(true, 'success', 'Successfully Approved');

            close();
        },
        (error) => {
            Util.handleGlobalAlert(true, 'failed', error?.response?.data?.message ? error.response.data.message : 'Failed. Try Again');
            close();
        }
    );
};

const markAsDelivered = () => {
    loading.value = true;
    markOrderAsDelivered(
        {
            id: positiveModalText.value.id,
        },

        (res) => {
            // positiveModalText.value.setAuthorised();
            positiveModalText.value.setDelivereyStatus();
            if (route.name === 'Orders Listing') {
                refetch();
            }
            Util.handleGlobalAlert(true, 'success', 'Successfully Marked As Delivered');

            close();
        },
        (error) => {
            Util.handleGlobalAlert(true, 'failed', error?.response?.data?.message ? error.response.data.message : 'Failed. Try Again');
            close();
        }
    );
};

const unblockAdmin = () => {
    loading.value = true;
    enableUser(
        {
            userId: positiveModalText.value.adminUser.id,
        },

        (res) => {
            // positiveModalText.value.setAuthorised();
            positiveModalText.value.setAdminUserStatus();
            Util.handleGlobalAlert(true, 'success', 'User Enabled');

            close();
        },
        (error) => {
            Util.handleGlobalAlert(true, 'failed', error?.response?.data?.message ? error.response.data.message : 'Failed. Try Again');
            close();
        }
    );
};

const resendAdminInvite = () => {
    const prepareDetails = () => {
        const adminUser = positiveModalText.value.adminUser;
        const obj = {
            photo: adminUser.photo,
            staffId: adminUser.staffId,
            userName: adminUser.userName,
            firstName: adminUser.firstName,
            lastName: adminUser.lastName,
            fullName: `${adminUser.firstName} ${adminUser.lastName}`,
            phoneCode: adminUser.phoneCode,
            phoneNumber: adminUser.phoneNumber,
            role: Number(adminUser.accountType),
            email: adminUser.email,
            emailConfirmed: true,
            phoneConfirmed: true,
        };

        return obj;
    };

    loading.value = true;
    createAdmin(
        prepareDetails(),

        (res) => {
            // positiveModalText.value.setAuthorised();
            // positiveModalText.value.setAdminUserStatus();
            Util.handleGlobalAlert(true, 'success', 'Successfully Invited User ');

            close();
        },
        (error) => {
            Util.handleGlobalAlert(true, 'failed', error?.response?.data?.message ? error.response.data.message : 'Failed. Try Again');
            close();
        }
    );
};

const unblockCustomer = () => {
    loading.value = true;
    updateCustomerProfile(
        //0 = active
        {
            userId: positiveModalText.value.customer.userId,
            profileStatus: 0,
        },

        (res) => {
            Util.handleGlobalAlert(true, 'success', 'Successfully Unblocked Customer');

            close();
        },
        (error) => {
            Util.handleGlobalAlert(true, 'failed', error?.response?.data?.message ? error.response.data.message : 'Failed. Try Again');
            close();
        }
    );
};

const action = () => {
    if (positiveModalText.value.title === 'Approve Vendor') {
        approveVendor();
    }
    if (positiveModalText.value.title === 'Activate Vendor') {
        activateVendor();
    }
    if (positiveModalText.value.title === 'Unblock Vendor') {
        unblockVendor();
    }

    if (positiveModalText.value.title === 'Mark as Paid') {
        markOrderAsPaid();
    }

    if (positiveModalText.value.actionName === 'Approve Product') {
        approveProduct();
    }

    if (positiveModalText.value.actionName === 'Authorize Request') {
        authorizeOrder();
    }

    if (positiveModalText.value.actionName === 'Mark As Delivered') {
        markAsDelivered();
    }

    if (positiveModalText.value.actionName === 'Unblock User') {
        unblockAdmin();
    }

    if (positiveModalText.value.actionName === 'Resend Admin Invite') {
        resendAdminInvite();
    }
    if (positiveModalText.value.actionName === 'Unblock Customer') {
        unblockCustomer();
    }
};
</script>
