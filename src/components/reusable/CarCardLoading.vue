<template>
    <div
        class="animate-pulse w-[277px] h-[365px] rounded-lg flex items-center justify-center border border-[#F9F9FB] bg-[#ffffff] shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.1),0px_2px_4px_-2px_rgba(16,24,40,0.06)]"
    >
        <SpinnerLoader class="h-[80px] w-[80px]" />
    </div>
</template>

<script setup>
import SpinnerLoader from '@/components/reusable/SpinnerLoader.vue';
</script>

<style lang="scss" scoped></style>
