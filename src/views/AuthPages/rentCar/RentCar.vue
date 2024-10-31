<template>
    <div class="">
        <div class="shadow-xs border-b border-gray-200 py-[24px]">
            <div class="container">
                <h1 class="font-semibold text-[24px] text-[#344054]">Cars For Rent</h1>
                <p @click="clearAll" class="hidden cursor-pointer font-normal text-[#F23B55] text-[12px] mt-[17px]">Clear all</p>
            </div>
        </div>

        <!-- <div v-if="noParams" class="flex flex-col container pt-[47px] gap-[30px]">
            <h1 class="font-semibold text-[36px] text-[#344054]">All Cars</h1>
            <div class="flex flex-wrap items-center justify-between shadow-xs bg-[#F9FAFB] border border-[#EFF1F5] px-[29px] pt-[38px] pb-[34px] rounded-lg">
                <HeroBtn class="w-[212px]" v-for="dropdown in dropdowns" :key="dropdown.name" :label="dropdown.name" />
            </div>
        </div> -->

        <div class="flex container gap-8 mt-[51px] mb-[60px]">
            <div>
                <div class="max-h-max pt-[20px] w-full max-w-[278px] shadow-xs bg-gray-50 rounded-lg border border-[#EFF1F5]">
                    <div class="searchFilterPx pb-[18px]">
                        <p class="font-semibold text-sm text-[#30374F] mb-[15px]">227 vehicles</p>

                        <div class="flex flex-wrap gap-[6px]">
                            <div v-for="param in params" :key="param" class="flex gap-[2px] items-center py-[4px] pl-[10px] pr-px border border-gray-300 rounded-[4px] bg-gray-200">
                                <span class="font-medium text-sm text-[#344054] leading-[20px]">{{ param }}</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.5 6.5L6.5 13.5M6.5 6.5L13.5 13.5" stroke="#98A2B3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <p @click="clearAll" class="cursor-pointer font-normal text-[#F23B55] text-[12px] mt-[17px]">Clear all</p>
                    </div>
                    <div class="searchFilterPx pt-[29px] pb-[24px] border-t border-[#EFF1F5] flex flex-col gap-[24px]">
                        <HeroBtn label="Location" />
                        <HeroBtn label="Car Make" />
                        <HeroBtn label="Choose Model" />
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 searchFilterPx">
                        <div class="col-span-1">
                            <label for="min" class="block text-xs font-normal text-[#475467]">Min </label>
                            <div class="mt-1">
                                <input
                                    type="text"
                                    name="min"
                                    id="min"
                                    autocomplete="off"
                                    v-model="searchParams.min"
                                    class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                    aria-describedby="min-description"
                                />
                            </div>
                        </div>
                        <div class="col-span-1">
                            <label for="max" class="block text-xs font-normal text-[#475467]">Max </label>
                            <div class="mt-1">
                                <input
                                    type="text"
                                    name="max"
                                    id="max"
                                    autocomplete="off"
                                    v-model="searchParams.max"
                                    class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                    aria-describedby="max-description"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="mb-[25px]"></div>

                    <div class="carParams flex flex-col gap-[16px]">
                        <p>Conditions</p>
                        <div class="relative flex items-start">
                            <div class="flex h-5 items-center">
                                <input id="new" aria-describedby="new-description" name="new" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-gray-300 focus:ring-0" />
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="new" class="font-normal text-gray-600">New</label>
                            </div>
                        </div>
                        <div class="relative flex items-start">
                            <div class="flex h-5 items-center">
                                <input
                                    id="Locally Used"
                                    aria-describedby="LocallyUsed-description"
                                    name="Locally Used"
                                    type="checkbox"
                                    class="h-4 w-4 rounded border-gray-300 text-gray-300 focus:ring-0"
                                />
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="Locally Used" class="font-normal text-gray-600">Locally Used</label>
                            </div>
                        </div>
                        <div class="relative flex items-start">
                            <div class="flex h-5 items-center">
                                <input
                                    id="Foreign Used"
                                    aria-describedby="ForeignUsed-description"
                                    name="Foreign Used"
                                    type="checkbox"
                                    class="h-4 w-4 rounded border-gray-300 text-gray-300 focus:ring-0"
                                />
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="Foreign Used" class="font-normal text-gray-600">Foreign Used</label>
                            </div>
                        </div>
                    </div>
                    <div class="carParams flex flex-col gap-[16px]">
                        <p class="-mb-px">Price Range</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="col-span-1">
                                <label for="min" class="block text-xs font-normal text-[#475467]">Min </label>
                                <div class="mt-1">
                                    <input
                                        type="text"
                                        name="min"
                                        id="min"
                                        autocomplete="off"
                                        v-model="searchParams.min"
                                        class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                        aria-describedby="min-description"
                                    />
                                </div>
                            </div>
                            <div class="col-span-1">
                                <label for="max" class="block text-xs font-normal text-[#475467]">Max </label>
                                <div class="mt-1">
                                    <input
                                        type="text"
                                        name="max"
                                        id="max"
                                        autocomplete="off"
                                        v-model="searchParams.max"
                                        class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                        aria-describedby="max-description"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="border-bottom: none" class="carParams flex flex-col gap-[16px]">
                        <p>Finance Options</p>
                        <div class="relative flex items-start">
                            <div class="flex h-5 items-center">
                                <input
                                    id="Loan Finance"
                                    aria-describedby="Loan Finance-description"
                                    name="Loan Finance"
                                    type="checkbox"
                                    class="h-4 w-4 rounded border-gray-300 text-gray-300 focus:ring-0"
                                />
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="Loan Finance" class="font-normal text-gray-600">Loan Finance</label>
                            </div>
                        </div>
                        <div class="relative flex items-start">
                            <div class="flex h-5 items-center">
                                <input id="For Lease" aria-describedby="LocallyUsed-description" name="For Lease" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-gray-300 focus:ring-0" />
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="For Lease" class="font-normal text-gray-600">For Lease</label>
                            </div>
                        </div>
                        <div class="relative flex items-start">
                            <div class="flex h-5 items-center">
                                <input id="For Rent" aria-describedby="ForeignUsed-description" name="For Rent" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-gray-300 focus:ring-0" />
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="For Rent" class="font-normal text-gray-600">For Rent</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-1">
                <div :class="[noParams ? 'grid-cols-4' : '  grid-cols-3 ', 'grid gap-6 xl:gap-8']">
                    <CarCarousel v-for="car in cars" :key="car" :car="car" :link="'/rent_car'" />
                </div>

                <div class="flex items-center justify-center mt-[60px] mb-[20px]"><Pagination /></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import CarCarousel from '/src/components/reusable/CarCarousel.vue';
import HeroBtn from '/src/views/LandingPages/Main/HeroDropDownBtn.vue';
import { reactive, ref, onMounted } from 'vue';
import Pagination from '/src/components/reusable/Pagination.vue';
onMounted(() => {
    console.log(noParams.value);
});
const noParams = ref(false);
const searchParams = reactive({
    min: '100',
    max: '1000',
    priceMin: '100',
    priceMax: '1000',
});

const dropdowns = [
    {
        name: 'Make',
    },
    {
        name: 'Choose Model',
    },
    {
        name: 'Mileage',
    },
    {
        name: 'Never / Used',
    },
    {
        name: 'Max Price',
    },
];
const cars = [
    {
        id: 1,
        make: '2017 BMW X5',
        mileage: '58,911 mi',
        location: 'Lagos',
        locallyUsed: false,
        price: '$68,987',
        imageUrls: ['/Car2.png', '/Car1.png'],
        deal: 'Starting at N240,000/mo',
    },

    {
        id: 2,
        make: '2017 BMW X5',
        mileage: '58,911 mi',
        location: 'Lagos',
        locallyUsed: true,
        price: '$68,987',
        imageUrls: ['/Car1.png', '/Car2.png'],
        deal: 'Starting at N240,000/mo',
    },
    {
        id: 3,
        make: '2017 BMW X5',
        mileage: '58,911 mi',
        location: 'Lagos',
        locallyUsed: false,
        price: '$68,987',
        imageUrls: ['/Car1.png', '/Car2.png'],
        deal: 'Starting at N240,000/mo',
    },
    {
        id: 4,
        make: '2017 BMW X5',
        mileage: '58,911 mi',
        location: 'Lagos',
        locallyUsed: true,
        price: '$68,987',
        imageUrls: ['/Car1.png', '/Car2.png'],
        deal: 'Starting at N240,000/mo',
    },
    {
        id: 5,
        make: '2017 BMW X5',
        mileage: '58,911 mi',
        location: 'Lagos',
        locallyUsed: false,
        price: '$68,987',
        imageUrls: ['/Car2.png', '/Car1.png'],
        deal: 'Starting at N240,000/mo',
    },

    {
        id: 6,
        make: '2017 BMW X5',
        mileage: '58,911 mi',
        location: 'Lagos',
        locallyUsed: true,
        price: '$68,987',
        imageUrls: ['/Car1.png', '/Car2.png'],
        deal: 'Starting at N240,000/mo',
    },
    {
        id: 7,
        make: '2017 BMW X5',
        mileage: '58,911 mi',
        location: 'Lagos',
        locallyUsed: false,
        price: '$68,987',
        imageUrls: ['/Car1.png', '/Car2.png'],
        deal: 'Starting at N240,000/mo',
    },
    {
        id: 8,
        make: '2017 BMW X5',
        mileage: '58,911 mi',
        location: 'Lagos',
        locallyUsed: true,
        price: '$68,987',
        imageUrls: ['/Car1.png', '/Car2.png'],
        deal: 'Starting at N240,000/mo',
    },
    {
        id: 9,
        make: '2017 BMW X5',
        mileage: '58,911 mi',
        location: 'Lagos',
        locallyUsed: true,
        price: '$68,987',
        imageUrls: ['/Car1.png', '/Car2.png'],
        deal: 'Starting at N240,000/mo',
    },
];

const params = ['Lexus', 'Lagos'];

const clearAll = () => {
    noParams.value = true;
    console.log(noParams.value);
};
</script>

<style lang="scss" scoped>
.carParams {
    border: 1px solid #eff1f5;
    padding: 20px 20px 30px 20px;
}
.carParams > p {
    color: #475467;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 4px;
}
.searchFilterPx {
    padding-left: 29px;
    padding-right: 29px;
}
</style>
