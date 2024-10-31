<template>
    <div class="">
        <Navigator />

        <VendorsList v-if="currentPage === 'users-list'" />

        <RejectedVendorsList v-else-if="currentPage === 'subscribers-list'" />
        <NotFoundRouter v-else />
    </div>
</template>

<script setup>
import NotFoundRouter from '@/components/reusable/NotFoundRouter.vue';
import { computed, provide } from 'vue';
import { useRoute } from 'vue-router';
import Navigator from '@/views/admin/adminViews/adminVendors/Nav.vue';
import VendorsList from '@/views/admin/adminViews/adminVendors/VendorsList.vue';
import RejectedVendorsList from '@/views/admin/adminViews/adminVendors/RejectedVendorsList.vue';
import { useStore } from 'vuex';
const store = useStore();
const role = store.getters['authToken/roles'][0];
const route = useRoute();
const currentPage = computed(() => route.params.list);

provide('currentPage', currentPage);
provide('role', role);
</script>

<style lang="scss" scoped></style>
