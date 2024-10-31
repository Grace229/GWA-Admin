<template>
    <div>
        <div v-if="$route.params.step == 1">
            <AccountDetails />
        </div>
        <div v-if="$route.params.step == 2">
            <FinancingDetails />
        </div>
    </div>
</template>

<script setup>
import AccountDetails from './AccountDetails.vue';
import FinancingDetails from './FinancingDetails.vue';
</script>

<style lang="scss" scoped></style>
