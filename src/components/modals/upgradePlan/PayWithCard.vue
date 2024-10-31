<template>
    <div class="col-span-2 grid grid-cols-2 gap-4">
        <div class="col-span-2">
            <label for="cardNumber" class="block text-sm font-medium text-[#344054]">Card Number</label>
            <div class="mt-1 relative">
                <input
                    type="text"
                    name="cardNumber"
                    id="cardNumber"
                    autocomplete="off"
                    v-model="v$.cardNumber.$model"
                    :class="{
                        errorBorder: v$.cardNumber?.$errors[0]?.$message?.length > 0,
                    }"
                    class="block w-full pl-[52px] border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                    aria-describedby="cardNumber-description"
                />

                <div class="absolute inset-y-0 left-[10px] flex items-center"><img src="/src/assets/svg/PaymentMethodIcon.svg" alt="" /></div>
            </div>

            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.cardNumber.$errors" :key="error.$uid">
                <div class="text-red-400">
                    {{ error.$message }}
                </div>
            </div>
        </div>

        <div class="col-span-1">
            <label for="expiry" class="block text-sm font-medium text-[#344054]">Expiry</label>
            <div class="mt-1">
                <input
                    type="text"
                    name="expiry"
                    id="expiry"
                    autocomplete="off"
                    v-model="v$.expiry.$model"
                    :class="{
                        errorBorder: v$.expiry?.$errors[0]?.$message?.length > 0,
                    }"
                    class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                    aria-describedby="expiry-description"
                />
            </div>

            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.expiry.$errors" :key="error.$uid">
                <div class="text-red-400">
                    {{ error.$message }}
                </div>
            </div>
        </div>

        <div class="col-span-1">
            <label for="cvv" class="block text-sm font-medium text-[#344054]">CVV</label>
            <div class="mt-1">
                <input
                    type="text"
                    name="cvv"
                    id="cvv"
                    autocomplete="off"
                    v-model="v$.cvv.$model"
                    :class="{
                        errorBorder: v$.cvv?.$errors[0]?.$message?.length > 0,
                    }"
                    class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                    aria-describedby="cvv-description"
                />
            </div>

            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.cvv.$errors" :key="error.$uid">
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
    cardNumber: '',
    expiry: '',
    cvv: '',
});

const rules = {
    cardNumber: {
        required: helpers.withMessage('Card Number is required', required),
    },

    expiry: {
        required: helpers.withMessage('Expiry is required', required),
    },
    cvv: {
        required: helpers.withMessage('Cvv is required', required),
    },
};

const v$ = useVuelidate(rules, form);

const makePayment = async () => {
    const validity = await v$.value.$validate();
    if (!validity) return;

    loading.value = true;

    toggleOTPModal();
};
</script>

<style lang="scss" scoped></style>
