<template>
    <div class="">
        <Navigator />

        <CustomersList v-if="currentPage === 'customers-list'" />
        <NotFoundRouter v-else />
    </div>
</template>

<script setup>
import NotFoundRouter from '@/components/reusable/NotFoundRouter.vue';

import { computed, provide } from 'vue';
import { useRoute } from 'vue-router';
import Navigator from './Nav.vue';
import CustomersList from './CustomersList.vue';
import { useStore } from 'vuex';
const store = useStore();
const role = store.getters['authToken/roles'][0];
const route = useRoute();
const currentPage = computed(() => route.params.list);

provide('currentPage', currentPage);
provide('role', role);
</script>

<style lang="scss" scoped></style>
