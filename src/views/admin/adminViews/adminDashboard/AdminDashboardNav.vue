<template>
    <div class="flex gap-5 flex-col md:flex-row md:justify-between md:items-center">
        <div class="overflow-x-auto">
            <div class="min-w-max flex border border-[#D0D5DD] max-w-max rounded-lg filter">
                <div v-for="period in periods" :key="period.id">
                    <div v-if="period.id !== null" @click="selectPeriod(period)" :class="[period.id !== 4 ? 'border-r border-[#D0D5DD]' : '']" class="cursor-pointer">
                        <div
                            :class="[selectedPeriod.name === period.name ? 'bg-[#F9FAFB]' : 'bg-[#FFFFFF]', period.id === 1 ? '!rounded-l-lg ' : '', period.id === 4 ? '!rounded-r-lg' : '']"
                            class="px-[16px] py-[10px]"
                        >
                            <span class="text-[#344054] text-sm font-semibold">{{ period.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex items-center gap-3">
            <DashboardDatePicker />
            <!-- <FilterButton /> -->
        </div>
    </div>
</template>

<script setup>
// import Datepicker from 'vue-datepicker';
import DashboardDatePicker from '@/views/admin/adminViews/adminDashboard/DashboardDatePicker.vue';
// import SelectDate from '/src/components/reusable/SelectDate.vue';
import FilterButton from '/src/components/reusable/FilterButton.vue';
import { ref, inject, onMounted, watch } from 'vue';

onMounted(() => {
    queryPeriod();
});
const dashboardState = inject('dashboardState');

const currentDate = new Date(); // Current date

const periods = [
    {
        id: 1,
        name: '12 Months',
    },

    {
        id: 2,
        name: '30 Days',
    },

    {
        id: 3,
        name: '7 Days',
    },

    {
        id: 4,
        name: '24 Hours',
    },
    {
        id: null,
        name: null,
    },
];

const selectedPeriod = ref(periods[4]);
const selectPeriod = (period) => {
    // console.log('selected');
    if (selectedPeriod.value.id !== period.id) {
        selectedPeriod.value = period;
    } else {
        unSelectPeriod();
    }
};

const unSelectPeriod = () => {
    selectedPeriod.value = {
        id: null,
        name: null,
    };
    dashboardState.searchParams.from = '';
    dashboardState.searchParams.to = '';
};

const queryPeriod = () => {
    if (selectedPeriod.value.name == '30 Days') {
        thirtyDays();
    }
    if (selectedPeriod.value.name == '7 Days') {
        sevenDays();
    }
    if (selectedPeriod.value.name == '12 Months') {
        twelveMonths();
    }
    if (selectedPeriod.value.name == '24 Hours') {
        oneDay();
    }

    if (selectedPeriod.value.name == null) {
        console.log('null selected');
        dashboardState.searchParams.from = '';
        dashboardState.searchParams.to = '';
    }
};

const setToDate = () => {
    dashboardState.searchParams.to = currentDate.toISOString().slice(0, 10);
};

const twelveMonths = () => {
    const fromDateObj = new Date();
    fromDateObj.setMonth(currentDate.getMonth() - 12);
    dashboardState.searchParams.from = fromDateObj.toISOString().slice(0, 10);

    setToDate();
};

const thirtyDays = () => {
    const fromDateObj = new Date();
    fromDateObj.setDate(currentDate.getDate() - 30);
    dashboardState.searchParams.from = fromDateObj.toISOString().slice(0, 10);

    setToDate();
};

const sevenDays = () => {
    const fromDateObj = new Date();
    fromDateObj.setDate(currentDate.getDate() - 7);
    dashboardState.searchParams.from = fromDateObj.toISOString().slice(0, 10);

    setToDate();
};

const oneDay = () => {
    const fromDateObj = new Date();
    fromDateObj.setDate(currentDate.getDate() - 1);
    dashboardState.searchParams.from = fromDateObj.toISOString().slice(0, 10);

    setToDate();
};

watch(selectedPeriod, (newValue, oldValue) => {
    if (newValue.id !== oldValue.id) {
        queryPeriod();
    }
});
</script>

<style lang="scss" scoped>
.filter {
    filter: drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05));
}
</style>
