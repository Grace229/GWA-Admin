<template>
    <div>
        <div v-if="$route.params.step == 2">
            <AccountDetails />
        </div>
        <div v-if="$route.params.step == 3">
            <FinancingDetails />
        </div>
    </div>
</template>

<script setup>
import AccountDetails from '/src/views/AuthPages/buyCar/payment/paymentProccess/AccountDetails.vue';
import FinancingDetails from '/src/views/AuthPages/buyCar/payment/paymentProccess/FinancingDetails.vue';
</script>

<style lang="scss" scoped></style>
