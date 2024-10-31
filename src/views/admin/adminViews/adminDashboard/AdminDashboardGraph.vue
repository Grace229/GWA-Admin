<template>
    <div v-if="chartLoading" class="px-[32px] flex gap-[57px] rounded-xl bg-[#FFFFFF] shadowStyle">
        <div class="animate-pulse flex flex-col min-w-[250px] mt-5">
            <div class="h-[14px] bg-gray-100 mb-2 font-medium text-[#475467] text-[14px]"></div>
            <span class="h-[36px] bg-gray-100 mb-4 flex items-start text-[#101828] font-semibold text-[36px] leading-[44px]"> <span class="text-[20px] leading-[30px]"></span> </span>

            <div class="flex items-center gap-2 max-w-max py-[2px] px-[10px] bg-[#ECFDF3] rounded-2xl">
                <span class="text-[#027A48] font-medium text-sm h-[20px] w-[100px]"></span>
            </div>
        </div>
        <div class="flex-1">
            <apexchart type="area" height="300" width="100%" :options="chartOptions" :series="series"></apexchart>
        </div>
    </div>
    <div v-else class="px-[32px] flex flex-col xl:flex-row gap-[57px] rounded-xl bg-[#FFFFFF] shadowStyle">
        <div class="flex flex-col min-w-[250px] mt-5">
            <h2 class="mb-2 font-medium text-[#475467] text-[14px]">Sales Chart</h2>

            <span v-if="total == 0" class="mb-4 flex items-start text-[#101828] font-semibold text-[20px] sm:text-[36px] leading-[44px]">
                <span class="text-sm sm:text-[20px] leading-[30px]">&#x20A6;</span> 0:00</span
            >
            <span v-else class="mb-4 flex items-start text-[#101828] font-semibold text-[20px] sm:text-[36px] leading-[44px]">
                <span class="text-sm sm:text-[20px]">&#x20A6;</span> {{ formatCurrency(total).slice(1, total) }}</span
            >

            <!-- <div class="flex items-center gap-2 max-w-max py-[2px] px-[10px] bg-[#ECFDF3] rounded-2xl">
                <div>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6" stroke="#12B76A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <span class="text-[#027A48] font-medium text-sm">7.4% <span class="ml-1 text-red-500">*</span></span>
            </div> -->
        </div>
        <div class="flex-1 overflow-x-auto overflow-y-hidden">
            <div class="w-full min-w-[550px]">
                <apexchart type="area" height="300" width="100%" :options="chartOptions" :series="series"></apexchart>
            </div>
        </div>
    </div>
</template>

<script setup>
import VueApexCharts from 'vue3-apexcharts';
import { inject, computed, watch, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const chartLoading = inject('chartLoading');

const salesData = inject('salesData');
const apexchart = VueApexCharts;
const formatCurrency = inject('formatCurrency');
const total = ref(0);
const xaxisText = ref([]);
const series = ref([
    {
        name: 'periods',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
]);
let chartOptions = reactive({
    colors: ['#039855'],
    yaxis: {
        show: false,
        lines: {
            show: false,
        },
    },
    legend: {
        show: false,
    },
    chart: {
        toolbar: {
            show: false,
        },
    },
    grid: {
        show: true,
    },

    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: 'smooth',
        width: 3,
    },
    xaxis: {
        // categories: computed(() => xaxisText.value),
        // categories: [],
        // categories: computed(() => yearData.value?.chartrecords?.map((item) => item.month)),
        categories: [],
    },
    tooltip: {
        x: {
            format: 'dd/MM/yy HH:mm',
        },
    },
});

const setGraph = () => {
    if (salesData.value.length > 0) {
        const data = salesData.value;
        // total.value = data.chartrecords.reduce((accumulator, record) => accumulator + record.total, 0);

        // const monthNames = data.chartrecords.map((record) => record.month);
        // const totalValues = data.chartrecords.map((record) => record.total);

        const monthNames = data.flatMap((item) => item.chartrecords.map((record) => record.month));
        const totalValues = data.flatMap((item) => item.chartrecords.map((record) => record.total));
        total.value = totalValues.reduce((acc, curr) => acc + curr, 0);

        // total.value =
        // const monthNames = ['First', 'Last'];
        series.value = [
            {
                name: 'Total',
                data: totalValues,
            },
        ];

        chartOptions.xaxis.categories = monthNames;
    }
};
// const formatInteger = (value) => {
//     return formatCurrency(value).slice(1, formatCurrency(value).length - 3);
// };
watch(
    () => salesData,
    () => {
        setGraph();
        // alert('change');
    },
    { deep: true }
);
</script>

<style lang="scss" scoped>
.shadowStyle {
    box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
}
</style>
