<template>
    <div class="container pb-[144px]">
        <h1 class="font-semibold text-[30px] text-[#30374F] leading-[38px] mb-[10px]">Recommended Deals</h1>
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
const buyEnum = 0;
const financeOptions = Constants.financeOptionsEnum;

const financeOptn = ref(financeOptions[buyEnum].id);
const pageSizeValue = ref(8);
provide('financeOptn', financeOptn);
provide('pageSizeValue', pageSizeValue);
</script>

<style lang="scss" scoped></style>
