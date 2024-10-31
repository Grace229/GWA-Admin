<template>
    <div>
        <div class="flex items-center justify-between mt-2">
            <GoBack class="mb-[30px]" @click="$router.push('/admin/products')" text="Back to Products" />

            <!-- <div v-if="canSeeButtons()">
                <div v-if="productState?.fetchedProductDetails?.status" class="">
                    <div
                        v-if="
                            Constants.vehicleStatus[productState.fetchedProductDetails.status] !== 'Published' &&
                            Constants.vehicleStatus[productState.fetchedProductDetails.status] !== 'Rejected' &&
                            Constants.vehicleStatus[productState.fetchedProductDetails.status] !== 'Sold'
                        "
                        class="flex gap-4"
                    >
                        <button @click="reject" class="cancelButton rounded text-[#F0203D] border border-[#F0203D] flex items-center justify-center px-[41px]">Reject</button>
                        <button @click="approve" class="greenButton rounded">Approve</button>
                    </div>
                </div>
            </div> -->
            <!-- {{ Constants.vehicleStatus[productState?.fetchedProductDetails?.status] }} -->
            <div>
                <div v-if="productState?.fetchedProductDetails?.status" class="">
                    <div v-if="Constants.vehicleStatus[productState.fetchedProductDetails.status] !== 'Sold'" class="flex gap-4">
                        <button @click="reject" class="cancelButton rounded text-[#F0203D] border border-[#F0203D] flex items-center justify-center px-[41px]">Reject</button>
                        <button @click="approve" class="greenButton rounded">Approve</button>
                    </div>
                </div>
            </div>
        </div>
        <Navigator />
        <!-- <router-view></router-view> -->

        <VehicleDetails />
        <PositiveModal />
        <NegativeModal />
    </div>
</template>

<script setup>
import { getProduct, getVendor } from '@/services/AdminServices';
import GoBack from '@/components/reusable/GoBack.vue';
import { computed, provide, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import Navigator from './Nav.vue';
import { Log, Constants } from '@/util';
import { useStore } from 'vuex';
import PositiveModal from '@/views/admin/adminViews/reusable/PositiveModal.vue';
import NegativeModal from '@/views/admin/adminViews/reusable/NegativeModal.vue';
import VehicleDetails from './VehicleDetails.vue';

onMounted(() => {
    getAProduct();
});

const route = useRoute();
const store = useStore();
const role = store.getters['authToken/roles'][0];
const userId = computed(() => store.getters['authToken/userId']);
const currentPage = computed(() => route.params.tab);
const currentId = computed(() => route.params.vehicleId);
const productState = reactive({
    fetchedProductDetails: {},
    vendorDetails: {},
});
const productLoading = ref(false);

const detailsLoading = ref(false);

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
    }
};
const negativeModalText = ref({
    title: 'Reject Vehicle',
    description: 'Are you sure you want to reject this vehicle?',
    buttonText: 'Confirm',
    actionName: 'Reject Product',
    userId: userId.value,
});

const positiveModalText = ref({
    title: 'Approve Vehicle',
    description: 'Are you sure you want to approve this vehicle?',
    buttonText: 'Confirm',
    actionName: 'Approve Product',
    userId: userId.value,
    car: {},
});

//

const approve = () => {
    positiveModalText.value.car = {
        id: currentId.value,
    };
    togglePositiveModal();
    return;
};

const reject = () => {
    negativeModalText.value.car = {
        id: currentId.value,
    };
    toggleNegativeModal();
    return;
};

const fetchVendor = () => {
    detailsLoading.value = true;
    getVendor(
        productState.fetchedProductDetails.userId,
        (res) => {
            productState.vendorDetails = res.data.data;
            detailsLoading.value = false;
        },
        (err) => {}
    );
};
const getAProduct = () => {
    productLoading.value = true;
    getProduct(
        currentId.value,
        (res) => {
            productState.fetchedProductDetails = res.data.data;

            fetchVendor();
            productLoading.value = false;
        },
        (err) => {
            productLoading.value = false;
        }
    );
};

const refetch = () => {
    getProduct(
        currentId.value,
        (res) => {
            productState.fetchedProductDetails = res.data.data;

            fetchVendor();
        },
        (err) => {}
    );
};
provide('currentPage', currentPage);
provide('currentId', currentId);
provide('productState', productState);
provide('productLoading', productLoading);
// provide('productLoading', productLoading);
provide('isPositiveModalOpen', isPositiveModalOpen);
provide('togglePositiveModal', togglePositiveModal);
provide('positiveModalText', positiveModalText);
provide('isNegativeModalOpen', isNegativeModalOpen);
provide('toggleNegativeModal', toggleNegativeModal);
provide('negativeModalText', negativeModalText);
provide('refetch', refetch);
</script>

<style lang="scss" scoped></style>
