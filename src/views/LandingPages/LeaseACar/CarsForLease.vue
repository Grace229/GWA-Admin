<template>
    <div class="container pb-[72px] pt-[87px]">
        <h1 class="font-semibold text-[30px] text-[#30374F] leading-[38px] mb-[10px]">Available cars for Lease</h1>
        <p class="font-normal text-sm text-[#4A5578]">Check out these recommendations based on our bestsellers</p>

        <AvailableForFinancingUnAuth />
    </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import { Constants } from '@/util';

import AvailableForFinancingUnAuth from '@/components/reusable/AvailableForFinancingUnAuth.vue';
// {
//         Buy = 0,
//         Lease =1,
//         Rent=2
//     }
const leaseEnum = 1;
const financeOptions = Constants.financeOptionsEnum;

const financeOptn = ref(financeOptions[leaseEnum].id);
const pageSizeValue = ref(4);

provide('financeOptn', financeOptn);
provide('pageSizeValue', pageSizeValue);
</script>

<style lang="scss" scoped></style>
