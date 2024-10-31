<template>
    <div class="bg-[#FFFFFF] shadowStyle border border-[#EAECF0] rounded-lg">
        <div class="px-6 py-3"><span class="font-semibold text-xs text-[#475467]">Related vehicles</span></div>
        <div class="flow-root">
            <div class="overflow-x-auto">
                <div class="inline-block min-w-full pt-2 pb-1 align-middle">
                    <div class="overflow-hidden ring-black ring-opacity-5">
                        <table class="min-w-full divide-y divide-[#EAECF0] rounded-b-lg">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="py-3.5 pl-6 pr-3 text-left text-xs font-medium text-[#475467]">Name</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Price</th>

                                    <th scope="col" class="relative py-3.5 pl-3 pr-6">
                                        <span class="sr-only">view</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody v-if="relatedCarsLoading" class="bg-white rounded-b-lg">
                                <tr v-for="(data, index) in 2" :key="data.id" :class="[index + 1 === relatedCarsList.length ? 'border-none rounded-b-lg' : 'border-b border-[#EAECF0]']">
                                    <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-normal text-[#475467]">
                                        <div class="flex items-center gap-3">
                                            <div class="rounded bg-gray-100 h-[50px] w-[50px]"></div>
                                            <span class="h-[12px] w-[200px]"></span>
                                        </div>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">
                                        <!-- <span class="text-xs font-medium text-[#B54708]"></span> -->
                                    </td>

                                    <td class="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-xs font-normal text-[#475467]">
                                        <div class="h-[12px] w-[30px] bg-gray-100"></div>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else class="bg-white rounded-b-lg">
                                <tr v-for="(data, index) in relatedCarsList" :key="data.id" :class="[index + 1 === relatedCarsList.length ? 'border-none rounded-b-lg' : 'border-b border-[#EAECF0]']">
                                    <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-normal text-[#475467]">
                                        <div class="flex items-center gap-3">
                                            <img class="rounded h-[50px] w-[50px]" :src="data.pictures[0].fileUrl" alt="" />
                                            <span class="truncate whitespace-normal">{{ data.year }} {{ data.brand }} {{ data.model }}</span>
                                        </div>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">{{ formatCurrency(data.price) }}</td>

                                    <td class="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-xs font-normal text-[#475467]">
                                        <span @click="$router.push(`/preview_car/${data.id}`)" class="cursor-pointer">View</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue';

const relatedCarsLoading = inject('relatedCarsLoading');
const relatedCarsList = inject('relatedCarsList');
const formatCurrency = inject('formatCurrency');
</script>

<style lang="scss" scoped>
.shadowStyle {
    box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
}
</style>
