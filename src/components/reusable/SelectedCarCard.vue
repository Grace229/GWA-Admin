<template>
    <div class="s-shadow bg-[#ffffff] rounded-[4px] flex flex-col sm:flex-row border border-[#EFF1F5]">
        <!-- <div v-if="data?.pictures" class="w-[175px] max-h-[100px]">
            <img class="w-full h-full rounded-l-[4px]" :src="data?.pictures[0]?.fileUrl" :alt="data.pictures[0]?.photoname" />
        </div> -->

        <div v-if="data?.pictures" class="">
            <div class="sm:w-[175px] h-[100px] sm:h-full xl:h-[100px] relative">
                <img class="full-image rounded-tl-[4px] sm:rounded-l-[4px] rounded-tr-[4px] sm:rounded-r-[0px]" :src="data?.pictures[0]?.fileUrl" :alt="data.pictures[0]?.photoname" />

                <!-- <div class="w-[239px] h-full reportBgImg rounded-l-[4px]"></div> -->
            </div>
        </div>

        <div class="flex-1 p-6">
            <h2 class="font-semibold text-sm text-[#30374F] mb-[10px]">{{ data.year }} {{ data.brand }} {{ data.model }}</h2>

            <div class="mb-[5px] flex flex-wrap font-normal text-xs text-[#4A5578] justify-start gap-2">
                <span class="flex items-center gap-1"
                    ><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6 1V2.25M6 1C3.23858 1 1 3.23858 1 6M6 1C8.76142 1 11 3.23858 11 6M6 9.75V11M6 11C8.76142 11 11 8.76142 11 6M6 11C3.23858 11 1 8.76142 1 6M2.25 6H1M11 6H9.75M9.53921 9.53921L8.65234 8.65234M2.46082 9.53921L3.34858 8.65145M2.46082 2.5L3.32904 3.36823M9.53921 2.5L6.74995 5.25M7 6C7 6.55228 6.55228 7 6 7C5.44772 7 5 6.55228 5 6C5 5.44772 5.44772 5 6 5C6.55228 5 7 5.44772 7 6Z"
                            stroke="#4A5578"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    {{ data.mileage == 0 ? '0.00' : formatCurrency(data.mileage).slice(1, data.mileage) }}
                    mi</span
                >
                <!-- <span class="flex items-center gap-1"
                    ><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6 6.5C6.82843 6.5 7.5 5.82843 7.5 5C7.5 4.17157 6.82843 3.5 6 3.5C5.17157 3.5 4.5 4.17157 4.5 5C4.5 5.82843 5.17157 6.5 6 6.5Z"
                            stroke="#4A5578"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M6 11C8 9 10 7.20914 10 5C10 2.79086 8.20914 1 6 1C3.79086 1 2 2.79086 2 5C2 7.20914 4 9 6 11Z"
                            stroke="#4A5578"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    Automatic</span
                > -->
                <span class="flex items-center gap-1"
                    ><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6 6.5C6.82843 6.5 7.5 5.82843 7.5 5C7.5 4.17157 6.82843 3.5 6 3.5C5.17157 3.5 4.5 4.17157 4.5 5C4.5 5.82843 5.17157 6.5 6 6.5Z"
                            stroke="#4A5578"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M6 11C8 9 10 7.20914 10 5C10 2.79086 8.20914 1 6 1C3.79086 1 2 2.79086 2 5C2 7.20914 4 9 6 11Z"
                            stroke="#4A5578"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    {{ data.location }}</span
                >
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, computed } from 'vue';
const state = inject('state');
const formatCurrency = inject('formatCurrency');

const data = computed(() => state.data);
</script>

<style lang="scss" scoped></style>
