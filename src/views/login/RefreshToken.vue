<template>
    <div></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { refreshToken } from '@/services/OnboardingServices.js';
// Call refreshToken() immediately when the component is mounted
onMounted(() => {
    refreshTheToken();
});

// Define a function to refresh the token
const refreshTheToken = async () => {
    // console.log('Refresh the token');
    refreshToken();
};

// Call refreshToken() every 5 minutes
const interval = setInterval(() => {
    refreshTheToken();
}, 4 * 60 * 1000); // 4 minutes in milliseconds

// Call clearInterval() when the component is unmounted
onUnmounted(() => {
    clearInterval(interval);
});
</script>
