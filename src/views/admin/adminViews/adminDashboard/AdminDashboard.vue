<template>
    <div>
        <!-- <AdminDashboardNav /> -->

        <div class="flex flex-col gap-6 mt-[26px]">
            <AdminDashboardCards />
            <AdminDashboardGraph />
            <RecentOrders />
        </div>
    </div>
</template>

<script setup>
import { getAdminStats, getAdminSalesChart } from '@/services/AdminServices.js';
import RecentOrders from '@/views/admin/adminViews/adminDashboard/RecentOrders.vue';
import AdminDashboardGraph from '@/views/admin/adminViews/adminDashboard/AdminDashboardGraph.vue';
import AdminDashboardCards from '@/views/admin/adminViews/adminDashboard/AdminDashboardCards.vue';
import AdminDashboardNav from '@/views/admin/adminViews/adminDashboard/AdminDashboardNav.vue';
import { Log } from '@/util';
import { reactive, onMounted, provide, watch, ref, computed } from 'vue';
onMounted(() => {
    fetchStats();
    fetchSalesChart();
});

const salesData = ref([]);
const statsLoading = ref(false);
const chartLoading = ref(false);
const dashboardState = reactive({
    stats: { users: 0, subscribers: 0, subscriptions: 0, transactions: 0, totalPayment: 0 },
    searchParams: {
        from: '',
        to: '',
    },
});

const yearData = computed(() => (salesData.value[0] ? salesData.value[0] : []));

const fetchStats = () => {
    statsLoading.value = true;
    getAdminStats(
        // dashboardState.searchParams,
        (res) => {
            statsLoading.value = false;
console.log(res.data.data)
            dashboardState.stats.users = res.data.data.users.total;
            dashboardState.stats.subscribers = res.data.data.subscribers.total;
            dashboardState.stats.subscriptions = res.data.data.subscriptions.total;
            dashboardState.stats.transactions = res.data.data.transactions.total;
            dashboardState.stats.users = res.data.data.totalPayment.total;

        },
        (err) => {
            statsLoading.value = false;
        }
    );
};

const fetchSalesChart = () => {
    chartLoading.value = true;
    getAdminSalesChart(
        dashboardState.searchParams,
        (res) => {
            chartLoading.value = false;
            salesData.value = res.data.data.data;
        },
        (err) => {
            chartLoading.value = false;
        }
    );
};

watch(
    () => dashboardState.searchParams,
    () => {
        fetchStats();
        fetchSalesChart();
    },
    { deep: true }
);

provide('fetchStats', fetchStats);
provide('fetchSalesChart', fetchSalesChart);
provide('dashboardState', dashboardState);
provide('yearData', yearData);
provide('salesData', salesData);
provide('chartLoading', chartLoading);
provide('statsLoading', statsLoading);
</script>

<style lang="scss" scoped></style>
