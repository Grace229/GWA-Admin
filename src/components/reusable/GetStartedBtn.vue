<template>
    <div class="w-full">
        <button @click="$router.push('/search')" class="brandButton w-full rounded-[8px]">Get Started</button>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
const store = useStore();
const isLoggedIn = computed(() => store.getters['authToken/loggedIn']);
</script>

<style lang="scss" scoped></style>
