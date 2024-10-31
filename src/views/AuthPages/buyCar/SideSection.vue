<template>
    <div class="flex flex-col gap-[30px]">
        <div class="flex flex-col pt-[25px] pb-[31px] px-4 bg-[#F9F9FB] border border-[#DCDFEA] rounded-[5px]">
            <h2 class="font-semibold text-base text-[#30374F] mb-[10px]">Get the {{ details.year }} {{ details.brand }} {{ details.model }} at a price you’ll love</h2>
            <p class="font-normal text-[#4A5578] text-xs mb-[20px]">We take the hassle and haggle out of car buying by finding you great deals from local and national dealers</p>
            <div class="mb-[5px] flex flex-col font-normal text-sm text-[#4A5578] gap-[19px]">
                <span class="flex items-center gap-1"
                    ><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.99967 1.33398V3.00065M7.99967 1.33398C4.31778 1.33398 1.33301 4.31875 1.33301 8.00065M7.99967 1.33398C11.6816 1.33398 14.6663 4.31875 14.6663 8.00065M7.99967 13.0007V14.6673M7.99967 14.6673C11.6816 14.6673 14.6663 11.6826 14.6663 8.00065M7.99967 14.6673C4.31778 14.6673 1.33301 11.6826 1.33301 8.00065M2.99967 8.00065H1.33301M14.6663 8.00065H12.9997M12.7186 12.7196L11.5361 11.5371M3.28076 12.7196L4.46444 11.5359M3.28076 3.33398L4.4384 4.49162M12.7186 3.33398L8.99961 7.00065M9.33301 8.00065C9.33301 8.73703 8.73605 9.33398 7.99967 9.33398C7.2633 9.33398 6.66634 8.73703 6.66634 8.00065C6.66634 7.26427 7.2633 6.66732 7.99967 6.66732C8.73605 6.66732 9.33301 7.26427 9.33301 8.00065Z"
                            stroke="#4A5578"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    {{ details.mileage == 0 ? '0.00' : formatCurrency(details.mileage).slice(1, details.mileage) }} miles
                </span>

                <span class="flex items-center gap-1"
                    ><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2.5 9C2.5 8.44688 2.94781 8 3.5 8C4.05312 8 4.5 8.44688 4.5 9C4.5 9.55313 4.05312 10 3.5 10C2.94781 10 2.5 9.55313 2.5 9ZM13.5 9C13.5 9.55313 13.0531 10 12.5 10C11.9469 10 11.5 9.55313 11.5 9C11.5 8.44688 11.9469 8 12.5 8C13.0531 8 13.5 8.44688 13.5 9ZM1.50312 5.9L2.57344 2.84156C2.95937 1.73844 4 1 5.16875 1H10.8313C11.9719 1 13.0406 1.73844 13.4281 2.84156L14.4969 5.9C15.3938 6.41875 16 7.3875 16 8.5V14.25C16 14.6656 15.6656 15 15.25 15C14.8344 15 14.5 14.6656 14.5 14.25V12.5H1.5V14.25C1.5 14.6656 1.16406 15 0.75 15C0.335938 15 0 14.6656 0 14.25V8.5C0 7.3875 0.604687 6.41875 1.50312 5.9ZM3.23125 5.5H12.7688L12.0094 3.3375C11.8344 2.83563 11.3625 2.5 10.8313 2.5H5.16875C4.6375 2.5 4.16563 2.83563 3.99062 3.3375L3.23125 5.5ZM13 7H3C2.17156 7 1.5 7.67188 1.5 8.5V11H14.5V8.5C14.5 7.67188 13.8281 7 13 7Z"
                            fill="#4A5578"
                        />
                    </svg>

                    {{ details.condition }}</span
                >
                <span class="flex items-center gap-1"
                    ><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.00033 8.66732C9.10489 8.66732 10.0003 7.77189 10.0003 6.66732C10.0003 5.56275 9.10489 4.66732 8.00033 4.66732C6.89576 4.66732 6.00033 5.56275 6.00033 6.66732C6.00033 7.77189 6.89576 8.66732 8.00033 8.66732Z"
                            stroke="#4A5578"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M8.00033 14.6673C10.667 12.0007 13.3337 9.61284 13.3337 6.66732C13.3337 3.7218 10.9458 1.33398 8.00033 1.33398C5.05481 1.33398 2.66699 3.7218 2.66699 6.66732C2.66699 9.61284 5.33366 12.0007 8.00033 14.6673Z"
                            stroke="#4A5578"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                    {{ details.location }}</span
                >
            </div>
            <h1 class="font-bold text-[24px] text-[#4A5578] mt-5">{{ formatCurrency(details.price) }}</h1>
            <span v-if="financeOptions[details.financeOption] === 'Rent' || financeOptions[details.financeOption] === 'Lease'" class="mt-[6px] mb-[25px] text-xs font-medium text-[#FF6600]"
                >Starting at {{ formatCurrency(details.price) }}/mo</span
            >

            <span v-else class="mt-[6px] mb-[25px] text-xs font-medium text-[#FF6600]">Starting at N650,000/mo</span>
            <!-- {{ financeOptions[details.financeOption] }} -->
            <button v-if="financeOptions[details.financeOption] === 'Buy'" @click="goToPayment(financeOptions[details.financeOption])" class="brandButton">Buy this Car</button>
            <button v-if="financeOptions[details.financeOption] === 'Rent'" @click="goToPayment(financeOptions[details.financeOption])" class="brandButton">Rent this Car</button>
            <button v-if="financeOptions[details.financeOption] === 'Lease'" @click="goToPayment(financeOptions[details.financeOption])" class="brandButton">Lease this Car</button>
        </div>

        <div class="flex flex-col border border-[#DCDFEA] rounded-[5px]">
            <div class="rounded-t-[5px] py-[28px] px-[48px] font-medium text-sm text-[#ffffff] bg-[#475467] text-center"><p>Let's estimate your monthly car loan payment</p></div>
            <div class="bg-[#F9FAFB] rounded-b-[5px]">
                <div class="px-5 pt-[33px]">
                    <div class="mb-5">
                        <label for="cost" class="block text-xs font-medium text-[#344054]">Vehicle Cost </label>
                        <div class="mt-1">
                            <input
                                disabled
                                v-model="state.vehicleCost"
                                type="text"
                                name="cost"
                                id="cost"
                                autocomplete="off"
                                class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                aria-describedby="cost-description"
                            />
                        </div>
                    </div>

                    <div class="mb-5">
                        <label for="equityContribution" class="block text-xs font-medium text-[#344054]">Equity Contribution </label>
                        <div class="mt-1">
                            <!-- {{ minimumAmount }} -->
                            <CurrencyInput
                                id="equityControId"
                                v-model="state.values.equityContribution"
                                :options="{
                                    currency: 'ngn',

                                    hideCurrencySymbolOnFocus: true,
                                    hideGroupingSeparatorOnFocus: false,
                                    hideNegligibleDecimalDigitsOnFocus: false,
                                }"
                            />
                        </div>

                        <div v-if="state.values.equityContribution < minimumAmount.toFixed(2)" class="text-red-400 mt-1 text-xs">
                            <div class="text-red-400">Minimum value is {{ formatCurrency(minimumAmount.toFixed(2)) }}</div>
                        </div>
                    </div>

                    <div class="col-span-1">
                        <div for="Tenor" class="flex items-center justify-between text-xs font-medium text-[#344054]">
                            <span>Tenor</span> <span>{{ state.values.tenor }} Months</span>
                        </div>
                        <div class="mt-1">
                            <!-- <input class="" type="range" multiple v-model="state.values.tenor" min="0" max="36" @input="updateRangeValues" /> -->

                            <input class="rangeSlider" type="range" v-model="state.values.tenor" min="0" max="36" @input="updateRangeValues" />
                        </div>
                    </div>

                    <!-- <div>{{ state.values.tenor }}</div> -->

                    <!-- <span>{{ state.values.equityContribution }}</span> -->
                </div>
                <!-- {{ `${formatCurrency(state.estimate.monthlyPayment).length > estimateCssLength}  ${formatCurrency(state.estimate.amountToFinance).length > estimateCssLength}` }} -->
                <div
                    :class="
                        formatCurrency(state.estimate.monthlyPayment).length > estimateCssLength || formatCurrency(state.estimate.amountToFinance).length > estimateCssLength
                            ? 'grid-cols-1 gap-2'
                            : 'grid-cols-2'
                    "
                    class="rounded-b-[5px] grid pt-5 px-5 pb-[25px] mt-[38px] border-t border-[#EAECF0]"
                >
                    <div class="flex flex-col col-span-1">
                        <h2 class="font-semibold text-base text-[#1D2939]">{{ formatCurrency(state.estimate.amountToFinance) }}</h2>
                        <p class="font-normal text-sm text-[#667085]">Amount to Finance</p>
                    </div>

                    <div
                        :class="
                            formatCurrency(state.estimate.monthlyPayment).length > estimateCssLength || formatCurrency(state.estimate.amountToFinance).length > estimateCssLength
                                ? 'text-left'
                                : 'text-right'
                        "
                        class="flex flex-col col-span-1"
                    >
                        <h2 class="font-semibold text-base text-[#1D2939]">{{ formatCurrency(state.estimate.monthlyPayment) }}</h2>
                        <p class="font-normal text-sm text-[#667085]">Monthly Payment</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { checkoutEstimate } from '@/services/CheckoutServices.js';
import { onMounted, computed, ref, reactive, defineProps, inject, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Log, Util } from '@/util';
// import { required, helpers, minValue, numeric } from '@vuelidate/validators';
// import useVuelidate from '@vuelidate/core';

import IdSelect from '@/components/reusable/CustomInputs/IdSelect.vue';
import CurrencyInput from '@/components/reusable/CustomInputs/CurrencyInput.vue';

onMounted(() => {
    // console.log(carId.value);
    estimate();
});
const estimateCssLength = 10;
const minimumAmount = ref(0);
const formatCurrency = inject('formatCurrency');
const props = defineProps(['details']);
const store = useStore();
const loggedIn = computed(() => store.getters['authToken/loggedIn']);
const isIndividual = Util.checkIndividualAuth();

const router = useRouter();
const route = useRoute();
const carId = computed(() => route.params.id);

const state = reactive({
    vehicleCost: computed(() => formatCurrency(props.details.price)),
    values: {
        amount: computed(() => props.details.price),
        equityContribution: 0,
        tenor: 36,
    },

    estimate: { upfront: 0, amountToFinance: 0, monthlyPayment: 0, minimumAmount: 0 },
});
const financeOptions = ['Buy', 'Lease', 'Rent'];

// const rules = {
//     equityContribution: {
//         required: helpers.withMessage(`Field is required  ${minimumAmount.value}`, required),
//         numeric: helpers.withMessage('Field must be a number', numeric),
//         minValue: helpers.withMessage(`Minimum value is ${minimumAmount.value}`, minValue(minimumAmount.value)),
//     },
// };

// const v$ = useVuelidate(rules, form);

const goToPayment = (financeType) => {
    if (loggedIn.value === false) {
        Util.handleGlobalAlert(true, 'failed', 'You need to login as a customer');
        // alert(`/login?redirected_from=${route.fullPath}`);
        router.push(`/login?redirected_from=${route.fullPath}`);
        return;
    }

    if (isIndividual) {
        if (financeType === 'Buy') {
            router.push(`/buy_car/${carId.value}/1`);
        }
        if (financeType === 'Rent') {
            router.push(`/rent_car/${carId.value}/1`);
        }

        if (financeType === 'Lease') {
            router.push(`/lease_car/${carId.value}/1`);
        }
    } else {
        Util.handleGlobalAlert(true, 'failed', 'You need to login as a customer');

        router.push(`/login?redirected_from=${route.fullPath}`);

        return;
    }
};

const updateRangeValues = () => {};

const estimate = async () => {
    // const validity = await v$.value.$validate();
    // if (!validity) return;
    if (state.values.equityContribution < minimumAmount.value.toFixed(2)) {
        return;
    }

    checkoutEstimate(
        {
            amount: state.values.amount,
            equityContribution: state.values.equityContribution,
            tenor: Number(state.values.tenor),
        },
        (res) => {
            const data = res.data.data;

            state.estimate.upfront = data.upfront;
            state.estimate.amountToFinance = data.amountToFinance;
            state.estimate.monthlyPayment = data.monthlyPayment;
            minimumAmount.value = data.minimumAmount;
            // state.values.equityContribution = data.minimumAmount;
            // document.getElementById('equityControId').value = data.minimumAmount;
        },
        (err) => {}
    );
};

watch(
    () => state.values,
    () => {
        if (state.values.equityContribution === null) {
            state.values.equityContribution = 0;
            return;
        }
        estimate();
    },
    { deep: true }
);

watch(minimumAmount, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        // state.values.equityContribution = newValue;
        // document.getElementById('equityControId').value = newValue;
    }
});
</script>

<style lang="scss" scoped>
input[type='range'] {
    -webkit-appearance: none;
    // overflow: hidden;
    width: 100%;
    height: 5px;
    border-radius: 5px;
    background: linear-gradient(270deg, #f60e0e 0.12%, #ffa800 99.99%);
    outline: none;
    margin: 10px 0;
}

// input[type='range']:focus {
//     outline: none;
// }

input[type='range']::-webkit-slider-thumb {
    // position: absolute;

    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    -webkit-appearance: none;
    // box-shadow: -200px 0 0 200px red;
    background: linear-gradient(270deg, #f60e0e 0.12%, #ffa800 99.99%);
    // z-index: 10;
    cursor: pointer;
}

input[type='range']::-moz-range-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    -webkit-appearance: none;
    // box-shadow: -200px 0 0 200px red;
    background: linear-gradient(270deg, #f60e0e 0.12%, #ffa800 99.99%);
    // z-index: 10;
    cursor: pointer;
}
</style>
