<template>
    <div>
        <div>
            <div class="flex flex-col gap-[26px]">
                <div v-for="(item, index) in sterlingMenuItems" :key="item.name" class="flex gap-4">
                    <StepIcon :itemId="index + 1" :step="step" />
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
    console.log(state);
    console.log(step.value);
});

const state = inject('state');
const step = inject('step');
const sterlingMenuItems = [
    {
        name: 'Credit Check',
        text: 'Provide BVN',
    },
    {
        name: 'Contract',
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
