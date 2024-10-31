<template>
    <div :class="!hasActionPermission() ? 'disabled-page' : ''">
        <!-- {{ hasActionPermission() }} -->
        <div class="flex-items-center justify-center max-w-[994px] mt-[39px] pb-[60px]">
            <!-- <h1 class="text-center mt-20 mb-16 animate-pulse font-semibold text-[32px] text-gray-500">Update in progress...</h1>

            <spinner-loader class="h-20 w-20 mx-auto" /> -->

            <DocumentUploader @filesUpdated="updateFormFiles" />
        </div>
    </div>
</template>

<script setup>
import { inject, provide, reactive, ref, watch } from 'vue';
import DocumentUploader from '@/views/admin/adminViews/reusable/DocumentUploader.vue';
import { useStore } from 'vuex';
const orderState = inject('orderState');
const form = reactive({
    documents: [],
});
const store = useStore();
const role = store.getters['authToken/roles'][0];
const uploadedFiles = ref([]);
const updateFormFiles = (documents) => {
    form.documents = documents;
};

const hasActionPermission = () => {
    if (role === 'SuperAdmin') {
        return false;
    } else {
        return true;
    }
};
watch(
    () => form.documents,
    () => {
        orderState.reportDocumentUploaded = form.documents.length > 0;
    },
    { deep: true }
);
provide('form', form);
provide('uploadedFiles', uploadedFiles);
</script>

<style lang="scss" scoped></style>
