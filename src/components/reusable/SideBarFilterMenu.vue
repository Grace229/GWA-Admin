<template>
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
                        <input id="Locally Used" aria-describedby="LocallyUsed-description" name="Locally Used" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-gray-300 focus:ring-0" />
                    </div>
                    <div class="ml-3 text-sm">
                        <label for="Locally Used" class="font-normal text-gray-600">Locally Used</label>
                    </div>
                </div>
                <div class="relative flex items-start">
                    <div class="flex h-5 items-center">
                        <input id="Foreign Used" aria-describedby="ForeignUsed-description" name="Foreign Used" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-gray-300 focus:ring-0" />
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
                        <input id="Loan Finance" aria-describedby="Loan Finance-description" name="Loan Finance" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-gray-300 focus:ring-0" />
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
</template>

<script setup>
import { inject } from 'vue';
const params = inject('params');
</script>

<style lang="scss" scoped></style>
