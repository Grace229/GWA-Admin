<template>
    <div>
        <MainAuthPlate header="Dashboard" description="Here’s a quick overview of your business.">
            <template v-slot:nav>
                <VendorDashboardNav />
            </template>
            <template v-slot:body>
                <div class="flex flex-col gap-6">
                    <VendorDashboardCards />
                    <VendorGraph />
                    <VendorDashboardTables />
                </div>
            </template>
        </MainAuthPlate>
    </div>
</template>

<script setup>
import { getStats, getSalesChart } from '@/services/VendorServices.js';
import VendorDashboardTables from '/src/views/AuthPages/vendor/vendorDashboard/VendorDashboardTables.vue';
import VendorGraph from '/src/views/AuthPages/vendor/vendorDashboard/VendorGraph.vue';
import VendorDashboardCards from '/src/views/AuthPages/vendor/vendorDashboard/VendorDashboardCards.vue';
import VendorDashboardNav from '/src/views/AuthPages/vendor/vendorDashboard/VendorDashboardNav.vue';
import MainAuthPlate from '/src/components/reusable/MainAuthPlate.vue';
import { Log } from '@/util';
import { reactive, onMounted, provide, watch, ref, computed } from 'vue';
import { useStore } from 'vuex';
onMounted(() => {
    fetchStats();
    fetchSalesChart();
});
const store = useStore();
const userId = computed(() => store.getters['authToken/userId']);
const salesData = ref([]);
const statsLoading = ref(false);
const chartLoading = ref(false);
const dashboardState = reactive({
    stats: { vendors: 0, customers: 0, products: 0, totalSales: 0, totalPayment: 0 },
    searchParams: {
        userId: userId.value,
        from: '',
        to: '',
    },
});
const yearData = computed(() => (salesData.value[0] ? salesData.value[0] : []));

const fetchStats = () => {
    statsLoading.value = true;
    getStats(
        dashboardState.searchParams,
        (res) => {
            statsLoading.value = false;
            dashboardState.stats = res.data.data;
        },
        (err) => {
            statsLoading.value = false;
        }
    );
};

const fetchSalesChart = () => {
    chartLoading.value = true;
    getSalesChart(
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
provide('userId', userId);
</script>

<style lang="scss" scoped></style>
