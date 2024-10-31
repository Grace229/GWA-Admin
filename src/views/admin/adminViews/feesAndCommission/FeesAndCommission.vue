<template>
    <div>
        <Navigator />
        <Commission v-if="currentPage === 'addons'" />
        <Fees v-if="currentPage === 'subscriptions'" />
    </div>
</template>

<script setup>
import Navigator from './Nav.vue';
import Commission from './Commission.vue';
import Fees from './Fees.vue';
import { computed, provide } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentPage = computed(() => route.params.list);

provide('currentPage', currentPage);
</script>

<style lang="scss" scoped></style>
