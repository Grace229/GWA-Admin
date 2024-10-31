<template>
    <div class="mb-[83px] flex flex-col gap-6 pt-[32px] px-4 sm:px-[32px] border border-[#EFF1F5] bg-[#F9FAFB] rounded-[16px]">
        <div class="">
            <h1 class="font-semibold text-[30px] text-[#1D2939]">{{ header }}</h1>

            <p class="font-normal text-sm text-[#667085] mt-1">{{ description }}</p>
        </div>
        <div class=""><slot name="nav"></slot></div>

        <div class="pb-[62px]"><slot name="body"></slot></div>
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
