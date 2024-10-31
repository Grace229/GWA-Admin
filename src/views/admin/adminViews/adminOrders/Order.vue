<template>
    <div>
        <div class="flex items-start justify-between mt-2 mb-[30px]">
            <GoBack class="" @click="$router.push('/admin/orders')" text="Back to Orders" />
            <!-- {{ canMarkAsDelivered() }}{{ role }} -->
            <div v-if="canSeeButtons()" class="">
                <div v-if="Constants.orderStatus[pickedOrder?.orderStatus] === 'pending'" class="flex gap-4">
                    <button @click="reject" class="cancelButton rounded text-[#F0203D] border border-[#F0203D] flex items-center justify-center px-[41px]">Reject</button>
                    <button @click="authorizeOrder" class="greenButton rounded">Authorize Request</button>
                </div>
                <div v-else>
                    <div v-if="Constants.paymentStatus[pickedOrder?.paymentStatus] === 'pending' && pickedOrder?.contractStatus == 1" class="flex gap-4">
                        <button @click="markAsPaid" class="greenButton rounded">Mark As Paid</button>
                    </div>

                    <div v-else-if="pickedOrder?.contractStatus == 1 && orderState.reportDocumentUploaded && checkDeliveryEligibility()" class="flex gap-4">
                        <div v-if="canMarkAsDelivered()">
                            <button @click="markAsDelivered" class="greenButton rounded">Mark As Delivered</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Navigator />

        <VehicleDetails v-if="currentPage === 'vehicle-details'" />

        <DocumentUpload v-if="currentPage === 'document-upload'" />
        <PositiveModal />
        <NegativeModal />
    </div>
</template>

<script setup>
import { Constants } from '@/util';
import GoBack from '@/components/reusable/GoBack.vue';
import { computed, provide, ref, inject, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import Navigator from '@/views/admin/adminViews/adminOrders/Nav.vue';
import VehicleDetails from '@/views/admin/adminViews/adminOrders/vehicleDetails/VehicleDetails.vue';
import DocumentUpload from '@/views/admin/adminViews/adminOrders/DocumentUpload.vue';
import PositiveModal from '@/views/admin/adminViews/reusable/PositiveModal.vue';
import NegativeModal from '@/views/admin/adminViews/reusable/NegativeModal.vue';
import { useStore } from 'vuex';
onUnmounted(() => {
    orderState.reportDocumentUploaded = false;
});
const store = useStore();
const route = useRoute();
const role = store.getters['authToken/roles'][0];
const refetchCount = ref(0);
const currentPage = computed(() => route.params.tab);
const currentId = computed(() => route.params.vehicleId);
const orderId = computed(() => route.params.orderId);
const customerId = computed(() => route.params.customerId);
// const orderId = computed(() => orderState.pickedOrder.id);
const orderState = inject('orderState');
const pickedOrder = computed(() => store.getters['admin/pickedOrder']);

//
const isPositiveModalOpen = ref(false);
const isNegativeModalOpen = ref(false);

const toggleNegativeModal = () => {
    isNegativeModalOpen.value = !isNegativeModalOpen.value;
};

const togglePositiveModal = () => {
    isPositiveModalOpen.value = !isPositiveModalOpen.value;
};

const canSeeButtons = () => {
    if (role === 'SuperAdmin') {
        return false;
    } else {
        return true;
    }
};

const canMarkAsDelivered = () => {
    if (role === 'FleetAdmin' || role === 'BusinessAdmin') {
        return true;
    } else {
        return false;
    }
};

const negativeModalText = ref({
    title: 'Reject Request',
    description: 'Are you sure you want to reject this car request for this customer?',
    buttonText: 'Confirm',
    actionName: 'Reject Order',
    id: orderId.value,
    setRejected: () => {
        store.commit('admin/pickedOrder', { ...pickedOrder.value, orderStatus: 4 });
        orderState.pickedOrder.orderStatus = 4;
    },
});

const positiveModalText = ref({
    title: 'Authorize Request',
    description: 'Are you sure you want to approve this car request for this customer?',
    buttonText: 'Confirm',
    actionName: 'Authorize Request',
    id: orderId.value,
    setAuthorised: () => {
        store.commit('admin/pickedOrder', { ...pickedOrder.value, orderStatus: 3 });

        orderState.pickedOrder.orderStatus = 3;
    },
});

const markAsDelivered = () => {
    positiveModalText.value = {
        title: 'Mark As Delivered',
        description: 'This is to certify that that vehicle order has been completed and delivered',
        buttonText: 'Confirm',
        actionName: 'Mark As Delivered',
        id: orderId.value,
        setDelivereyStatus: () => {
            store.commit('admin/pickedOrder', { ...pickedOrder.value, deliveryStatus: 1 });

            orderState.pickedOrder.deliveryStatus = 1;
        },
    };
    togglePositiveModal();
    return;
};

const markAsPaid = () => {
    positiveModalText.value = {
        title: 'Mark as Paid',
        description: 'Can you verify that this order has been paid for?',
        buttonText: 'Yes, confirm',
        actionName: 'Mark As Paid',
        order: {
            id: orderId.value,
        },
        setPaymentStatus: () => {
            store.commit('admin/pickedOrder', { ...pickedOrder.value, paymentStatus: 1 });

            orderState.pickedOrder.paymentStatus = 1;
        },
    };
    togglePositiveModal();
    return;
};

const checkDeliveryEligibility = () => {
    // const order = orderState.pickedOrder;
    const order = pickedOrder.value;

    if (order.paymentStatus === 0) {
        return false;
    }

    if (order?.deliveryStatus === 1) {
        return false;
    }

    if (order?.inspectionReportStatus === 0 || order?.inspectionReportStatus === 2) {
        return false;
    }

    return true;

    // if (Constants.orderStatus[order.paymentStatus] == 'pending' && Constants.deliveryStatus[order.deliveryStatus] == 'pending') {
    //     return true;
    // }
    // return false;
    // return order.paymentStatus !== 0 && order.deliveryStatus !== 1;
    // return `${Constants.orderStatus[order.paymentStatus]} - ${order.paymentStatus != 0} && ${Constants.deliveryStatus[order.deliveryStatus]} - ${order.deliveryStatus !== 1}`;
    // if (order.paymentStatus !== 0 && order.deliveryStatus !== 1) {
    //     return true;
    // } else {
    //     return false;
    // }
    // return order.paymentStatus;
};

//

const authorizeOrder = () => {
    positiveModalText.value = {
        title: 'Authorize Request',
        description: 'Are you sure you want to approve this car request for this customer?',
        buttonText: 'Confirm',
        actionName: 'Authorize Request',
        id: orderId.value,
        setAuthorised: () => {
            //eligibilityApproved
            store.commit('admin/pickedOrder', { ...pickedOrder.value, orderStatus: 1 });

            orderState.pickedOrder.orderStatus = 1;
        },
    };
    togglePositiveModal();
    return;
};

const reject = () => {
    toggleNegativeModal();
    return;
};

const refetchOrder = () => {
    //increase count to trigger watch function and refetch the order
    // refetchCount.value++;
};

provide('currentPage', currentPage);
provide('currentId', currentId);
provide('isPositiveModalOpen', isPositiveModalOpen);
provide('togglePositiveModal', togglePositiveModal);
provide('positiveModalText', positiveModalText);
provide('isNegativeModalOpen', isNegativeModalOpen);
provide('toggleNegativeModal', toggleNegativeModal);
provide('negativeModalText', negativeModalText);
provide('refetch', refetchOrder);
provide('refetchCount', refetchCount);
provide('orderId', orderId);
provide('customerId', customerId);
// provide('orderId', orderId);
</script>

<style lang="scss" scoped></style>
