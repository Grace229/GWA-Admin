<template>
    <div class="min-h-screen bg-[#ffffff]">
        <HeaderComponent />
        <!-- <AutoLogout /> -->
        <router-view></router-view>
        <FooterComponent />
    </div>
</template>

<script setup>
// import AutoLogout from '@/views/login/AutoLogout.vue';
import HeaderComponent from '@/components/Header.vue';
import FooterComponent from '@/components/Footer.vue';
</script>

<style lang="scss" scoped></style>
