<template>
    <div>
        <div v-if="statsLoading" class="statsCardGrid3">
            <StatsCardLoading class="card" />
            <StatsCardLoading class="card" />
            <StatsCardLoading class="card" />
        </div>
        <div v-else class="statsCardGrid3">
            <div v-for="data in metricData" :key="data.title" class="card flex flex-col gap-2 p-6">
                <p class="text-[#475467] font-medium text-sm">{{ data.title }}</p>
                <p v-if="data.title === 'Total Payments'" class="break-words text-[#101828] font-medium text-[24px]">{{ formatInteger(Number(dashboardState.stats.totalPayment)) }}</p>
                <p v-else-if="data.title === 'Total Sales'" class="break-words text-[#101828] font-medium text-[24px]">
                    {{ formatCurrency(dashboardState.stats.totalSales).slice(1, formatCurrency(dashboardState.stats.totalSales).length - 3) }}
                </p>

                <p v-else-if="data.title === 'Total Products'" class="break-words text-[#101828] font-medium text-[24px]">{{ formatInteger(Number(dashboardState.stats.products)) }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, computed } from 'vue';
import StatsCardLoading from '@/components/reusable/StatsCardLoading.vue';

const statsLoading = inject('statsLoading');
const dashboardState = inject('dashboardState');
const formatCurrency = inject('formatCurrency');
const metricData = [
    {
        title: 'Total Products',
        value: computed(() => dashboardState.stats.products),
    },
    {
        title: 'Total Sales',
        value: computed(() => dashboardState.stats.totalSales),
    },
    // {
    //     title: 'Total Payments',
    //     value: computed(() => dashboardState.stats.totalPayment),
    // },
];

const formatInteger = (value) => {
    return formatCurrency(value).slice(1, formatCurrency(value).length - 3);
};
</script>

<style lang="scss" scoped>
.card {
    /* Base/White */

    background: #ffffff;
    /* Gray/50 */

    border: 1px solid #f9fafb;
    /* Shadow/sm */

    box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
    border-radius: 12px;
}
</style>
