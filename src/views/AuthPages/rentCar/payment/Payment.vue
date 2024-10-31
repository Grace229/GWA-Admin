<template>
    <!-- rent -->
    <div class="container pb-[75px]">
        <div class="pb-[30px] pt-[51px] border-b">
            <GoBack class="" text="Back to results" @click="$router.go(-1)" />
        </div>
        <div class="flex mt-[40px] gap-[36px]">
            <PaymentSidebar class="w-full max-w-[276px]" />
            <div v-if="$route.params.step < 2" class="col-span-2 flex-1 max-w-[589px]">
                <MainPlate>
                    <template v-slot:body>
                        <CreditCheck v-if="$route.params.step == 1" />
                    </template>
                </MainPlate>
            </div>

            <PriceBreakdownComponent v-if="state.bvnIsVerified && route.params.step < 2" class="w-full max-w-[250px]" />
            <ContractReview class="col-span-3" v-if="$route.params.step == 2" />
        </div>
        <!-- <SuccessfulPaymentModal title="Payment Successful" body="Your order is being processed and you will be notified on next steps via email" /> -->
    </div>
</template>

<script setup>
// import SuccessfulPaymentModal from '/src/components/modals/SuccessfulPaymentModal.vue';
import CreditCheck from '/src/views/AuthPages/rentCar/payment/paymentProccess/CreditCheck.vue';
import MainPlate from '/src/views/AuthPages/rentCar/payment/MainPlate.vue';
import GoBack from '/src/components/reusable/GoBack.vue';
import { Log, Util } from '@/util';
import { getVehicleById } from '@/services/MarketPlace.js';
import PriceBreakdownComponent from '@/components/reusable/PriceBreakdownComponent.vue';
import PaymentSidebar from '/src/views/AuthPages/rentCar/payment/PaymentSidebar.vue';
import ContractReview from '/src/views/AuthPages/rentCar/payment/paymentProccess/ContractReview.vue';
import { ref, provide, reactive, computed, onMounted, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { upfrontAmount } from '@/services/CheckoutServices.js';

onMounted(() => {
    getVehicle();
});
const store = useStore();

const route = useRoute();
const router = useRouter();
const pickedMethod = ref('Sterling');
const openSuccessModal = ref(false);
const formatCurrency = inject('formatCurrency');

const carId = computed(() => route.params.id);
const loadingCarData = ref(false);
const amountCalcLoading = ref(false);
const pickedMethodEnum = {
    Card: 0,
    Bank: 1,
    Sterling: 2,
};

const state = reactive({
    data: {},
    paymentInfo: {
        upfrontPercentage: 100,
        upfrontAmount: 0,
        bank: '',
        accountNumber: '',
        safAccountNumber: '',
        customerName: store.getters['authToken/fullName'],
        product: '',
        productId: '',
        amount: 0,
        vendorId: '',
        paymentMethod: computed(() => pickedMethodEnum[pickedMethod.value]),
        buyerId: store.getters['authToken/userId'],
        monthlyIncome: 0,
        tenor: 0,
        repaymentAmount: 0,
        repaymentAmountFormatted: '',
        employmentType: 0,
    },
    bvnIsVerified: false,
});

const step = computed(() => route.params.step);

const nextStep = () => {
    if (route.name === 'Rent Payment') {
        if (route.params.step >= 2) {
            router.push('/settings/car-financing/rented-cars');
            return;
        }
        ('/settings/car-financing/auto-loan');
        const newStep = Number(route.params.step) + 1;
        router.push(`/rent_car/${carId.value}/${newStep}`);
    }

    // if (route.name === 'Lease Payment') {
    //     if (route.params.step >= 2) {
    //         router.push('/settings/car-financing/leaseded-cars');
    //         return;
    //     }
    //     ('/settings/car-financing/auto-loan');
    //     const newStep = Number(route.params.step) + 1;
    //     router.push(`/rent_car/${carId.value}/${newStep}`);
    // }
};

const calculateUpfrontAmount = () => {
    amountCalcLoading.value = true;
    upfrontAmount(
        {
            percentage: state.paymentInfo.upfrontPercentage,
            vehicleId: state.data.id,
        },
        (res) => {
            amountCalcLoading.value = false;

            state.paymentInfo.upfrontAmount = res.data.data.upfrontAmount;
            state.paymentInfo.repaymentAmount = res.data.data.repaymentAmount;
            state.paymentInfo.repaymentAmountFormatted = formatCurrency(res.data.data.repaymentAmount);

            // upfrontAmt.value = formatCurrency(res.data.data.upfrontAmount);
        },
        (err) => {
            amountCalcLoading.value = false;
        }
    );
};

const getVehicle = () => {
    loadingCarData.value = true;
    getVehicleById(
        carId.value,
        (res) => {
            loadingCarData.value = false;
            state.data = res.data.data;

            calculateUpfrontAmount();
        },
        (err) => {
            loadingCarData.value = false;
        }
    );
};

const toggleOpenSuccessModal = () => {
    openSuccessModal.value = !openSuccessModal.value;
};

provide('toggleOpenSuccessModal', toggleOpenSuccessModal);
provide('openSuccessModal', openSuccessModal);
provide('state', state);
provide('carId', carId);
provide('nextStep', nextStep);
provide('step', step);
provide('pickedMethod', pickedMethod);
</script>

<style lang="scss" scoped></style>
