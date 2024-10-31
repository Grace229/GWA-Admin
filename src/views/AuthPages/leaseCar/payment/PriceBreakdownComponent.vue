<template>
    <div>
        <div class="rounded-lg bg-[#F9FAFB] border border-[#EFF1F5]">
            <div class="pt-[15px] pb-[13px] px-5 border-b border-[#EFF1F5]">
                <h3 class="text-xs font-semibold text-[#30374F]">Price Breakdown</h3>
            </div>
            <div class="flex flex-col px-5 pt-[21px] gap-[10px]">
                <div class="flex items-center justify-between">
                    <span class="text-[#5D6B98] font-normal text-xs">Advance</span>
                    <span class="text-xs font-semibold text-[#30374F]">{{ state.paymentInfo.advance }}</span>
                </div>
            </div>
            <!-- ss{{ showButton }} -->
            <div class="h-[1px] bg-[#EFF1F5] mt-[19px] mb-[14px]"></div>
            <div class="flex flex-col px-5">
                <div class="flex items-center justify-between mb-[21px]">
                    <span class="text-[#4A5578] font-semibold text-base">Total</span>
                    <span class="text-sm font-bold text-[#30374F]">{{ formatCurrency(state.paymentInfo.upfrontAmount) }}</span>
                </div>
                <button
                    :disabled="carPurchaseLoading || pickedMethod.length === 0"
                    :class="carPurchaseLoading || pickedMethod.length === 0 ? 'opacity-25' : 'opacity-100'"
                    v-if="$route.params.step == 1 && showButton"
                    @click="goNext"
                    class="mb-[21px] brandButton h-10 flex items-center justify-center"
                >
                    Next
                    <SpinnerLoader v-if="carPurchaseLoading" class="ml-2 h-[14px] w-[14px]" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
// import { checkoutFees } from '@/services/CheckoutServices.js';
import { Log } from '@/util';
onMounted(() => {
    // getPriceBreakdown();
});

const props = defineProps({
    showButton: {
        type: Boolean,
        default: false,
    },
});
// const route = useRoute();
const router = useRouter();
const pickedMethod = inject('pickedMethod');
const carId = inject('carId');
const state = inject('state');
const formatCurrency = inject('formatCurrency');

const calculateUpfrontAmount = inject('calculateUpfrontAmount');

const nextStep = inject('nextStep');
const checkoutCarPurchase = inject('checkoutCarPurchase');
const carPurchaseLoading = inject('carPurchaseLoading');

// const breakdown = computed(() => [
//     {
//         title: 'Order Amount',
//         value: '4,500,000',
//     },
//     {
//         title: 'Vehicle Insurance',
//         value: '120,000',
//     },
//     {
//         title: 'Vehicle Registration',
//         value: '50,000',
//     },
//     {
//         title: 'Vehicle Tracking',
//         value: '25,000',
//     },
//     {
//         title: 'Vehicle Inspection',
//         value: '10,000',
//     },
// ]);

// const getTotal = () => {

// }

// {advancePayment: 45000, total: 0, monthlyPayment: 15000}

// const breakdown = ref({});

const goNext = () => {
    if (pickedMethod.value === 'Card') {
        checkoutCarPurchase();
        return;
    }
    if (pickedMethod.value === 'Bank') {
        checkoutCarPurchase();
        return;
    }
    if (pickedMethod.value === 'Sterling') {
        // route.params.step = 'account_details';
        nextStep();
        return;
    }
};
</script>

<style lang="scss" scoped></style>
