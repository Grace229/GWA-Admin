<template>
    <div>
        <!-- {{ state.paymentInfo }} -->
        <!-- {{ form }} -->
        <div class="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="col-span-1">
                <label for="BVN" class="block text-sm font-medium text-[#344054]">BVN<span class="text-red-500 ml-1">*</span></label>
                <div class="mt-1">
                    <input
                        type="text"
                        name="BVN"
                        id="BVN"
                        placeholder="BVN"
                        autocomplete="off"
                        v-model="v$.BVN.$model"
                        :class="{
                            errorBorder: v$.BVN?.$errors[0]?.$message?.length > 0,
                        }"
                        class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                        aria-describedby="BVN-description"
                    />
                </div>

                <div class="text-red-400 mt-1 text-xs" v-for="error of v$.BVN.$errors" :key="error.$uid">
                    <div class="text-red-400">
                        {{ error.$message }}
                    </div>
                </div>
            </div>

            <div class="col-span-1">
                <label for="monthlyIncome" class="block text-sm font-medium text-[#344054]">Monthly Income<span class="text-red-500 ml-1">*</span></label>
                <div class="mt-1">
                    <!-- <input
                        type="text"
                        name="monthlyIncome"
                        id="monthlyIncome"
                        autocomplete="off"
                        v-model="v$.monthlyIncome.$model"
                        :class="{
                            errorBorder: v$.monthlyIncome?.$errors[0]?.$message?.length > 0,
                        }"
                        class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                        aria-describedby="monthlyIncome-description"
                    /> -->

                    <CurrencyInput
                        v-model="v$.monthlyIncome.$model"
                        :options="{
                            currency: 'ngn',

                            hideCurrencySymbolOnFocus: true,
                            hideGroupingSeparatorOnFocus: false,
                            hideNegligibleDecimalDigitsOnFocus: false,
                        }"
                    />
                </div>

                <div class="text-red-400 mt-1 text-xs" v-for="error of v$.monthlyIncome.$errors" :key="error.$uid">
                    <div class="text-red-400">
                        {{ error.$message }}
                    </div>
                </div>
            </div>

            <div class="col-span-1">
                <label for="tenor" class="block text-sm font-medium text-[#344054]">Tenor<span class="text-red-500 ml-1">*</span></label>
                <div class="mt-1">
                    <IdSelect class="h-[44px]" :options="tenorMenu" v-model="v$.tenor.$model" label="Select Tenor" />
                </div>

                <div class="text-red-400 mt-1 text-xs" v-for="error of v$.tenor.$errors" :key="error.$uid">
                    <div class="text-red-400">
                        {{ error.$message }}
                    </div>
                </div>
            </div>

            <div class="col-span-1">
                <label for="repaymentAmount" class="block text-sm font-medium text-[#344054]">Repayment Amount </label>
                <div class="mt-1">
                    <input
                        disabled
                        type="text"
                        name="repaymentAmount"
                        id="repaymentAmount"
                        autocomplete="off"
                        v-model="form.repaymentAmount"
                        class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                        aria-describedby="repaymentAmount-description"
                    />
                </div>

                <!-- <div class="text-red-400 mt-1 text-xs" v-for="error of v$.repaymentAmount.$errors" :key="error.$uid">
                    <div class="text-red-400">
                        {{ error.$message }}
                    </div>
                </div> -->
            </div>
        </div>

        <div class="mt-[26px]">
            <button
                @click="submit"
                :class="carPurchaseLoading || loading ? 'opacity-25' : 'opacity-100'"
                :disabled="carPurchaseLoading || loading"
                type="button"
                class="brandButton flex items-center justify-center rounded-lg w-[177px] py-[10px] font-semi-bold text-[14px]"
            >
                Next
                <SpinnerLoader v-if="carPurchaseLoading || loading" class="ml-2 h-[14px] w-[14px]" />
            </button>
        </div>
    </div>
</template>

<script setup>
import CurrencyInput from '@/components/reusable/CustomInputs/CurrencyInput.vue';
import { verifyBvn } from '@/services/CheckoutServices.js';
import useVuelidate from '@vuelidate/core';
import { required, helpers, numeric, maxLength, minLength } from '@vuelidate/validators';
import { reactive, ref, computed, inject, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import IdSelect from '@/components/reusable/CustomInputs/IdSelect.vue';
import { Log, Util, Constants } from '@/util';

onMounted(() => {
    // checkEstimate();
    checkConditionsAndReroute();
});
const router = useRouter();
const loading = ref(false);
const checkConditionsAndReroute = inject('checkConditionsAndReroute');

// const nextStep = inject('nextStep');
const state = inject('state');
const carPurchaseLoading = inject('carPurchaseLoading');
const checkEstimate = inject('checkEstimate');
const checkoutCarPurchase = inject('checkoutCarPurchase');
// const checkCredit = inject('checkCredit');

const form = reactive({
    repaymentAmount: computed(() => state.paymentInfo.repaymentAmountFormatted),
    BVN: '',
    monthlyIncome: '',
    tenor: '',
});

const tenorMenu = Constants.tenorMenu;

const rules = {
    // repaymentAmount: {
    //     required: helpers.withMessage('repaymentAmount is required', required),
    // },

    BVN: {
        required: helpers.withMessage('BVN is required', required),
        numeric: helpers.withMessage('BVN must be a number', numeric),
        maxLength: helpers.withMessage('BVN must not be more than 11 digits', maxLength(11)),
        minLength: helpers.withMessage('BVN must not be less than 11 digits', minLength(11)),
    },
    monthlyIncome: {
        required: helpers.withMessage('Monthly Income is required', required),
        // minValue: helpers.withMessage('Minimum value is 100', minValue(100)),
    },
    tenor: {
        required: helpers.withMessage('Tenor is required', required),
    },
};

const bvnVerification = () => {
    loading.value = true;
    verifyBvn(
        {
            bvnNumber: form.BVN,
        },
        (res) => {
            loading.value = false;
            if (res.data.data === true) {
                //if bvn is valid then set bvn data
                state.paymentInfo.bvn = form.BVN;
                checkoutCarPurchase();
            } else {
                Util.handleGlobalAlert(true, 'failed', 'Invalid BVN');
            }
        },
        (err) => {
            loading.value = false;
            Util.handleGlobalAlert(true, 'failed', err.response.data.message);
        }
    );
};

const v$ = useVuelidate(rules, form);
const submit = async () => {
    const validity = await v$.value.$validate();
    if (!validity) return;
    state.paymentInfo.tenor = form.tenor;
    state.paymentInfo.monthlyIncome = form.monthlyIncome;
    bvnVerification();
    // router.push('/settings/car-financing/auto-loan');
};

watch(
    () => form.tenor,
    () => {
        state.paymentInfo.tenor = form.tenor;
        checkEstimate();
    }
);
</script>

<style lang="scss" scoped></style>
