<template>
    <div>
        <div v-if="statsLoading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <StatsCardLoading class="card" />
            <StatsCardLoading class="card" />
            <StatsCardLoading class="card" />
            <StatsCardLoading class="card" />
            <StatsCardLoading class="card" />
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <div v-for="data in metricData" :key="data.title" class="card flex flex-col gap-2 p-6">
                <p class="text-[#475467] font-medium text-sm">{{ data.title }}</p>
                <span v-if="data.title === 'Total Payments'" class="text-[#101828] font-medium text-[24px]">{{ formatInteger(Number(dashboardState.stats.totalPayment)) }}</span>
                <!-- <span v-else-if="data.title === 'Total Sales'" class="text-[#101828] font-medium text-[24px]">{{ formatCurrency(Number(dashboardState.stats.totalSales)) }}</span> -->
                <span v-else-if="data.title === 'Transactions'" class="text-[#101828] font-medium text-[24px]">{{
                    formatCurrency(dashboardState.stats.transactions).slice(1, formatCurrency(dashboardState.stats.transactions).length - 3)
                }}</span>

                <span v-else-if="data.title === 'Subscriptions'" class="text-[#101828] font-medium text-[24px]">{{ formatInteger(Number(dashboardState.stats.subscriptions)) }}</span>

                <span v-else-if="data.title === 'Subscribers'" class="text-[#101828] font-medium text-[24px]">{{ formatInteger(Number(dashboardState.stats.subscribers)) }}</span>

                <span v-else-if="data.title === 'Users'" class="text-[#101828] font-medium text-[24px]">{{ formatInteger(Number(dashboardState.stats.users)) }}</span>

                <!-- <span v-else class="text-[#101828] font-medium text-[24px]">{{ data.value }}</span> -->
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
        title: 'Users',
        value: computed(() => dashboardState.stats.users),
    },
    {
        title: 'Subscribers',
        value: computed(() => dashboardState.stats.subscribers),
    },
    {
        title: 'Subscriptions',
        value: computed(() => dashboardState.stats.subscriptions),
    },
    {
        title: 'Transactions',
        value: computed(() => dashboardState.stats.transactions),
    },
    {
        title: 'Total Payments',
        value: computed(() => dashboardState.stats.totalPayment),
    },
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
