<template>
    <div class="xs-shadow animate-pulse bg-[#ffffff] rounded-[4px] flex border border-[#EFF1F5]">
        <div class="w-[175px] bg-gray-100 max-h-[100px] rounded-l-[4px]">
            <!-- <img class="w-full h-full rounded-l-[4px]" :src="data?.pictures[0]?.fileUrl" :alt="data.pictures[0]?.photoname" /> -->
        </div>
        <!-- {{ data.pictures[0].fileUrl }} -->

        <div class="flex-1 p-6">
            <h2 class="font-semibold w-[100px] h-[14px] animate-pulse bg-gray-200 text-sm text-[#30374F] mb-[10px]"></h2>

            <div class="mb-[5px] flex flex-wrap font-normal text-xs text-[#4A5578] justify-start gap-2">
                <h2 class="flex items-center gap-1 w-[100px] bg-gray-200 animate-pulse h-[12px]">
                    <!-- <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6 1V2.25M6 1C3.23858 1 1 3.23858 1 6M6 1C8.76142 1 11 3.23858 11 6M6 9.75V11M6 11C8.76142 11 11 8.76142 11 6M6 11C3.23858 11 1 8.76142 1 6M2.25 6H1M11 6H9.75M9.53921 9.53921L8.65234 8.65234M2.46082 9.53921L3.34858 8.65145M2.46082 2.5L3.32904 3.36823M9.53921 2.5L6.74995 5.25M7 6C7 6.55228 6.55228 7 6 7C5.44772 7 5 6.55228 5 6C5 5.44772 5.44772 5 6 5C6.55228 5 7 5.44772 7 6Z"
                            stroke="#4A5578"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg> -->
                </h2>
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
                <span class="flex bg-gray-200 h-[12px] animate-pulse items-center gap-1"> </span>
            </div>
        </div>
    </div>
</template>

<script setup>
// import { inject, computed } from 'vue';
// const state = inject('state');
// const formatCurrency = inject('formatCurrency');

// const data = computed(() => state.data);
</script>

<style lang="scss" scoped></style>
