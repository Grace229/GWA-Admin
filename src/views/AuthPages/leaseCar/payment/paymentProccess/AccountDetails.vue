<template>
    <div>
        <!-- {{ bankMenu }} -->
        <!-- {{ state.paymentInfo }} -->

        <div class="col-span-2 grid grid-cols-2 gap-x-4 gap-y-5">
            <div class="col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-1">
                <label for="bank" class="block text-sm font-medium text-[#344054]">Bank</label>
                <div class="mt-1">
                    <CustomSelect class="h-[44px]" :options="bankMenu" v-model="v$.bank.$model" label="Select Bank" />
                </div>

                <div class="text-red-400 mt-1 text-xs" v-for="error of v$.bank.$errors" :key="error.$uid">
                    <div class="text-red-400">
                        {{ error.$message }}
                    </div>
                </div>
            </div>
            <div class="col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-1">
                <label for="accountNumber" class="block text-sm font-medium text-[#344054]">Account Number</label>
                <div class="mt-1">
                    <input
                        type="text"
                        name="accountNumber"
                        id="accountNumber"
                        autocomplete="off"
                        v-model="v$.accountNumber.$model"
                        :class="{
                            errorBorder: v$.accountNumber?.$errors[0]?.$message?.length > 0,
                        }"
                        class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                        aria-describedby="accountNumber-description"
                    />
                </div>

                <div class="text-red-400 mt-1 text-xs" v-for="error of v$.accountNumber.$errors" :key="error.$uid">
                    <div class="text-red-400">
                        {{ error.$message }}
                    </div>
                </div>
            </div>
            <div class="col-span-2 lg:col-span-2 xl:col-span-1">
                <label for="SAFAccName" class="block text-sm font-medium text-[#344054]">The Alternative Bank Account Name (Optional)</label>
                <div class="mt-1">
                    <input
                        type="text"
                        name="SAFAccName"
                        id="SAFAccName"
                        autocomplete="off"
                        v-model="form.SAFAccName"
                        class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                        aria-describedby="SAFAccName-description"
                    />
                </div>
            </div>

            <div class="col-span-2 lg:col-span-2 xl:col-span-1">
                <label for="SAFAccountNumber" class="block text-sm font-medium text-[#344054]">The Alternative Bank Account Number (Optional)</label>
                <div class="mt-1">
                    <input
                        type="text"
                        name="SAFAccountNumber"
                        id="SAFAccountNumber"
                        autocomplete="off"
                        v-model="v$.SAFAccountNumber.$model"
                        :class="{
                            errorBorder: v$.SAFAccountNumber?.$errors[0]?.$message?.length > 0,
                        }"
                        class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                        aria-describedby="SAFAccountNumber-description"
                    />
                </div>

                <div class="text-red-400 mt-1 text-xs" v-for="error of v$.SAFAccountNumber.$errors" :key="error.$uid">
                    <div class="text-red-400">
                        {{ error.$message }}
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-[20px] cursor-pointer">
            <p class="text-[ #344054] font-normal text-xs">
                Don’t have an SAF Current account? <span class="font-semibold text-[#111322] underline"><a href="https://safonlineaccount.sterling.ng/index.html" target="_blank">Click here</a></span>
            </p>
        </div>
        <div class="mt-[26px]">
            <button
                @click="submit"
                :class="v$.$invalid ? 'opacity-25' : 'opacity-100'"
                :disabled="v$.$invalid"
                type="button"
                class="brandButton rounded-lg w-[177px] py-[10px] font-semi-bold text-[14px]"
            >
                Next
            </button>
        </div>
    </div>
</template>

<script setup>
import useVuelidate from '@vuelidate/core';
import { required, helpers, numeric, maxLength, minLength } from '@vuelidate/validators';
import { ref, reactive, inject, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { Log } from '/src/util';
import CustomSelect from '/src/components/reusable/CustomInputs/CustomSelect.vue';
import { getBanks } from '@/services/GeneralServices.js';
// import BankStatement from '@/views/AuthPages/leaseCar/payment/paymentProccess/BankStatement.vue';

onBeforeMount(() => {
    fetchBanks();
});
const loading = ref(false);
// const agree = ref(false);
const state = inject('state');
const carId = inject('carId');
const nextStep = inject('nextStep');
const router = useRouter();

const bankMenu = ref([]);
const form = reactive({
    accountNumber: '',
    SAFAccName: '',
    SAFAccountNumber: '',
    bank: '',
});

const rules = {
    accountNumber: {
        required: helpers.withMessage('Account Number is required', required),
        numeric: helpers.withMessage(' Account Number must be a number', numeric),
        maxLength: helpers.withMessage('Account Number must not be more than 10 digits', maxLength(10)),
        minLength: helpers.withMessage('Account Number must not be less than 10 digits', minLength(10)),
    },
    SAFAccountNumber: {
        numeric: helpers.withMessage('SAF Account Number must be a number', numeric),
        maxLength: helpers.withMessage('SAF Account Number  must not be more than 10 digits', maxLength(10)),
        minLength: helpers.withMessage('SAF Account Number  must not be less than 10 digits', minLength(10)),
    },

    bank: {
        required: helpers.withMessage('Bank is required', required),
    },
};
const v$ = useVuelidate(rules, form);
const submit = async () => {
    const validity = await v$.value.$validate();
    if (!validity) return;

    // console.log(form);

    loading.value = true;

    state.paymentInfo.bank = form.bank;
    state.paymentInfo.accountNumber = form.accountNumber;
    state.paymentInfo.safAccountNumber = form.SAFAccountNumber;
    state.paymentInfo.safAccountName = form.SAFAccName;

    // router.push('/settings/car-financing/auto-loan');
    // Util.handleGlobalAlert(true, 'success', 'Your application has been submitted and would be reviewed');

    nextStep();
    loading.value = false;
};

const fetchBanks = () => {
    getBanks(
        (res) => {
            const banks = res.data.data;
            bankMenu.value = banks.map((bank) => {
                const obj = {
                    id: bank.id,
                    name: bank.name,
                    text1: bank.name,
                    code: bank.code,
                };

                return obj;
            });
        },
        (err) => {}
    );
};
</script>

<style lang="scss" scoped></style>
