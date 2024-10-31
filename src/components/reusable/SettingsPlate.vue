<template>
    <div class="mb-[83px] pt-[32px] px-4 sm:px-[32px] border border-[#EFF1F5] bg-[#F9FAFB] rounded-[16px]">
        <div class="border-b border-[#EAECF0]">
            <!-- <h1 v-if="header === 'Dashboard'" class="font-semibold text-[30px] text-[#1D2939]">{{ header }}</h1> -->

            <h1 class="font-semibold text-[18px] text-[#1D2939]">{{ header }}</h1>
            <p class="font-normal text-sm text-[#667085] mt-1">{{ description }}</p>

            <div class="pt-[36px]"><slot name="nav"></slot></div>
        </div>
        <div class="pt-[36px] pb-[62px]"><slot name="body"></slot></div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    header: { type: String },
    description: { type: String, default: '' },
});
</script>

<style lang="scss" scoped></style>
