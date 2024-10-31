<template>
    <div class="cursor-pointer rounded-lg border border-[#D0D5DD] flex items-center gap-[10.5px] py-[10px] px-[18px]">
        <div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 10H15M2.5 5H17.5M7.5 15H12.5" stroke="#344054" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
        <span class="text-[#344054] text-sm font-semibold">{{ props.text }}</span>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    text: {
        type: String,
        default: 'Filter',
    },
});
</script>

<style lang="scss" scoped></style>
