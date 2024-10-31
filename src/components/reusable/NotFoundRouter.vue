<template>
    <div></div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

onMounted(() => {
    router.push('/404');
});

const router = useRouter();
</script>

<style lang="scss" scoped></style>
