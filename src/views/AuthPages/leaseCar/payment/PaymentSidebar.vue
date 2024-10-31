<template>
    <div>
        <!-- <div class="flex flex-col gap-[26px]">
            <div class="flex gap-4">
                <StepIcon :itemId="1" :step="1" />
                <div class="flex flex-col">
                    <p class="leading-[24px] font-semibold text-sm text-[#344054]">Payment Method</p>
                    <p class="leading-[20px] font-normal text-sm text-[#475467]">Choose financing option</p>
                </div>
            </div>
        </div> -->
        <div>
            <div class="flex flex-col gap-[26px]">
                <div v-for="(item, index) in menuItems" :key="item.name" class="flex gap-4">
                    <StepIcon :itemId="index + 1" :step="step" />
                    <div class="flex flex-col">
                        <p class="leading-[24px] font-semibold text-sm text-[#344054]">{{ item.name }}</p>
                        <p class="leading-[20px] font-normal text-sm text-[#475467]">{{ item.text }}</p>
                    </div>
                </div>
            </div>

            <!-- <div v-if="pickedMethod === 'Bank'" class="flex flex-col gap-[26px]">
                <div v-for="(item, index) in bankMenuItems" :key="item.name" class="flex gap-4">
                    <StepIcon :itemId="index + 1" :step="state.step" />
                    <div class="flex flex-col">
                        <p class="leading-[24px] font-semibold text-sm text-[#344054]">{{ item.name }}</p>
                        <p class="leading-[20px] font-normal text-sm text-[#475467]">{{ item.text }}</p>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { inject, onMounted } from 'vue';
import StepIcon from '/src/assets/svg/VendorMenuStepIcon.vue';

onMounted(() => {});
const pickedMethod = inject('pickedMethod');
const step = inject('step');
const menuItems = [
    {
        name: 'Account Details',
        text: 'Provide bank account details',
    },
    {
        name: 'Financing Details',
        text: 'Tenor and repayment details',
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
