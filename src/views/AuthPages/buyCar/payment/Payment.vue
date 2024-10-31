<template>
    <!-- buy -->

    <div class="container pb-[75px]">
        <div class="pb-[30px] pt-[51px] border-b"><GoBack class="" text="Back to results" @click="goBack" /></div>
        <div class="flex flex-col md:flex-row mt-[40px] gap-[36px]">
            <PaymentSidebar class="w-full max-w-[276px] hidden lg:block" />
            <div v-if="$route.params.step < 4" class="col-span-2 flex-1">
                <MainPlate>
                    <template v-slot:body>
                        <SelectPaymentMethod v-if="$route.params.step === '1'" />

                        <PaymentProcess v-else />
                    </template>
                </MainPlate>
            </div>
            <InspectionReport class="col-span-3" v-if="$route.params.step == 4" />

            <AltDriveContract class="col-span-3" v-if="$route.params.step == 5" />

            <PriceBreakdownComponent v-if="route.params.step < 4" :showButton="true" class="w-full mx-auto sm:max-w-[400px] md:max-w-[250px]" />
        </div>
        <SuccessModal @done="goToAutoLoan" title="Contract Approved" body="Your order is being processed and you will be notified when your car is ready for delivery" />
        <SuccessfulPaymentModal @done="goToAutoLoan" title="Payment Successful" body="Your order is being processed and you will be notified on next steps via email" />

        <FloatingSidemenuModal class="lg:hidden">
            <template v-slot:menu-items>
                <PaymentSidebar class="w-full max-w-[276px] mt-32" />
            </template>
        </FloatingSidemenuModal>
    </div>
</template>

<script setup>
import FloatingSidemenuModal from '@/components/reusable/FloatingSidemenuModal.vue';
import AltDriveContract from '/src/views/AuthPages/buyCar/payment/paymentProccess/AltDriveContract.vue';
import InspectionReport from '/src/views/AuthPages/buyCar/payment/paymentProccess/InspectionReport.vue';
import PaymentProcess from '/src/views/AuthPages/buyCar/payment/paymentProccess/PaymentProcess.vue';
import SuccessfulPaymentModal from '/src/components/modals/SuccessfulPaymentModal.vue';
import SelectPaymentMethod from '/src/views/AuthPages/buyCar/payment/SelectPaymentMethod.vue';
import MainPlate from '/src/views/AuthPages/buyCar/payment/MainPlate.vue';
import GoBack from '/src/components/reusable/GoBack.vue';
import PriceBreakdownComponent from '@/components/reusable/PriceBreakdownComponent.vue';

import PriceBreakdown from '/src/views/AuthPages/buyCar/payment/PriceBreakdown.vue';
import PaymentSidebar from '/src/views/AuthPages/buyCar/payment/PaymentSidebar.vue';
import { useRouter } from 'vue-router';
import { getVehicleById } from '@/services/MarketPlace.js';
import { Log, Util, Constants } from '@/util';
import { ref, provide, reactive, computed, onMounted, onUnmounted, inject, watch } from 'vue';
import { useRoute } from 'vue-router';
import SuccessModal from '/src/components/modals/SuccessModal.vue';
import { upfrontAmount } from '@/services/CheckoutServices.js';
import { useStore } from 'vuex';
import { checkoutBuy, checkoutEstimatePercent } from '@/services/CheckoutServices.js';
import { makePayment } from '@/plugins/flutterwave';

onMounted(() => {
    if (route.params.step < 4) {
        getVehicle();
    }

    onFlutterResponse();
});
onUnmounted(() => {
    emptyOutPaymentRes();
});
const sidebarOpen = ref(false);
const route = useRoute();
const router = useRouter();

const paymentResponse = computed(
    () => store.getters['marketPlace/paymentResponse']
    // store.getters['authToken/userId']
);

// const logIt = () => {
//     prepareDetails();
// };
// const flutterKey
const flutterKey = import.meta.env.VITE_FLUTTER_KEY;
const store = useStore();
const email = computed(() => store.getters['authToken/email']);
const userId = computed(() => store.getters['authToken/userId']);
const name = computed(() => store.getters['authToken/fullName']);
const phoneNo = computed(() => store.getters['authToken/phoneCode'] + store.getters['authToken/phoneNumber']);
const formatCurrency = inject('formatCurrency');
const pickedMethod = ref('');
const amountCalcLoading = ref(false);
const upfrontAmt = ref(formatCurrency(0));
const openContractApprovedModal = ref(false);
const openSuccessModal = ref(false);
const carId = computed(() => route.params.id);
const loadingCarData = ref(false);
const step = computed(() => route.params.step);
const carPurchaseLoading = ref(false);
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
        repaymentAmountFormatted: '₦0.00',
        employmentType: 0,
        safAccountName: '',
        bvn: '',
    },
    carFetched: false,
});

const checkConditionsAndReroute = () => {
    // console.log('Method: ' + pickedMethod.value + 'and' + pickedMethod.value?.length === 0);

    // alert('hello');
    // alert('Method: ' + pickedMethod.value + 'and' + pickedMethod.value?.length === 0);
    if (pickedMethod.value?.length === 0) {
        // alert(pickedMethod.value + `/buy_car/${route.params.id}/1`);
        router.push(`/buy_car/${route.params.id}/1`);
    }
};

const goBack = () => {
    if (route.params.step == 1) {
        router.push(`/buy_car/${route.params.id}`);
    } else if (route.params.step == 2 || route.params.step == 3) {
        router.push(`/buy_car/${route.params.id}/1`);
    } else if (route.params.step >= 4) {
        router.push('/settings/car-financing/purchased-cars');
    }
};

const emptyOutPaymentRes = () => {
    store.commit('marketPlace/paymentResponse', {});
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
            // state.paymentInfo.repaymentAmount = res.data.data.repaymentAmount;
            // state.paymentInfo.repaymentAmountFormatted = formatCurrency(res.data.data.repaymentAmount);

            upfrontAmt.value = formatCurrency(res.data.data.upfrontAmount);
        },
        (err) => {
            amountCalcLoading.value = false;
        }
    );
};

const resetPaymentInfo = () => {
    state.paymentInfo = {
        upfrontPercentage: 15,
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
        repaymentAmountFormatted: '₦0.00',
        employmentType: 0,
        safAccountName: '',
        bvn: '',
    };
    // recalculate total after resetting payment info
    if (pickedMethod.value !== 'Sterling') {
        state.paymentInfo.upfrontPercentage = 100;
    }

    calculateUpfrontAmount();
};

const prepareDetails = () => {
    const paymentInfo = state.paymentInfo;
    let obj = {};

    if (pickedMethod.value === 'Sterling') {
        obj = {
            customerName: paymentInfo.customerName,
            product: `${state.data.brand} ${state.data.model}`,
            productId: state.data.id,
            vehicleYear: state.data.year,
            milleage: state.data.mileage,
            location: state.data.location,
            pictures: [...state.data.pictures],
            amount: state.data.price,
            vendorId: state.data.userId,
            buyerId: paymentInfo.buyerId,
            paymentMethod: paymentInfo.paymentMethod,
            safBuyInfo: {
                buyerId: paymentInfo.buyerId,
                upfrontPercentage: paymentInfo.upfrontPercentage,
                upFrontAmount: paymentInfo.upfrontAmount,
                safAccountNumber: paymentInfo.safAccountNumber,
                bank: paymentInfo.bank,
                accountNumber: paymentInfo.accountNumber,
                monthlyIncome: paymentInfo.monthlyIncome,
                tenor: paymentInfo.tenor,
                repaymentAmount: paymentInfo.repaymentAmount,
                employmentType: 0,
            },
            vendorName: state.data.vendorName,
            // safN: 'kaine',
        };
    } else {
        obj = {
            customerName: paymentInfo.customerName,
            product: `${state.data.brand} ${state.data.model}`,
            productId: state.data.id,
            vehicleYear: state.data.year,
            milleage: state.data.mileage,
            location: state.data.location,
            pictures: [...state.data.pictures],
            amount: state.data.price,
            vendorId: state.data.userId,
            buyerId: paymentInfo.buyerId,
            paymentMethod: paymentInfo.paymentMethod,
            vendorName: state.data.vendorName,
            // safN: 'kaine'
        };
    }

    return obj;
};

const creditCheckDetails = () => {
    const data = state.paymentInfo;
    const details = {
        bvn: data.bvn,
        safNo: '',
        bank: data.bank,
        accountNo: data.accountNumber,
        safAccountName: data.safAccountName,
        safAccountNo: data.safAccountNumber,
        monthlyIncome: data.monthlyIncome,
        tenor: data.tenor,
    };
    return details;
};

function makeFlutterPayment() {
    // const carId =
    makePayment({
        public_key: flutterKey,
        tx_ref: generateReference(),
        amount: state.paymentInfo.upfrontAmount,
        currency: 'NGN',
        payment_options: pickedMethod.value === 'Card' ? 'card' : 'banktransfer',
        // redirect_url: `/buy_car/${state.data.id}/1`,
        meta: {
            consumer_id: userId.value,
            consumer_mac: userId.value,
        },
        customer: {
            email: email.value,
            phone_number: phoneNo.value,
            name: name.value,
        },
        customizations: {
            title: 'AltDrive',
            description: 'Car Payment',
            logo: 'https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg',
        },
        callback: (response) => {
            makePaymentCallback(response);
        },
        onclose: closedPaymentModal(),
    });
}

const makePaymentCallback = (response) => {
    // alert('Win');
    store.commit('marketPlace/paymentResponse', response);
    // router.push(`/buy_car/${state.data.id}/1`);
    // console.log('Payment callback', response);
    goToAutoLoan();
};
const closedPaymentModal = () => {
    router.push(`/buy_car/${state.data.id}/1`);
    // console.log('payment modal is closed');
};
const generateReference = () => {
    let date = new Date();
    return 'Web' + date.getTime().toString();
};

const checkoutCarPurchase = () => {
    carPurchaseLoading.value = true;
    checkoutBuy(
        prepareDetails(),
        (res) => {
            carPurchaseLoading.value = false;
            if (pickedMethod.value === 'Card' || pickedMethod.value === 'Bank') {
                // toggleOpenSuccessModal();
                makeFlutterPayment();
                return;
            }

            Util.handleGlobalAlert(true, 'success', 'Your application has been submitted and would be reviewed');
            goToAutoLoan();
        },
        (err) => {
            carPurchaseLoading.value = false;

            Util.handleGlobalAlert(true, 'failed', err.response.data.message);
        }
    );
};

const checkEstimate = () => {
    checkoutEstimatePercent(
        {
            vehicleId: state.data.id,
            equityContribution: state.paymentInfo.upfrontPercentage,
            tenor: state.paymentInfo.tenor,
        },
        (res) => {
            state.paymentInfo.repaymentAmount = res.data.data.monthlyPayment;
            state.paymentInfo.repaymentAmountFormatted = formatCurrency(res.data.data.monthlyPayment);
        },
        (err) => {}
    );
};

const goToAutoLoan = () => {
    if (openContractApprovedModal.value === true) {
        openContractApprovedModal.value = false;
    }
    if (openSuccessModal.value === true) {
        openSuccessModal.value = false;
    }

    if (Util.checkIndividualAuth()) {
        router.push('/settings/car-financing/auto-loan');
    }

    // if (Util.checkVendorAuth()) {
    //     router.push('/settings/car-financing/auto-loan');
    // }
};

const nextStep = () => {
    if (route.params.step >= 5) {
        toggleContractApprovedModal();
        return;
    }
    const newStep = Number(route.params.step) + 1;
    router.push(`/buy_car/${carId.value}/${newStep}`);
};

const onFlutterResponse = () => {
    if (paymentResponse.value?.status?.toLowerCase() === 'successful') {
        toggleOpenSuccessModal();
    }
    // else if (paymentResponse.value?.status?.toLowerCase() !== 'successful') {
    //     Util.handleGlobalAlert(true, 'failed', paymentResponse.value?.status);

    //     emptyOutPaymentRes();
    // }
};

const toggleOpenSuccessModal = () => {
    openSuccessModal.value = !openSuccessModal.value;
};

const toggleContractApprovedModal = () => {
    openContractApprovedModal.value = !openContractApprovedModal.value;
};

const checkFinanceType = (financeType) => {
    if (Constants.financeOptions[financeType] === 'Lease') {
        router.push(`/lease_car/${route.params.id}/1`);
    } else if (Constants.financeOptions[financeType] === 'Rent') {
        router.push(`/rent_car/${route.params.id}/1`);
    } else if (Constants.financeOptions[financeType] === 'Buy') {
        router.push(`/buy_car/${route.params.id}/1`);
    }
};

const getVehicle = () => {
    loadingCarData.value = true;
    getVehicleById(
        carId.value,
        (res) => {
            loadingCarData.value = false;
            state.data = res.data.data;
            checkFinanceType(state.data.financeOption);

            // alert(res.data.message == 'Vehicle found');

            if (res.data.message == 'Vehicle found') {
                state.carFetched = true;
            }
            calculateUpfrontAmount();
        },
        (err) => {
            if (err.response.status === 400 || err.response.status === 404) {
                router.push('/404');
            }
            loadingCarData.value = false;
        }
    );
};

watch(pickedMethod, () => {
    resetPaymentInfo();
});
provide('toggleOpenSuccessModal', toggleOpenSuccessModal);
provide('openSuccessModal', openSuccessModal);
provide('openContractApprovedModal', openContractApprovedModal);
provide('pickedMethod', pickedMethod);
provide('state', state);
provide('carId', carId);
provide('nextStep', nextStep);
provide('step', step);
provide('calculateUpfrontAmount', calculateUpfrontAmount);
provide('upfrontAmt', upfrontAmt);
provide('amountCalcLoading', amountCalcLoading);
provide('checkoutCarPurchase', checkoutCarPurchase);
provide('carPurchaseLoading', carPurchaseLoading);
// provide('checkCredit', checkCredit);
provide('checkEstimate', checkEstimate);
// provide("toggleContractApprovedModal", toggleContractApprovedModal)
provide('loadingCarData', loadingCarData);
provide('checkConditionsAndReroute', checkConditionsAndReroute);
provide('sidebarOpen', sidebarOpen);
</script>

<style lang="scss" scoped></style>
