<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script setup>
import { provide, reactive, ref } from 'vue';
const uploadedFiles = ref([]);
const orderState = reactive({
    pickedOrder: {},
    fetchedOrderDetails: {},
    vendorDetails: {},
    customerDetails: {},
    accountInfo: {},
    form: {
        documents: [],
        // uploadedFiles: [],
    },
    reportDocumentUploaded: false,
});

provide('orderState', orderState);
provide('uploadedFiles', uploadedFiles);
</script>

<style lang="scss" scoped></style>
