<template>
    <div class="col-span-2 grid grid-cols-2 gap-4">
        <div class="col-span-2">
            <label for="bank" class="block text-sm font-medium text-[#344054]">Bank</label>
            <div class="mt-1">
                <input
                    type="text"
                    name="bank"
                    id="bank"
                    autocomplete="off"
                    v-model="v$.bank.$model"
                    :class="{
                        errorBorder: v$.bank?.$errors[0]?.$message?.length > 0,
                    }"
                    class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                    aria-describedby="bank-description"
                />
            </div>

            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.bank.$errors" :key="error.$uid">
                <div class="text-red-400">
                    {{ error.$message }}
                </div>
            </div>
        </div>
        <div class="col-span-2">
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

        <div class="col-span-2 mt-[14px]"><button @click="makePayment" type="button" class="brandButton rounded-lg w-full py-[10px] font-semi-bold text-[14px]">Pay N1,500</button></div>
    </div>
</template>

<script setup>
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { ref, reactive, inject } from 'vue';

const loading = ref(false);
const toggleOTPModal = inject('toggleOTPModal');

const form = reactive({
    accountNumber: '',
    bank: '',
});

const rules = {
    accountNumber: {
        required: helpers.withMessage('Account Number is required', required),
    },

    bank: {
        required: helpers.withMessage('Bank is required', required),
    },
};

const v$ = useVuelidate(rules, form);

const makePayment = async () => {
    const validity = await v$.value.$validate();
    if (!validity) return;

    loading.value = true;

    console.log('open otp');

    toggleOTPModal();
};
</script>

<style lang="scss" scoped></style>
