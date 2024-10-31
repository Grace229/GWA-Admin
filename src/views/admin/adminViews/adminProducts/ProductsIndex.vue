<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script setup>
import { provide, reactive } from 'vue';

const productState = reactive({
    pickedProduct: {},
    fetchedProductDetails: {},
    vendorDetails: {},
});

provide('productState', productState);
</script>

<style lang="scss" scoped></style>
