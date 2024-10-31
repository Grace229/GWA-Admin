<template>
    <div class="max-w-[360px] xl:mx-auto md:pt-12 flex flex-col gap-3 items-center">
        <SuccessShield />

        <h3 class="mt-6 text-[24px] font-semibold text-gray-900">Account Created</h3>

        <div class="max-w-[360px]"><p class="text-gray-600 text-base font-normal text-center">Your account has been created successfully. Proceed to your dashboard.</p></div>
        <button @click="handleLoginDetails" class="brandButton mt-[28px] rounded-lg w-[251px] py-[10px]">View Account</button>
    </div>
</template>

<script setup>
import { inject } from 'vue';
import SuccessShield from '/src/assets/svg/SuccessShield.vue';

const handleLoginDetails = inject('handleLoginDetails');
</script>

<style lang="scss" scoped></style>
