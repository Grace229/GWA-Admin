<template>
    <div class="mt-[34px] border-t pt-[25px]">
        <!-- {{ state.data }} -->
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-y-4 gap-x-8">
            <div class="col-span-1">
                <label for="Equity Contribution (Upfront Payment)" class="block text-sm font-medium text-[#344054]">Equity Contribution (Upfront Payment)</label>
                <div class="mt-1">
                    <IdSelect class="h-[44px]" :options="percentages" v-model="state.paymentInfo.upfrontPercentage" :modelValue="state.paymentInfo.upfrontPercentage" label="" />
                </div>

                <!-- <div class="text-red-400 mt-1 text-xs" v-for="error of v$.condition.$errors" :key="error.$uid">
                    <div class="text-red-400">
                        {{ error.$message }}
                    </div>
                </div> -->
            </div>
            <div class="col-span-1">
                <label for="Upfront Amount" class="block text-sm font-medium text-[#344054]">Upfront Amount</label>
                <div class="mt-1">
                    <!-- <input
                                    type="text"
                                    name="price"
                                    id="price"
                                    autocomplete="off"
                                    v-model="v$.price.$model"
                                    :class="{
                                        errorBorder: v$.price?.$errors[0]?.$message?.length > 0,
                                    }"
                                    class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                    aria-describedby="price-description"
                                /> -->
                    <!-- <CurrencyInput
                        v-model="state.paymentInfo.upfrontAmount"
                        :options="{
                            currency: 'ngn',

                            hideCurrencySymbolOnFocus: false,
                            hideGroupingSeparatorOnFocus: false,
                            hideNegligibleDecimalDigitsOnFocus: false,
                        }"
                    />
                    {{ state.paymentInfo.upfrontAmount }} -->
                    <input
                        disabled
                        type="text"
                        name="Upfront Amount"
                        id="Upfront Amount"
                        autocomplete="off"
                        v-model="upfrontAmt"
                        class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                        aria-describedby="Upfront Amount-description"
                    />
                </div>

                <!-- <div class="text-red-400 mt-1 text-xs" v-for="error of v$.price.$errors" :key="error.$uid">
                    <div class="text-red-400">
                        {{ error.$message }}
                    </div>
                </div> -->
            </div>

            <!-- <div class="col-span-1">
                <label for="tenor" class="block text-sm font-medium text-[#344054]">Tenor<span class="text-red-500 ml-1">*</span></label>
                <div class="mt-1">
                    <IdSelect class="h-[44px]" :options="tenorMenu" v-model="state.paymentInfo.tenor" :modelValue="state.paymentInfo.tenor" label="Select Tenor" />
                </div>

                <div class="text-red-400 mt-1 text-xs" v-for="error of v$.tenor.$errors" :key="error.$uid">
                        <div class="text-red-400">
                            {{ error.$message }}
                        </div>
                    </div>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { upfrontPercentages } from '@/components/reusable/UpfrontPercentage.js';
import IdSelect from '@/components/reusable/CustomInputs/IdSelect.vue';
import { inject, ref, onMounted, watch } from 'vue';
import { Log, Constants } from '@/util';
// import { required, helpers, numeric, maxLength, minLength, minValue } from '@vuelidate/validators';
import CurrencyInput from '@/components/reusable/CustomInputs/CurrencyInput.vue';
onMounted(() => {
    calculateUpfrontAmount();
});
const state = inject('state');
const formatCurrency = inject('formatCurrency');
const upfrontAmt = inject('upfrontAmt');

const percentages = ref(upfrontPercentages);
const calculateUpfrontAmount = inject('calculateUpfrontAmount');
// const tenorMenu = Constants.tenorMenu;
watch(
    () => state.paymentInfo.upfrontPercentage,
    () => {
        calculateUpfrontAmount();
    }
);
</script>

<style lang="scss" scoped></style>
