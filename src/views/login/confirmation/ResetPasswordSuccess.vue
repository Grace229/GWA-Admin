<template>
    <div class="max-w-[360px] xl:mx-auto md:pt-12 flex flex-col gap-3 items-center">
        <SuccessShield />

        <h3 class="mt-6 text-[24px] font-semibold text-gray-900">Success</h3>

        <div class="max-w-[360px]"><p class="text-gray-600 text-base font-normal text-center">Your password has been created successfully. Proceed to your account.</p></div>
        <button @click="$router.push('/login')" class="brandButton mt-[28px] rounded-lg w-[251px] py-[10px]">{{ buttonText }}</button>
    </div>
</template>

<script setup>
import SuccessShield from '/src/assets/svg/SuccessShield.vue'

const props = defineProps({
    buttonText: String,
})
</script>

<style lang="scss" scoped></style>
