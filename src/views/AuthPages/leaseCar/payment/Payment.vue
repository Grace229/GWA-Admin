<template>
    <!-- buy -->
    <div class="container pb-[75px]">
        <!-- {{ $route.name }} -->
        <div class="pb-[30px] pt-[51px] border-b">
            <GoBack class="" text="Back to results" @click="goBack" />
        </div>
        <div class="flex flex-col md:flex-row mt-[40px] gap-[36px]">
            <PaymentSidebar class="w-full max-w-[276px] hidden lg:block" />
            <div v-if="$route.params.step < 3" class="col-span-2 flex-1">
                <!-- ss{{ state.data.vendorName }}ss -->
                <!-- {{ vendorName }}vv -->
                <!-- <button class="bg-gray-50 p-4 rounded-md shadow-md" @click="logIt">Test {{ pickedMethod }}</button> -->

                <MainPlate>
                    <template v-slot:body>
                        <PaymentProcess />
                    </template>
                </MainPlate>
            </div>
            <InspectionReport class="col-span-3" v-if="$route.params.step == 3" />

            <AltDriveContract class="col-span-3" v-if="$route.params.step == 4" />

            <PriceBreakdownComponent v-if="route.params.step < 3" :showButton="false" class="w-full mx-auto sm:max-w-[400px] md:max-w-[250px]" />
        </div>
        <SuccessModal @done="goToOrders" title="Contract Approved" body="Your order is being processed and you will be notified when your car is ready for delivery" />
        <SuccessfulPaymentModal @done="goToOrders" title="Payment Successful" body="Your order is being processed and you will be notified on next steps via email" />

        <FloatingSidemenuModal class="lg:hidden">
            <template v-slot:menu-items>
                <PaymentSidebar class="w-full max-w-[276px] mt-32" />
            </template>
        </FloatingSidemenuModal>
    </div>
</template>

<script setup>
import InspectionReport from '@/views/AuthPages/leaseCar/payment/paymentProccess/InspectionReport.vue';
import PaymentSidebar from './PaymentSidebar.vue';
import FloatingSidemenuModal from '@/components/reusable/FloatingSidemenuModal.vue';
import AltDriveContract from './paymentProccess/AltDriveContract.vue';
import PaymentProcess from './paymentProccess/PaymentProcess.vue';
import SuccessfulPaymentModal from '/src/components/modals/SuccessfulPaymentModal.vue';
import MainPlate from './MainPlate.vue';
import GoBack from '@/components/reusable/GoBack.vue';
import PriceBreakdownComponent from '@/views/AuthPages/leaseCar/payment/PriceBreakdownComponent.vue';
import { useRouter } from 'vue-router';
import { getVehicleById } from '@/services/MarketPlace.js';
import { Log, Util, Constants } from '@/util';
import { ref, provide, reactive, computed, onMounted, inject, watch } from 'vue';
import { useRoute } from 'vue-router';
import SuccessModal from '/src/components/modals/SuccessModal.vue';
import { upfrontLease, upfrontRent } from '@/services/CheckoutServices.js';
import { useStore } from 'vuex';
import { checkoutLease, checkoutRent, checkoutEstimatePercent } from '@/services/CheckoutServices.js';

onMounted(() => {
    if (route.params.step < 3) {
        getVehicle();
    }
});
const sidebarOpen = ref(false);
const route = useRoute();
const router = useRouter();
const store = useStore();
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

// const vendorName = ref('');
// const logIt = () => {
//     prepareDetails();
// };

const state = reactive({
    data: {},
    // vendorName: store.getters['authToken/vendorInfo']?.vendorName,

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
        advance: '',
    },
});

const calculateUpfrontAmount = () => {
    amountCalcLoading.value = true;

    if (route.name === 'Lease Payment') {
        upfrontLease(
            {
                tenor: state.paymentInfo.tenor,
                vehicleId: state.data.id,
            },
            (res) => {
                amountCalcLoading.value = false;
                const data = res.data.data;
                state.paymentInfo.upfrontAmount = data.total;
                state.paymentInfo.repaymentAmount = data.monthlyPayment;
                state.paymentInfo.repaymentAmountFormatted = formatCurrency(data.monthlyPayment);
                state.paymentInfo.advance = formatCurrency(data.advancePayment);
                upfrontAmt.value = formatCurrency(data.total);
            },
            (err) => {
                amountCalcLoading.value = false;
            }
        );
    }
    if (route.name === 'Rent Payment') {
        upfrontRent(
            {
                tenor: state.paymentInfo.tenor,
                vehicleId: state.data.id,
            },
            (res) => {
                amountCalcLoading.value = false;
                const data = res.data.data;
                state.paymentInfo.upfrontAmount = data.total;
                state.paymentInfo.repaymentAmount = data.monthlyPayment;
                state.paymentInfo.repaymentAmountFormatted = formatCurrency(data.monthlyPayment);
                state.paymentInfo.advance = formatCurrency(data.advancePayment);
                upfrontAmt.value = formatCurrency(data.total);
            },
            (err) => {
                amountCalcLoading.value = false;
            }
        );
    }
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

const goBack = () => {
    if (route.name === 'Lease Payment') {
        if (route.params.step == 1) {
            router.push(`/lease_car/${route.params.id}`);
        } else if (route.params.step == 2) {
            router.push(`/lease_car/${route.params.id}/1`);
        } else if (route.params.step >= 3) {
            router.push('/settings/car-financing/leased-cars');
        }
    }

    if (route.name === 'Rent Payment') {
        if (route.params.step == 1) {
            router.push(`/rent_car/${route.params.id}`);
        } else if (route.params.step == 2) {
            router.push(`/rent_car/${route.params.id}/1`);
        } else if (route.params.step >= 3) {
            router.push('/settings/car-financing/rented-cars');
        }
    }
};

const resetPaymentInfo = () => {
    state.paymentInfo = {
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
        advance: '',
    };
    // recalculate total after resetting payment info
    calculateUpfrontAmount();
};

const prepareDetails = () => {
    const paymentInfo = state.paymentInfo;
    let obj = {};

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
        // vendorName: vendorName.value,
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
    };

    return obj;
};

const checkoutCarPurchase = () => {
    carPurchaseLoading.value = true;

    // alert(prepareDetails().vendorName);

    if (route.name === 'Lease Payment') {
        checkoutLease(
            prepareDetails(),
            (res) => {
                carPurchaseLoading.value = false;
                // if (pickedMethod.value === 'Card' || pickedMethod.value === 'Bank') {
                //     toggleOpenSuccessModal();
                //     return;
                // }

                Util.handleGlobalAlert(true, 'success', 'Your application has been submitted and would be reviewed');
                goToLeasedCars();
            },
            (err) => {
                carPurchaseLoading.value = false;

                Util.handleGlobalAlert(true, 'failed', err.response.data.message);
            }
        );
    }

    if (route.name === 'Rent Payment') {
        checkoutRent(
            prepareDetails(),
            (res) => {
                carPurchaseLoading.value = false;
                // if (pickedMethod.value === 'Card' || pickedMethod.value === 'Bank') {
                //     toggleOpenSuccessModal();
                //     return;
                // }

                Util.handleGlobalAlert(true, 'success', 'Your application has been submitted and would be reviewed');
                goToRentedCars();
            },
            (err) => {
                carPurchaseLoading.value = false;

                Util.handleGlobalAlert(true, 'failed', err.response.data.message);
            }
        );
    }
};

const goToLeasedCars = () => {
    router.push('/settings/car-financing/leased-cars');
};

const goToRentedCars = () => {
    router.push('/settings/car-financing/rented-cars');
};

const goToOrders = () => {
    // if (openContractApprovedModal.value === true) {
    //     openContractApprovedModal.value = false;
    // }
    // if (openSuccessModal.value === true) {
    //     openSuccessModal.value = false;
    // }

    if (Util.checkIndividualAuth()) {
        if (route.name === 'Lease Payment') {
            goToLeasedCars();
        }
        if (route.name === 'Rent Payment') {
            goToRentedCars();
        }
    }

    // if (Util.checkVendorAuth()) {
    //     router.push('/settings/car-financing/auto-loan');
    // }
};

const nextStep = () => {
    // if (route.params.step >= 5) {
    //     toggleContractApprovedModal();
    //     return;
    // }
    const newStep = Number(route.params.step) + 1;

    if (route.name === 'Lease Payment') {
        router.push(`/lease_car/${carId.value}/${newStep}`);
    }

    if (route.name === 'Rent Payment') {
        router.push(`/rent_car/${carId.value}/${newStep}`);
    }
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
            // vendorName.value = res.data.data.vendorName;

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

const checkEstimate = () => {
    checkoutEstimatePercent(
        {
            vehicleId: state.data.id,
            equityContribution: state.paymentInfo.upfrontPercentage,
            tenor: state.paymentInfo.tenor,
        },
        (res) => {
            state.paymentInfo.repaymentAmount = res.data.data.totaltoRepay;
            state.paymentInfo.repaymentAmountFormatted = formatCurrency(res.data.data.totaltoRepay);
        },
        (err) => {}
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
provide('sidebarOpen', sidebarOpen);

// provide("toggleContractApprovedModal", toggleContractApprovedModal)
</script>

<style lang="scss" scoped></style>
