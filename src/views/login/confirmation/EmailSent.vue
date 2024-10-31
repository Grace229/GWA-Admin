<template>
    <div class="max-w-[470px] xl:ml-8 flex flex-col gap-3 items-center">
        <EmailSentSvg />

        <h3 class="mt-6 text-[24px] font-semibold text-gray-900">Email Sent</h3>

        <div class="max-w-[300px]"><p class="text-gray-600 text-base font-normal text-center">An email has been sent to you with instructions on how to reset your password.</p></div>
        <button @click="$emit('done')" class="brandButton mt-[28px] rounded-lg w-[251px] py-[10px]">Done</button>
    </div>
</template>

<script setup>
import EmailSentSvg from '/src/assets/svg/EmailSentSvg.vue'
</script>

<style lang="scss" scoped></style>
