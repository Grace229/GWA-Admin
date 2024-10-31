<template>
    <div>
        <div v-if="$route.params.step === 'payment_method'" class="flex flex-col gap-[26px]">
            <div class="flex gap-4">
                <!-- make itemid and step same -->
                <StepIcon :itemId="10" :step="10" />
                <div class="flex flex-col">
                    <p class="leading-[24px] font-semibold text-sm text-[#344054]">Payment Method</p>
                    <p class="leading-[20px] font-normal text-sm text-[#475467]">Choose financing option</p>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-if="pickedMethod === 'Sterling'" class="flex flex-col gap-[26px]">
                <div v-for="(item, index) in sterlingMenuItems" :key="item.name" class="flex gap-4">
                    <StepIcon :itemId="index + 1" :step="state.step" />
                    <div class="flex flex-col">
                        <p class="leading-[24px] font-semibold text-sm text-[#344054]">{{ item.name }}</p>
                        <p class="leading-[20px] font-normal text-sm text-[#475467]">{{ item.text }}</p>
                    </div>
                </div>
            </div>

            <div v-if="pickedMethod === 'Bank'" class="flex flex-col gap-[26px]">
                <div v-for="(item, index) in bankMenuItems" :key="item.name" class="flex gap-4">
                    <StepIcon :itemId="index + 1" :step="state.step" />
                    <div class="flex flex-col">
                        <p class="leading-[24px] font-semibold text-sm text-[#344054]">{{ item.name }}</p>
                        <p class="leading-[20px] font-normal text-sm text-[#475467]">{{ item.text }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, onMounted } from 'vue';
import StepIcon from '/src/assets/svg/VendorMenuStepIcon.vue';

onMounted(() => {
    // console.log(state);
});
const pickedMethod = inject('pickedMethod');
const state = inject('state');
const sterlingMenuItems = [
    {
        name: 'Bank Statement',
        text: 'Provide your bank statement',
    },
    {
        name: 'Account Details',
        text: 'Provide The Alternative Bank account details',
    },
    {
        name: 'Inspection Report',
        text: 'Review & approve inspection report',
    },
    {
        name: 'Altdrive Contract',
        text: 'Review and accept contract',
    },
];

const bankMenuItems = [
    {
        name: 'Bank Statement',
        text: 'Provide your bank statement',
    },
    {
        name: 'Payment Method',
        text: 'Choose financing option',
    },
    {
        name: 'Inspection Report',
        text: 'Review & approve inspection report',
    },
    {
        name: 'Altdrive Contract',
        text: 'Review and accept contract',
    },
];
</script>

<style lang="scss" scoped></style>
